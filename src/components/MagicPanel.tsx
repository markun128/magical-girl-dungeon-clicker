import React from 'react';
import { magicSpells, getSpellUpgradeCost, getAvailableSpells, getSpellDisplayName } from '../data/magicData';
import './MagicPanel.css';

interface MagicPanelProps {
  playerLevel: number;
  playerGold: number;
  magicSpells: Record<string, number>;
  currentSpell: string;
  onSpellUpgrade: (spellId: string) => void;
  onSpellSelect: (spellId: string) => void;
}

const MagicPanel: React.FC<MagicPanelProps> = ({
  playerLevel,
  playerGold,
  magicSpells: playerSpells,
  currentSpell,
  onSpellUpgrade,
  onSpellSelect
}) => {
  const availableSpells = getAvailableSpells(playerLevel);

  const getElementColor = (element: string): string => {
    switch (element) {
      case 'fire': return '#ff6b6b';
      case 'ice': return '#74b9ff';
      case 'lightning': return '#fdcb6e';
      case 'dark': return '#6c5ce7';
      case 'light': return '#f1c40f';
      case 'earth': return '#00b894';
      case 'wind': return '#00cec9';
      case 'arcane': return '#a29bfe';
      default: return '#ddd';
    }
  };

  const getSpellLevel = (spellId: string): number => {
    return playerSpells[spellId] || 0;
  };

  return (
    <div className="magic-panel">
      <h3>🔮 魔法一覧</h3>
      
      <div className="current-spell">
        <div className="current-spell-label">使用中の魔法:</div>
        {currentSpell && (
          <div className="current-spell-info">
            <span className="spell-icon">
              {magicSpells.find(s => s.id === currentSpell)?.icon}
            </span>
            <span className="spell-name">
              {getSpellDisplayName(currentSpell, getSpellLevel(currentSpell))}
            </span>
            <span className="spell-level">
              Lv.{getSpellLevel(currentSpell)}
            </span>
          </div>
        )}
      </div>

      <div className="spells-container">
        {availableSpells.map((spell) => {
          const currentLevel = getSpellLevel(spell.id);
          const upgradeCost = currentLevel > 0 ? getSpellUpgradeCost(spell.id, currentLevel) : 0;
          const isMaxLevel = currentLevel >= spell.maxLevel;
          const canAfford = playerGold >= upgradeCost;
          const isUnlocked = currentLevel > 0;

          return (
            <div 
              key={spell.id} 
              className={`spell-item ${currentSpell === spell.id ? 'selected' : ''} ${!isUnlocked ? 'locked' : ''}`}
            >
              <div className="spell-header">
                <span 
                  className="spell-icon"
                  style={{ color: getElementColor(spell.element) }}
                >
                  {spell.icon}
                </span>
                <div className="spell-info">
                  <div className="spell-name">{getSpellDisplayName(spell.id, currentLevel)}</div>
                  <div className="spell-element" style={{ color: getElementColor(spell.element) }}>
                    {spell.element.toUpperCase()}
                  </div>
                </div>
                <div className="spell-level-info">
                  {isUnlocked ? (
                    <span className="spell-level">Lv.{currentLevel}</span>
                  ) : (
                    <span className="unlock-level">Lv.{spell.unlockLevel}で解放</span>
                  )}
                </div>
              </div>

              <div className="spell-description">
                {spell.description}
              </div>

              {isUnlocked && (
                <div className="spell-stats">
                  <div className="stat">
                    ダメージ: +{spell.baseDamage + (spell.damagePerLevel * (currentLevel - 1))}
                  </div>
                </div>
              )}

              <div className="spell-actions">
                {isUnlocked && currentSpell !== spell.id && (
                  <button 
                    className="select-spell-btn"
                    onClick={() => onSpellSelect(spell.id)}
                  >
                    選択
                  </button>
                )}

                {!isUnlocked && playerLevel >= spell.unlockLevel && (
                  <button 
                    className="unlock-spell-btn"
                    onClick={() => onSpellUpgrade(spell.id)}
                  >
                    習得
                  </button>
                )}

                {isUnlocked && !isMaxLevel && (
                  <button 
                    className={`upgrade-spell-btn ${!canAfford ? 'disabled' : ''}`}
                    disabled={!canAfford}
                    onClick={() => onSpellUpgrade(spell.id)}
                  >
                    強化 ({upgradeCost}G)
                  </button>
                )}

                {isMaxLevel && (
                  <div className="max-level">MAX</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MagicPanel;