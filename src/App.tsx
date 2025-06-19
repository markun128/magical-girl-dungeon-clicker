import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameDisplay from './components/GameDisplay';
import StatsPanel from './components/StatsPanel';
import UpgradePanel from './components/UpgradePanel';
import TitleNotification from './components/TitleNotification';
import BattleLog from './components/BattleLog';
import Collection from './components/Collection';
import MagicPanel from './components/MagicPanel';
import EquipmentPanel from './components/EquipmentPanel';
import { GameState, Monster, UpgradeType, Player, DamageText, Particle, BattleLog as BattleLogType, CollectedItem, Item } from './types/gameTypes';
import { getRandomAttackPhrase, getRandomDamagePhrase } from './data/attackPhrases';
import { checkNewTitleUnlocks, getCurrentTitle } from './data/characterData';
import { getRandomItemDrop } from './data/itemData';
import { getCurrentDungeon, getRandomMonsterFromDungeon, getSpellDropFromMonster, getMonsterEvolutionName } from './data/dungeonData';
import { getRandomEquipmentDrop, upgradeEquipment, canUpgradeEquipment } from './data/equipmentData';
import { getRandomPhrase, getSpellDamageBonus, getSpellUpgradeCost, getAvailableSpells } from './data/magicData';
import { getItemSellPrice } from './data/itemData';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 100,
      y: 300,
      width: 60,
      height: 80,
      hp: 100,
      maxHp: 100,
      level: 1,
      exp: 0,
      expMax: 100,
      attack: 10,
      gold: 0,
      animFrame: 0,
      animSpeed: 0.1,
      isAttacking: false,
      attackCooldown: 0,
      defense: 0,
      criticalRate: 5,
      expBonus: 0,
      goldBonus: 0,
      autoAttackSpeed: 500,
      upgradeCount: {
        attack: 0,
        hp: 0,
        defense: 0,
        critical: 0,
        expBonus: 0,
        goldBonus: 0,
        autoSpeed: 0
      }
    },
    monsters: [],
    currentFloor: 1,
    currentDungeonId: 'forest',
    autoAttack: false,
    particles: [],
    damageTexts: [],
    unlockedTitles: ['novice'],
    titleNotifications: [],
    battleLog: [],
    collection: [],
    magicSpells: {
      'fire_bolt': 1 // Start with Fire Bolt level 1
    },
    currentSpell: 'fire_bolt',
    equipment: {
      head: null,
      body: null,
      hands: null,
      feet: null,
      weapon: null
    }
  });

  const autoAttackRef = useRef<NodeJS.Timeout | null>(null);
  const [currentAttackPhrase, setCurrentAttackPhrase] = useState<string>('');
  const [currentDamagePhrase, setCurrentDamagePhrase] = useState<string>('');

  const spawnMonster = useCallback(() => {
    const currentDungeon = getCurrentDungeon(gameState.currentFloor);
    const floorMultiplier = 1 + (gameState.currentFloor - 1) * 0.3;
    const monsterLevel = Math.max(1, gameState.currentFloor + Math.floor(Math.random() * 3) - 1);
    
    const dungeonMonster = getRandomMonsterFromDungeon(currentDungeon.id, floorMultiplier);
    
    if (!dungeonMonster) {
      // Fallback to basic monster
      const baseHp = Math.floor(20 * floorMultiplier);
      const levelBonus = Math.floor(baseHp * 0.2 * (monsterLevel - 1));
      const totalHp = baseHp + levelBonus;
      
      const monster: Monster = {
        x: 600,
        y: 250,
        width: 80,
        height: 100,
        hp: totalHp,
        maxHp: totalHp,
        name: 'スライム',
        color: '#00ff00',
        animFrame: 0,
        animSpeed: 0.05,
        level: monsterLevel,
        attack: Math.floor(5 + monsterLevel * 2),
        attackCooldown: 0
      };
      
      setGameState(prevState => ({
        ...prevState,
        monsters: [...prevState.monsters, monster]
      }));
      return;
    }

    const baseHp = dungeonMonster.hp;
    const levelBonus = Math.floor(baseHp * 0.2 * (monsterLevel - 1));
    const totalHp = baseHp + levelBonus;

    const evolutionName = getMonsterEvolutionName(dungeonMonster, gameState.currentFloor);

    const monster: Monster = {
      x: 600,
      y: 250,
      width: 80,
      height: 100,
      hp: totalHp,
      maxHp: totalHp,
      name: evolutionName,
      color: dungeonMonster.color,
      animFrame: 0,
      animSpeed: 0.05,
      level: monsterLevel,
      attack: Math.floor((5 + monsterLevel * 2) * floorMultiplier),
      attackCooldown: 0
    };

    setGameState(prevState => ({
      ...prevState,
      monsters: [...prevState.monsters, monster],
      currentDungeonId: currentDungeon.id
    }));
  }, [gameState.currentFloor]);

  useEffect(() => {
    spawnMonster();
  }, []);

  useEffect(() => {
    if (gameState.autoAttack && !autoAttackRef.current) {
      autoAttackRef.current = setInterval(() => {
        setGameState(prevState => {
          if (prevState.monsters.length > 0) {
            return handleAttack(prevState);
          }
          return prevState;
        });
      }, gameState.player.autoAttackSpeed); // Use player's auto attack speed
    } else if (!gameState.autoAttack && autoAttackRef.current) {
      clearInterval(autoAttackRef.current);
      autoAttackRef.current = null;
    }

    return () => {
      if (autoAttackRef.current) {
        clearInterval(autoAttackRef.current);
      }
    };
  }, [gameState.autoAttack]);

  // Monster attack system
  useEffect(() => {
    const monsterAttackInterval = setInterval(() => {
      setGameState(prevState => {
        if (prevState.monsters.length === 0) return prevState;

        const monster = prevState.monsters[0];
        if (monster.attackCooldown > 0) {
          // Reduce cooldown
          return {
            ...prevState,
            monsters: prevState.monsters.map((m, index) => 
              index === 0 ? { ...m, attackCooldown: m.attackCooldown - 1 } : m
            )
          };
        }

        // Monster attacks player
        const equipmentStats = getEquipmentStats();
        const totalDefense = prevState.player.defense + equipmentStats.defense;
        const damage = Math.max(1, monster.attack - totalDefense);
        const maxHp = prevState.player.maxHp + equipmentStats.hp;
        const newPlayerHp = Math.max(0, Math.min(prevState.player.hp, maxHp) - damage);
        
        // Generate damage phrase
        const damagePhrase = getRandomDamagePhrase();
        setCurrentDamagePhrase(damagePhrase);
        
        // Add damage phrase to battle log
        setTimeout(() => {
          addToBattleLog({
            timestamp: new Date(),
            type: 'attack',
            message: `セラフィナが攻撃を受けました`,
            attackPhrase: damagePhrase
          });
        }, 100);
        
        // Clear damage phrase after 3 seconds
        setTimeout(() => {
          setCurrentDamagePhrase('');
        }, 3000);
        
        const newDamageTexts = [...prevState.damageTexts, {
          id: Date.now(),
          x: prevState.player.x + prevState.player.width / 2,
          y: prevState.player.y,
          text: `-${damage}`,
          color: '#ff4444',
          life: 60,
          maxLife: 60
        }];

        // Add monster attack particles
        const newParticles = [...prevState.particles];
        for (let i = 0; i < 5; i++) {
          newParticles.push({
            id: Date.now() + i,
            x: prevState.player.x + prevState.player.width / 2,
            y: prevState.player.y + prevState.player.height / 2,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            color: '#ff4444',
            life: 15,
            maxLife: 15
          });
        }

        return {
          ...prevState,
          player: {
            ...prevState.player,
            hp: newPlayerHp
          },
          monsters: prevState.monsters.map((m, index) => 
            index === 0 ? { ...m, attackCooldown: 60 } : m // 3 second cooldown at 50ms interval
          ),
          damageTexts: newDamageTexts,
          particles: newParticles
        };
      });
    }, 50); // 50ms interval for smooth animation

    return () => clearInterval(monsterAttackInterval);
  }, []);

  const addToBattleLog = useCallback((newLog: Omit<BattleLogType, 'id'>) => {
    setGameState(prevState => ({
      ...prevState,
      battleLog: [
        {
          ...newLog,
          id: Date.now() + Math.random()
        },
        ...prevState.battleLog.slice(0, 49) // Keep only last 50 logs
      ]
    }));
  }, []);

  const addToCollection = useCallback((item: any) => {
    setGameState(prevState => {
      const existingItem = prevState.collection.find(c => c.item.id === item.id);
      
      if (existingItem) {
        return {
          ...prevState,
          collection: prevState.collection.map(c =>
            c.item.id === item.id
              ? { ...c, quantity: c.quantity + 1 }
              : c
          )
        };
      } else {
        return {
          ...prevState,
          collection: [
            ...prevState.collection,
            {
              item,
              quantity: 1,
              firstObtained: new Date()
            }
          ]
        };
      }
    });
  }, []);

  const handleSellItem = useCallback((itemId: string, quantity: number) => {
    setGameState(prevState => {
      const item = prevState.collection.find(c => c.item.id === itemId);
      if (!item) return prevState;

      const sellPrice = getItemSellPrice(item.item) * quantity;
      const remainingQuantity = item.quantity - quantity;

      return {
        ...prevState,
        player: {
          ...prevState.player,
          gold: Math.floor(prevState.player.gold + sellPrice)
        },
        collection: remainingQuantity <= 0 
          ? prevState.collection.filter(c => c.item.id !== itemId)
          : prevState.collection.map(c =>
              c.item.id === itemId
                ? { ...c, quantity: remainingQuantity }
                : c
            )
      };
    });

    // Add sell log
    setTimeout(() => {
      addToBattleLog({
        timestamp: new Date(),
        type: 'item_drop',
        message: `${quantity}個のアイテムを売却しました (+${getItemSellPrice(gameState.collection.find(c => c.item.id === itemId)?.item!)} × ${quantity}G)`
      });
    }, 100);
  }, [gameState.collection, addToBattleLog]);

  const handleAttack = useCallback((currentState: GameState = gameState): GameState => {
    if (currentState.monsters.length === 0) return currentState;

    // Generate random attack phrase based on current spell
    const currentSpellLevel = currentState.magicSpells[currentState.currentSpell] || 1;
    const attackPhrase = getRandomPhrase(currentState.currentSpell, currentSpellLevel);
    setCurrentAttackPhrase(attackPhrase);

    // Add attack to battle log
    setTimeout(() => {
      addToBattleLog({
        timestamp: new Date(),
        type: 'attack',
        message: `セラフィナが攻撃しました`,
        attackPhrase
      });
    }, 100);

    const monster = currentState.monsters[0];
    const spellBonus = getSpellDamageBonus(currentState.currentSpell, currentSpellLevel);
    const equipmentStats = getEquipmentStats();
    let damage = currentState.player.attack + equipmentStats.attack + spellBonus + Math.floor(Math.random() * 5);
    
    // Apply critical hit chance
    const totalCriticalRate = currentState.player.criticalRate + equipmentStats.criticalRate;
    const isCritical = Math.random() * 100 < totalCriticalRate;
    if (isCritical) {
      damage = Math.floor(damage * 2);
    }
    
    const updatedMonster: Monster = { ...monster, hp: monster.hp - damage };

    const newDamageTexts: DamageText[] = [...currentState.damageTexts, {
      id: Date.now(),
      x: monster.x + monster.width / 2,
      y: monster.y,
      text: isCritical ? `CRITICAL! ${damage}` : damage.toString(),
      color: isCritical ? '#ff0000' : '#ff6b6b',
      life: 60,
      maxLife: 60
    }];

    const newParticles: Particle[] = [...currentState.particles];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: monster.x + monster.width / 2,
        y: monster.y + monster.height / 2,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        color: '#ff6b6b',
        life: 20,
        maxLife: 20
      });
    }

    let newState: GameState = {
      ...currentState,
      player: {
        ...currentState.player,
        isAttacking: true,
        attackCooldown: 0
      },
      monsters: [updatedMonster, ...currentState.monsters.slice(1)],
      damageTexts: newDamageTexts,
      particles: newParticles
    };

    if (updatedMonster.hp <= 0) {
      newState = killMonster(newState, updatedMonster);
    }

    setTimeout(() => {
      setCurrentAttackPhrase('');
    }, 3000); // Clear phrase after 3 seconds
    
    setTimeout(() => {
      setGameState(prevState => ({
        ...prevState,
        player: {
          ...prevState.player,
          isAttacking: false
        }
      }));
    }, 200); // Button can be clicked again quickly

    return newState;
  }, [gameState]);

  const killMonster = useCallback((currentState: GameState, monster: Monster): GameState => {
    const baseExpGain = Math.floor(monster.maxHp / 2);
    const levelMultiplier = 1 + (monster.level - 1) * 0.15; // 15% bonus per level above 1
    const baseGoldGain = Math.floor((Math.floor(monster.maxHp / 5) + currentState.currentFloor) * levelMultiplier);
    
    const expGain = Math.floor(baseExpGain * (1 + currentState.player.expBonus / 100));
    const goldGain = Math.floor(baseGoldGain * (1 + currentState.player.goldBonus / 100));

    let newPlayer: Player = {
      ...currentState.player,
      exp: currentState.player.exp + expGain,
      gold: Math.floor(currentState.player.gold + goldGain)
    };

    const newDamageTexts: DamageText[] = [
      ...currentState.damageTexts,
      {
        id: Date.now() + 1000,
        x: monster.x + monster.width / 2,
        y: monster.y - 20,
        text: `+${expGain} EXP`,
        color: '#00ff00',
        life: 60,
        maxLife: 60
      },
      {
        id: Date.now() + 2000,
        x: monster.x + monster.width / 2,
        y: monster.y - 40,
        text: `+${goldGain} G`,
        color: '#ffff00',
        life: 60,
        maxLife: 60
      }
    ];

    if (newPlayer.exp >= newPlayer.expMax) {
      newPlayer = levelUp(newPlayer);
      newDamageTexts.push({
        id: Date.now() + 3000,
        x: newPlayer.x + newPlayer.width / 2,
        y: newPlayer.y,
        text: 'LEVEL UP!',
        color: '#ff00ff',
        life: 60,
        maxLife: 60
      });
    }

    // Check for item drop
    const droppedItem = getRandomItemDrop();
    if (droppedItem) {
      setTimeout(() => {
        addToCollection(droppedItem);
        addToBattleLog({
          timestamp: new Date(),
          type: 'item_drop',
          message: `${droppedItem.icon} ${droppedItem.name}を獲得しました！`,
          item: droppedItem
        });
      }, 200);
    }

    // Check for equipment drop
    const droppedEquipment = getRandomEquipmentDrop();
    if (droppedEquipment) {
      setTimeout(() => {
        addToCollection(droppedEquipment);
        addToBattleLog({
          timestamp: new Date(),
          type: 'item_drop',
          message: `🎒 ${droppedEquipment.icon} ${droppedEquipment.name}を獲得しました！`,
          item: droppedEquipment
        });
      }, 250);
    }

    // Check for spell drop from rare/boss monsters
    const droppedSpell = getSpellDropFromMonster({
      id: monster.name,
      name: monster.name,
      hp: monster.maxHp,
      color: monster.color,
      emoji: '',
      rarity: monster.maxHp > 150 ? 'boss' : monster.maxHp > 80 ? 'rare' : 'common',
      spawnWeight: 1
    });
    
    if (droppedSpell) {
      setTimeout(() => {
        setGameState(prevState => ({
          ...prevState,
          magicSpells: {
            ...prevState.magicSpells,
            [droppedSpell]: Math.max(1, prevState.magicSpells[droppedSpell] || 0)
          }
        }));
        
        addToBattleLog({
          timestamp: new Date(),
          type: 'item_drop',
          message: `✨ 新しい魔法 ${droppedSpell} を習得しました！`
        });
      }, 300);
    }

    // Add monster defeat log
    setTimeout(() => {
      addToBattleLog({
        timestamp: new Date(),
        type: 'monster_defeat',
        message: `${monster.name}を倒しました！`
      });
    }, 150);

    setTimeout(() => {
      spawnMonster();
    }, 500);

    return {
      ...currentState,
      player: newPlayer,
      monsters: currentState.monsters.filter(m => m !== monster),
      damageTexts: newDamageTexts
    };
  }, [spawnMonster]);

  const levelUp = useCallback((player: Player): Player => {
    const newLevel = player.level + 1;
    const newPlayer = {
      ...player,
      level: newLevel,
      exp: player.exp - player.expMax,
      expMax: Math.floor(player.expMax * 1.5),
      attack: player.attack + 3,
      maxHp: player.maxHp + 10,
      hp: player.maxHp + 10
    };

    // Check for new title unlocks
    setTimeout(() => {
      setGameState(prevState => {
        const newTitleUnlocks = checkNewTitleUnlocks(newLevel, prevState.currentFloor, prevState.unlockedTitles);
        if (newTitleUnlocks.length > 0) {
          return {
            ...prevState,
            unlockedTitles: [...prevState.unlockedTitles, ...newTitleUnlocks.map(t => t.id)],
            titleNotifications: [...prevState.titleNotifications, ...newTitleUnlocks.map(t => t.name)]
          };
        }
        return prevState;
      });
    }, 100);

    // Add level up to battle log
    setTimeout(() => {
      addToBattleLog({
        timestamp: new Date(),
        type: 'levelup',
        message: `レベルが${newLevel}に上がりました！`
      });
    }, 300);

    return newPlayer;
  }, [addToBattleLog]);

  const handleCanvasClick = useCallback(() => {
    setGameState(handleAttack);
  }, [handleAttack]);


  const handleUpgrade = useCallback((type: UpgradeType) => {
    setGameState(prevState => {
      const newState: GameState = { ...prevState };
      
      switch (type) {
        case 'attack':
          const attackCost = 10 * Math.pow(1.2, newState.player.upgradeCount.attack);
          if (newState.player.gold >= attackCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - attackCost),
              attack: newState.player.attack + 5,
              upgradeCount: {
                ...newState.player.upgradeCount,
                attack: newState.player.upgradeCount.attack + 1
              }
            };
          }
          break;
        case 'autoAttack':
          if (!newState.autoAttack) {
            if (newState.player.gold >= 50) {
              newState.player = {
                ...newState.player,
                gold: Math.floor(newState.player.gold - 50)
              };
              newState.autoAttack = true;
            }
          } else {
            newState.autoAttack = false;
          }
          break;
        case 'hp':
          const hpCost = Math.floor(25 * Math.pow(1.15, newState.player.upgradeCount.hp));
          if (newState.player.gold >= hpCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - hpCost),
              maxHp: newState.player.maxHp + 20,
              hp: newState.player.maxHp + 20,
              upgradeCount: {
                ...newState.player.upgradeCount,
                hp: newState.player.upgradeCount.hp + 1
              }
            };
          }
          break;
        case 'defense':
          const defenseCost = Math.floor(15 * Math.pow(1.18, newState.player.upgradeCount.defense));
          if (newState.player.gold >= defenseCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - defenseCost),
              defense: newState.player.defense + 3,
              upgradeCount: {
                ...newState.player.upgradeCount,
                defense: newState.player.upgradeCount.defense + 1
              }
            };
          }
          break;
        case 'critical':
          const criticalCost = Math.floor(30 * Math.pow(1.25, newState.player.upgradeCount.critical));
          if (newState.player.gold >= criticalCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - criticalCost),
              criticalRate: newState.player.criticalRate + 2,
              upgradeCount: {
                ...newState.player.upgradeCount,
                critical: newState.player.upgradeCount.critical + 1
              }
            };
          }
          break;
        case 'expBonus':
          const expBonusCost = Math.floor(40 * Math.pow(1.3, newState.player.upgradeCount.expBonus));
          if (newState.player.gold >= expBonusCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - expBonusCost),
              expBonus: newState.player.expBonus + 10,
              upgradeCount: {
                ...newState.player.upgradeCount,
                expBonus: newState.player.upgradeCount.expBonus + 1
              }
            };
          }
          break;
        case 'goldBonus':
          const goldBonusCost = Math.floor(35 * Math.pow(1.25, newState.player.upgradeCount.goldBonus));
          if (newState.player.gold >= goldBonusCost) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - goldBonusCost),
              goldBonus: newState.player.goldBonus + 15,
              upgradeCount: {
                ...newState.player.upgradeCount,
                goldBonus: newState.player.upgradeCount.goldBonus + 1
              }
            };
          }
          break;
        case 'autoSpeed':
          const autoSpeedCost = Math.floor(60 * Math.pow(1.4, newState.player.upgradeCount.autoSpeed));
          if (newState.player.gold >= autoSpeedCost && newState.player.autoAttackSpeed > 100) {
            newState.player = {
              ...newState.player,
              gold: Math.floor(newState.player.gold - autoSpeedCost),
              autoAttackSpeed: Math.max(100, newState.player.autoAttackSpeed - 50),
              upgradeCount: {
                ...newState.player.upgradeCount,
                autoSpeed: newState.player.upgradeCount.autoSpeed + 1
              }
            };
          }
          break;
        default:
          break;
      }
      
      return newState;
    });
  }, []);

  const nextFloor = useCallback(() => {
    setGameState(prevState => {
      const newFloor = prevState.currentFloor + 1;
      
      // Check for new title unlocks based on floor
      const newTitleUnlocks = checkNewTitleUnlocks(prevState.player.level, newFloor, prevState.unlockedTitles);
      
      return {
        ...prevState,
        currentFloor: newFloor,
        monsters: [],
        unlockedTitles: newTitleUnlocks.length > 0 
          ? [...prevState.unlockedTitles, ...newTitleUnlocks.map(t => t.id)]
          : prevState.unlockedTitles,
        titleNotifications: newTitleUnlocks.length > 0
          ? [...prevState.titleNotifications, ...newTitleUnlocks.map(t => t.name)]
          : prevState.titleNotifications
      };
    });
    
    setTimeout(() => {
      spawnMonster();
    }, 100);
  }, [spawnMonster]);

  const handleDismissNotification = useCallback((index: number) => {
    setGameState(prevState => ({
      ...prevState,
      titleNotifications: prevState.titleNotifications.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSpellUpgrade = useCallback((spellId: string) => {
    setGameState(prevState => {
      const currentLevel = prevState.magicSpells[spellId] || 0;
      const cost = currentLevel === 0 ? 0 : getSpellUpgradeCost(spellId, currentLevel);
      
      if (currentLevel === 0) {
        // Unlock spell
        const availableSpells = getAvailableSpells(prevState.player.level);
        const spell = availableSpells.find(s => s.id === spellId);
        if (!spell || prevState.player.level < spell.unlockLevel) return prevState;
        
        return {
          ...prevState,
          magicSpells: {
            ...prevState.magicSpells,
            [spellId]: 1
          }
        };
      } else {
        // Upgrade spell
        if (prevState.player.gold < cost) return prevState;
        
        return {
          ...prevState,
          player: {
            ...prevState.player,
            gold: Math.floor(prevState.player.gold - cost)
          },
          magicSpells: {
            ...prevState.magicSpells,
            [spellId]: currentLevel + 1
          }
        };
      }
    });
  }, []);

  const handleSpellSelect = useCallback((spellId: string) => {
    setGameState(prevState => ({
      ...prevState,
      currentSpell: spellId
    }));
  }, []);

  const handleEquip = useCallback((item: Item) => {
    if (!item.equipmentSlot) return;
    
    setGameState(prevState => ({
      ...prevState,
      equipment: {
        ...prevState.equipment,
        [item.equipmentSlot!]: item
      }
    }));
  }, []);

  const handleUnequip = useCallback((slot: 'head' | 'body' | 'hands' | 'feet' | 'weapon') => {
    setGameState(prevState => ({
      ...prevState,
      equipment: {
        ...prevState.equipment,
        [slot]: null
      }
    }));
  }, []);

  const handleUpgradeEquipment = useCallback((item: Item) => {
    setGameState(prevState => {
      const collectedItem = prevState.collection.find(c => c.item.id === item.id);
      if (!collectedItem || !canUpgradeEquipment(item, collectedItem.quantity)) {
        return prevState;
      }

      const upgradedItem = upgradeEquipment(item);
      const newQuantity = collectedItem.quantity - 5;

      // Update collection
      const newCollection = newQuantity > 0 
        ? prevState.collection.map(c => 
            c.item.id === item.id 
              ? { ...c, item: upgradedItem, quantity: newQuantity }
              : c
          )
        : prevState.collection.filter(c => c.item.id !== item.id);

      // Update equipped item if it matches
      const newEquipment = { ...prevState.equipment };
      Object.entries(newEquipment).forEach(([slot, equippedItem]) => {
        if (equippedItem && equippedItem.id === item.id) {
          newEquipment[slot as keyof typeof newEquipment] = upgradedItem;
        }
      });

      return {
        ...prevState,
        collection: newCollection,
        equipment: newEquipment
      };
    });

    // Add upgrade log
    setTimeout(() => {
      addToBattleLog({
        timestamp: new Date(),
        type: 'item_drop',
        message: `${item.name}をアップグレードしました！`
      });
    }, 100);
  }, [addToBattleLog]);

  // Calculate total equipment stats
  const getEquipmentStats = useCallback(() => {
    const stats = { attack: 0, defense: 0, hp: 0, criticalRate: 0 };
    Object.values(gameState.equipment).forEach(item => {
      if (item?.stats) {
        stats.attack += item.stats.attack || 0;
        stats.defense += item.stats.defense || 0;
        stats.hp += item.stats.hp || 0;
        stats.criticalRate += item.stats.criticalRate || 0;
      }
    });
    return stats;
  }, [gameState.equipment]);

  return (
    <div className="app">
      <div className="game-container">
        <GameDisplay 
          gameState={gameState}
          onAttackClick={handleCanvasClick}
          attackPhrase={currentAttackPhrase}
          damagePhrase={currentDamagePhrase}
        />
        
        <div className="ui-panel">
          <StatsPanel player={gameState.player} floor={gameState.currentFloor} />
          <UpgradePanel 
            player={gameState.player}
            autoAttack={gameState.autoAttack}
            onUpgrade={handleUpgrade}
            onNextFloor={nextFloor}
          />
        </div>
        
        <div className="bottom-panel">
          <BattleLog logs={gameState.battleLog} />
          <MagicPanel 
            playerLevel={gameState.player.level}
            playerGold={gameState.player.gold}
            magicSpells={gameState.magicSpells}
            currentSpell={gameState.currentSpell}
            onSpellUpgrade={handleSpellUpgrade}
            onSpellSelect={handleSpellSelect}
          />
          <EquipmentPanel 
            gameState={gameState}
            onEquip={handleEquip}
            onUnequip={handleUnequip}
            onUpgradeEquipment={handleUpgradeEquipment}
          />
          <Collection collection={gameState.collection} onSellItem={handleSellItem} />
        </div>
      </div>
      
      <TitleNotification 
        notifications={gameState.titleNotifications}
        onDismiss={handleDismissNotification}
      />
    </div>
  );
};

export default App;