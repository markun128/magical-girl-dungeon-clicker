export interface DungeonType {
  id: string;
  name: string;
  description: string;
  theme: string;
  unlockFloor: number;
  backgroundGradient: string[];
  icon: string;
}

export interface DungeonMonster {
  id: string;
  name: string;
  hp: number;
  color: string;
  emoji: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'boss';
  spawnWeight: number; // Higher = more likely to spawn
  evolution?: {
    floor10: string;
    floor25: string;
    floor50: string;
    floor75: string;
    floor100: string;
  };
}

export const dungeonTypes: DungeonType[] = [
  {
    id: 'forest',
    name: '魔法の森',
    description: '緑豊かな魔法に満ちた森のダンジョン',
    theme: 'nature',
    unlockFloor: 1,
    backgroundGradient: ['#2c5530', '#4a7c59'],
    icon: '🌲'
  },
  {
    id: 'cave',
    name: '水晶洞窟',
    description: '美しい水晶が輝く神秘的な洞窟',
    theme: 'crystal',
    unlockFloor: 10,
    backgroundGradient: ['#1e3a5f', '#2980b9'],
    icon: '💎'
  },
  {
    id: 'volcano',
    name: '火山の試練',
    description: '灼熱のマグマが流れる危険な火山ダンジョン',
    theme: 'fire',
    unlockFloor: 25,
    backgroundGradient: ['#8b2635', '#e74c3c'],
    icon: '🌋'
  },
  {
    id: 'ice',
    name: '氷結神殿',
    description: '永遠の氷に包まれた古代神殿',
    theme: 'ice',
    unlockFloor: 40,
    backgroundGradient: ['#2c5aa0', '#5dade2'],
    icon: '❄️'
  },
  {
    id: 'shadow',
    name: '影の迷宮',
    description: '闇の力が渦巻く恐ろしい迷宮',
    theme: 'dark',
    unlockFloor: 60,
    backgroundGradient: ['#1a1a2e', '#16213e'],
    icon: '🌑'
  },
  {
    id: 'celestial',
    name: '天界の塔',
    description: '天使たちが住む光輝く天界の塔',
    theme: 'holy',
    unlockFloor: 80,
    backgroundGradient: ['#f8c471', '#f4d03f'],
    icon: '☁️'
  }
];

