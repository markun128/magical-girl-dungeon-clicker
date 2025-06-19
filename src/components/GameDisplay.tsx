import React from 'react';
import { GameState } from '../types/gameTypes';
import { CHARACTER_NAME, getCurrentTitle } from '../data/characterData';
import { getCurrentDungeon } from '../data/dungeonData';
import './GameDisplay.css';

interface GameDisplayProps {
  gameState: GameState;
  onAttackClick: () => void;
  attackPhrase: string;
  damagePhrase: string;
}

const GameDisplay: React.FC<GameDisplayProps> = ({ 
  gameState, 
  onAttackClick, 
  attackPhrase,
  damagePhrase
}) => {
  const { player, monsters, currentFloor, currentDungeonId, unlockedTitles } = gameState;
  const currentMonster = monsters[0];
  const currentTitle = getCurrentTitle(player.level, currentFloor, unlockedTitles);
  const currentDungeon = getCurrentDungeon(currentFloor);

  return (
    <div className="game-display">
      <div className="game-header">
        <h2>{currentDungeon.icon} {currentDungeon.name} {currentFloor}階 {currentDungeon.icon}</h2>
        <div className="dungeon-description">{currentDungeon.description}</div>
      </div>

      <div className="battle-area">
        <div className="player-section">
          <div className="character-display">
            <div className="character-name">
              ✨ {CHARACTER_NAME} ✨
            </div>
            <div className="character-title">
              『{currentTitle.name}』
            </div>
            <div className="character-level">
              Lv.{player.level}
            </div>
            {damagePhrase && (
              <div className="damage-dialogue">
                <div className="damage-bubble">
                  "{damagePhrase}"
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="vs-section">
          <div className="battle-text">
            {attackPhrase && (
              <div className="attack-dialogue">
                <div className="dialogue-bubble">
                  "{attackPhrase}"
                </div>
                <div className="effect-text">
                  ⚡💥✨ 魔法攻撃 ✨💥⚡
                </div>
              </div>
            )}
            {!attackPhrase && currentMonster && (
              <div className="idle-text">
                クリックして攻撃！
              </div>
            )}
          </div>
        </div>

        <div className="monster-section">
          {currentMonster ? (
            <div className="monster-display">
              <div className="monster-name">
                {getMonsterEmoji(currentMonster.name)} {currentMonster.name}
              </div>
              <div className="monster-level">
                Lv.{currentMonster.level}
              </div>
              <div className="monster-stats">
                <div className="monster-hp">
                  HP: {currentMonster.hp}/{currentMonster.maxHp}
                </div>
                <div className="monster-attack">
                  ATK: {currentMonster.attack}
                </div>
              </div>
              <div className="hp-bar">
                <div 
                  className="hp-fill"
                  style={{
                    width: `${(currentMonster.hp / currentMonster.maxHp) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="no-monster">
              モンスターを召喚中...
            </div>
          )}
        </div>
      </div>

      <div className="action-section">
        <button 
          className="attack-button"
          onClick={onAttackClick}
        >
          ⚔️ 攻撃 ⚔️
        </button>
        {gameState.autoAttack && (
          <div className="auto-battle-indicator">
            🔄 自動戦闘中...
          </div>
        )}
      </div>
    </div>
  );
};

const getMonsterEmoji = (name: string): string => {
  // Try to find emoji in monster name or use default mapping
  if (name.includes('スライム')) return '🟢';
  if (name.includes('ゴブリン')) return '👺';
  if (name.includes('オーク')) return '👹';
  if (name.includes('ドラゴン') || name.includes('竜')) return '🐉';
  if (name.includes('コウモリ') || name.includes('バット')) return '🦇';
  if (name.includes('蜘蛛') || name.includes('スパイダー')) return '🕷️';
  if (name.includes('トロル')) return '👹';
  if (name.includes('ゴーレム')) return '🗿';
  if (name.includes('妖精') || name.includes('フェアリー')) return '🧚';
  if (name.includes('狼') || name.includes('ウルフ')) return '🐺';
  if (name.includes('熊') || name.includes('ベア')) return '🐻';
  if (name.includes('天使') || name.includes('エンジェル')) return '👼';
  if (name.includes('騎士') || name.includes('ナイト')) return '⚔️';
  if (name.includes('王') || name.includes('帝') || name.includes('主')) return '👑';
  if (name.includes('神')) return '☀️';
  if (name.includes('悪魔') || name.includes('デモン')) return '👹';
  if (name.includes('霊') || name.includes('ゴースト')) return '👻';
  if (name.includes('鳥')) return '🕊️';
  if (name.includes('火') || name.includes('炎')) return '🔥';
  if (name.includes('氷') || name.includes('雪')) return '❄️';
  if (name.includes('光')) return '✨';
  if (name.includes('影') || name.includes('闇')) return '🌑';
  
  return '👾';
};

export default GameDisplay;