export const dungeonMonsters: Record<string, DungeonMonster[]> = {
  forest: [
    { 
      id: 'forest_slime', 
      name: '森スライム', 
      hp: 20, 
      color: '#2ecc71', 
      emoji: '🟢', 
      rarity: 'common', 
      spawnWeight: 30,
      evolution: {
        floor10: 'キングスライム',
        floor25: 'ロードスライム',
        floor50: 'エンペラースライム',
        floor75: 'ゴッドスライム',
        floor100: 'オムニスライム'
      }
    },
    { 
      id: 'mushroom', 
      name: 'キノコモンスター', 
      hp: 25, 
      color: '#e67e22', 
      emoji: '🍄', 
      rarity: 'common', 
      spawnWeight: 25,
      evolution: {
        floor10: 'ポイズンマッシュルーム',
        floor25: 'デスマッシュルーム',
        floor50: 'ドゥームマッシュルーム',
        floor75: 'アポカリプスマッシュルーム',
        floor100: 'ミシカルマッシュルーム'
      }
    },
    { 
      id: 'fairy', 
      name: '悪戯妖精', 
      hp: 15, 
      color: '#f39c12', 
      emoji: '🧚', 
      rarity: 'common', 
      spawnWeight: 20,
      evolution: {
        floor10: 'ダークフェアリー',
        floor25: 'シャドウフェアリー',
        floor50: 'ナイトメアフェアリー',
        floor75: 'カオスフェアリー',
        floor100: 'ヴォイドフェアリー'
      }
    },
    { 
      id: 'wolf', 
      name: '森の狼', 
      hp: 40, 
      color: '#7f8c8d', 
      emoji: '🐺', 
      rarity: 'uncommon', 
      spawnWeight: 15,
      evolution: {
        floor10: 'アルファウルフ',
        floor25: 'ダイアウルフ',
        floor50: 'フェンリル',
        floor75: 'ミシカルフェンリル',
        floor100: 'コズミックフェンリル'
      }
    },
    { 
      id: 'ent', 
      name: 'エント', 
      hp: 80, 
      color: '#27ae60', 
      emoji: '🌳', 
      rarity: 'uncommon', 
      spawnWeight: 10,
      evolution: {
        floor10: 'エルダーエント',
        floor25: 'アーチエント',
        floor50: 'ワールドツリー',
        floor75: 'ユグドラシル',
        floor100: 'コズミックツリー'
      }
    },
    { 
      id: 'dryad', 
      name: 'ドライアド', 
      hp: 60, 
      color: '#58d68d', 
      emoji: '🧝‍♀️', 
      rarity: 'uncommon', 
      spawnWeight: 8,
      evolution: {
        floor10: 'フォレストクイーン',
        floor25: 'ネイチャーゴッデス',
        floor50: 'ガイアエンプレス',
        floor75: 'コズミックドライアド',
        floor100: 'オムニドライアド'
      }
    },
    { 
      id: 'unicorn', 
      name: 'ユニコーン', 
      hp: 120, 
      color: '#e8daef', 
      emoji: '🦄', 
      rarity: 'rare', 
      spawnWeight: 5,
      evolution: {
        floor10: 'ペガサス',
        floor25: 'セレスティアルユニコーン',
        floor50: 'ディバインユニコーン',
        floor75: 'ゴッドユニコーン',
        floor100: 'オムニコーン'
      }
    },
    { 
      id: 'forest_dragon', 
      name: '森のドラゴン', 
      hp: 200, 
      color: '#148f77', 
      emoji: '🐲', 
      rarity: 'rare', 
      spawnWeight: 3,
      evolution: {
        floor10: 'フォレストワイバーン',
        floor25: 'エルダードラゴン',
        floor50: 'ワールドドラゴン',
        floor75: 'コズミックドラゴン',
        floor100: 'オムニドラゴン'
      }
    },
    { 
      id: 'ancient_tree', 
      name: '古代樹', 
      hp: 300, 
      color: '#1e8449', 
      emoji: '🌲', 
      rarity: 'rare', 
      spawnWeight: 2,
      evolution: {
        floor10: 'プリミティブツリー',
        floor25: 'ミシカルツリー',
        floor50: 'ワールドツリーロード',
        floor75: 'ユニバースツリー',
        floor100: 'オムニツリー'
      }
    },
    { 
      id: 'forest_king', 
      name: '森の王', 
      hp: 500, 
      color: '#0e6b0e', 
      emoji: '👑', 
      rarity: 'boss', 
      spawnWeight: 1,
      evolution: {
        floor10: 'フォレストエンペラー',
        floor25: 'ネイチャーゴッド',
        floor50: 'ガイアロード',
        floor75: 'コズミックネイチャー',
        floor100: 'オムニフォレスト'
      }
    }
  ],
  
  cave: [
    { id: 'crystal_bat', name: '水晶コウモリ', hp: 30, color: '#85c1e9', emoji: '🦇', rarity: 'common', spawnWeight: 30 },
    { id: 'gem_spider', name: '宝石蜘蛛', hp: 35, color: '#af7ac5', emoji: '🕷️', rarity: 'common', spawnWeight: 25 },
    { id: 'cave_troll', name: '洞窟トロル', hp: 60, color: '#7d3c98', emoji: '👹', rarity: 'common', spawnWeight: 20 },
    { id: 'crystal_golem', name: '水晶ゴーレム', hp: 90, color: '#5dade2', emoji: '💎', rarity: 'uncommon', spawnWeight: 15 },
    { id: 'underground_wyrm', name: '地底ワイバーン', hp: 110, color: '#3498db', emoji: '🐍', rarity: 'uncommon', spawnWeight: 10 },
    { id: 'cave_witch', name: '洞窟の魔女', hp: 85, color: '#8e44ad', emoji: '🧙‍♀️', rarity: 'uncommon', spawnWeight: 8 },
    { id: 'diamond_bear', name: 'ダイヤモンドベア', hp: 180, color: '#aed6f1', emoji: '🐻', rarity: 'rare', spawnWeight: 5 },
    { id: 'crystal_dragon', name: '水晶竜', hp: 250, color: '#3498db', emoji: '🐉', rarity: 'rare', spawnWeight: 3 },
    { id: 'cave_guardian', name: '洞窟の守護者', hp: 350, color: '#2874a6', emoji: '🗿', rarity: 'rare', spawnWeight: 2 },
    { id: 'crystal_lord', name: '水晶王', hp: 600, color: '#1b4f72', emoji: '💠', rarity: 'boss', spawnWeight: 1 }
  ],
  
  volcano: [
    { id: 'lava_slime', name: '溶岩スライム', hp: 45, color: '#e74c3c', emoji: '🔴', rarity: 'common', spawnWeight: 30 },
    { id: 'fire_imp', name: 'ファイアインプ', hp: 40, color: '#e67e22', emoji: '👺', rarity: 'common', spawnWeight: 25 },
    { id: 'magma_salamander', name: 'マグマサラマンダー', hp: 55, color: '#d35400', emoji: '🦎', rarity: 'common', spawnWeight: 20 },
    { id: 'fire_elemental', name: '火の精霊', hp: 80, color: '#e74c3c', emoji: '🔥', rarity: 'uncommon', spawnWeight: 15 },
    { id: 'lava_golem', name: '溶岩ゴーレム', hp: 140, color: '#a93226', emoji: '🗿', rarity: 'uncommon', spawnWeight: 10 },
    { id: 'phoenix', name: 'フェニックス', hp: 120, color: '#ff6b35', emoji: '🔥', rarity: 'uncommon', spawnWeight: 8 },
    { id: 'fire_giant', name: 'ファイアジャイアント', hp: 220, color: '#922b21', emoji: '👹', rarity: 'rare', spawnWeight: 5 },
    { id: 'volcano_dragon', name: '火山竜', hp: 300, color: '#641e16', emoji: '🐲', rarity: 'rare', spawnWeight: 3 },
    { id: 'ifrit', name: 'イフリート', hp: 400, color: '#7b241c', emoji: '👹', rarity: 'rare', spawnWeight: 2 },
    { id: 'flame_emperor', name: '炎帝', hp: 700, color: '#4a0e0e', emoji: '🔥', rarity: 'boss', spawnWeight: 1 }
  ],
  
  ice: [
    { id: 'ice_sprite', name: '氷の妖精', hp: 35, color: '#aed6f1', emoji: '❄️', rarity: 'common', spawnWeight: 30 },
    { id: 'frost_wolf', name: 'フロストウルフ', hp: 50, color: '#85c1e9', emoji: '🐺', rarity: 'common', spawnWeight: 25 },
    { id: 'snowman', name: 'スノーマン', hp: 45, color: '#d5dbdb', emoji: '⛄', rarity: 'common', spawnWeight: 20 },
    { id: 'ice_golem', name: 'アイスゴーレム', hp: 100, color: '#5dade2', emoji: '🧊', rarity: 'uncommon', spawnWeight: 15 },
    { id: 'frost_giant', name: 'フロストジャイアント', hp: 150, color: '#3498db', emoji: '👹', rarity: 'uncommon', spawnWeight: 10 },
    { id: 'ice_queen', name: '氷の女王', hp: 130, color: '#7fb3d3', emoji: '👸', rarity: 'uncommon', spawnWeight: 8 },
    { id: 'blizzard_bear', name: 'ブリザードベア', hp: 200, color: '#2980b9', emoji: '🐻‍❄️', rarity: 'rare', spawnWeight: 5 },
    { id: 'ice_dragon', name: '氷竜', hp: 280, color: '#1f618d', emoji: '🐉', rarity: 'rare', spawnWeight: 3 },
    { id: 'frost_titan', name: 'フロストタイタン', hp: 380, color: '#154360', emoji: '👹', rarity: 'rare', spawnWeight: 2 },
    { id: 'ice_emperor', name: '氷帝', hp: 800, color: '#0b2161', emoji: '❄️', rarity: 'boss', spawnWeight: 1 }
  ],
  
  shadow: [
    { id: 'shadow_wisp', name: '影の霊', hp: 40, color: '#566573', emoji: '👻', rarity: 'common', spawnWeight: 30 },
    { id: 'dark_bat', name: 'ダークバット', hp: 35, color: '#2c3e50', emoji: '🦇', rarity: 'common', spawnWeight: 25 },
    { id: 'shade', name: 'シェード', hp: 55, color: '#34495e', emoji: '🌫️', rarity: 'common', spawnWeight: 20 },
    { id: 'shadow_assassin', name: '影の暗殺者', hp: 80, color: '#1c2833', emoji: '🥷', rarity: 'uncommon', spawnWeight: 15 },
    { id: 'nightmare', name: 'ナイトメア', hp: 120, color: '#212f3d', emoji: '👹', rarity: 'uncommon', spawnWeight: 10 },
    { id: 'dark_knight', name: 'ダークナイト', hp: 140, color: '#17202a', emoji: '⚔️', rarity: 'uncommon', spawnWeight: 8 },
    { id: 'shadow_demon', name: '影の悪魔', hp: 200, color: '#0e1419', emoji: '👹', rarity: 'rare', spawnWeight: 5 },
    { id: 'void_dragon', name: '虚無竜', hp: 320, color: '#0c0c0c', emoji: '🐉', rarity: 'rare', spawnWeight: 3 },
    { id: 'dark_overlord', name: '闇の覇王', hp: 450, color: '#000000', emoji: '👑', rarity: 'rare', spawnWeight: 2 },
    { id: 'shadow_god', name: '影神', hp: 900, color: '#000000', emoji: '🌑', rarity: 'boss', spawnWeight: 1 }
  ],
  
  celestial: [
    { id: 'light_sprite', name: '光の妖精', hp: 50, color: '#f8c471', emoji: '✨', rarity: 'common', spawnWeight: 30 },
    { id: 'angel_scout', name: '偵察天使', hp: 60, color: '#f4d03f', emoji: '👼', rarity: 'common', spawnWeight: 25 },
    { id: 'holy_bird', name: '聖鳥', hp: 45, color: '#f7dc6f', emoji: '🕊️', rarity: 'common', spawnWeight: 20 },
    { id: 'guardian_angel', name: '守護天使', hp: 100, color: '#fcf3cf', emoji: '👼', rarity: 'uncommon', spawnWeight: 15 },
    { id: 'celestial_knight', name: '天界騎士', hp: 140, color: '#f9e79f', emoji: '⚔️', rarity: 'uncommon', spawnWeight: 10 },
    { id: 'archangel', name: '大天使', hp: 160, color: '#f8c471', emoji: '😇', rarity: 'uncommon', spawnWeight: 8 },
    { id: 'seraph', name: 'セラフィム', hp: 250, color: '#f4d03f', emoji: '👼', rarity: 'rare', spawnWeight: 5 },
    { id: 'light_dragon', name: '光竜', hp: 350, color: '#f7dc6f', emoji: '🐲', rarity: 'rare', spawnWeight: 3 },
    { id: 'celestial_lord', name: '天界の主', hp: 500, color: '#f1c40f', emoji: '👑', rarity: 'rare', spawnWeight: 2 },
    { id: 'god_avatar', name: '神の化身', hp: 1000, color: '#b7950b', emoji: '☀️', rarity: 'boss', spawnWeight: 1 }
  ]
};

export const getMonsterEvolutionName = (monster: DungeonMonster, floor: number): string => {
  if (!monster.evolution) return monster.name;
  
  if (floor >= 100) return monster.evolution.floor100;
  if (floor >= 75) return monster.evolution.floor75;
  if (floor >= 50) return monster.evolution.floor50;
  if (floor >= 25) return monster.evolution.floor25;
  if (floor >= 10) return monster.evolution.floor10;
  
  return monster.name;
};

export const getCurrentDungeon = (floor: number): DungeonType => {
  // Find the highest unlocked dungeon for current floor
  const availableDungeons = dungeonTypes.filter(d => d.unlockFloor <= floor);
  return availableDungeons[availableDungeons.length - 1] || dungeonTypes[0];
};

export const getRandomMonsterFromDungeon = (dungeonId: string, floorMultiplier: number = 1): DungeonMonster | null => {
  const monsters = dungeonMonsters[dungeonId];
  if (!monsters || monsters.length === 0) return null;

  // Calculate total weight
  const totalWeight = monsters.reduce((sum, monster) => sum + monster.spawnWeight, 0);
  const random = Math.random() * totalWeight;
  
  let currentWeight = 0;
  for (const monster of monsters) {
    currentWeight += monster.spawnWeight;
    if (random <= currentWeight) {
      return {
        ...monster,
        hp: Math.floor(monster.hp * floorMultiplier)
      };
    }
  }
  
  // Fallback to first monster
  return {
    ...monsters[0],
    hp: Math.floor(monsters[0].hp * floorMultiplier)
  };
};

export const getSpellDropFromMonster = (monster: DungeonMonster): string | null => {
  // Only rare and boss monsters can drop spells
  if (monster.rarity !== 'rare' && monster.rarity !== 'boss') return null;
  
  const dropRate = monster.rarity === 'boss' ? 0.5 : 0.1; // 50% for boss, 10% for rare
  if (Math.random() > dropRate) return null;
  
  const spellDrops: Record<string, string[]> = {
    forest: ['ice_shard'], // Forest rare monsters can drop ice magic
    cave: ['lightning'], // Cave rare monsters can drop lightning magic
    volcano: ['shadow_strike'], // Volcano rare monsters can drop shadow magic
    ice: ['holy_light'], // Ice rare monsters can drop holy magic
    shadow: ['arcane_missile'], // Shadow rare monsters can drop arcane magic
    celestial: ['fire_bolt'] // Celestial rare monsters can drop enhanced fire magic
  };
  
  // Find dungeon ID by checking which dungeon contains this monster
  for (const [dungeonId, monsters] of Object.entries(dungeonMonsters)) {
    if (monsters.some(m => m.id === monster.id)) {
      const availableSpells = spellDrops[dungeonId];
      if (availableSpells && availableSpells.length > 0) {
        return availableSpells[Math.floor(Math.random() * availableSpells.length)];
      }
    }
  }
  
  return null;
};