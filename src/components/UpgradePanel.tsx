import React from 'react';
import { UpgradePanelProps, UpgradeType } from '../types/gameTypes';
import './UpgradePanel.css';

const UpgradePanel: React.FC<UpgradePanelProps> = ({ 
  player, 
  autoAttack, 
  onUpgrade, 
  onNextFloor 
}) => {
  const handleUpgradeClick = (type: UpgradeType) => {
    onUpgrade(type);
  };

  const getUpgradeCost = (type: UpgradeType) => {
    switch (type) {
      case 'attack':
        return Math.floor(10 * Math.pow(1.2, player.upgradeCount.attack));
      case 'hp':
        return Math.floor(25 * Math.pow(1.15, player.upgradeCount.hp));
      case 'defense':
        return Math.floor(15 * Math.pow(1.18, player.upgradeCount.defense));
      case 'critical':
        return Math.floor(30 * Math.pow(1.25, player.upgradeCount.critical));
      case 'expBonus':
        return Math.floor(40 * Math.pow(1.3, player.upgradeCount.expBonus));
      case 'goldBonus':
        return Math.floor(35 * Math.pow(1.25, player.upgradeCount.goldBonus));
      case 'autoSpeed':
        return Math.floor(60 * Math.pow(1.4, player.upgradeCount.autoSpeed));
      default:
        return 0;
    }
  };

  return (
    <div className="action-panel">
      <h3>ステータス</h3>
      <div className="upgrade-grid">
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('attack')}
          onClick={() => handleUpgradeClick('attack')}
        >
          ⚔️ 攻撃力UP<br/>({getUpgradeCost('attack')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('hp')}
          onClick={() => handleUpgradeClick('hp')}
        >
          ❤️ HP UP<br/>({getUpgradeCost('hp')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('defense')}
          onClick={() => handleUpgradeClick('defense')}
        >
          🛡️ 防御力UP<br/>({getUpgradeCost('defense')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('critical')}
          onClick={() => handleUpgradeClick('critical')}
        >
          ⚡ クリティカル率UP<br/>({getUpgradeCost('critical')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('expBonus')}
          onClick={() => handleUpgradeClick('expBonus')}
        >
          📚 経験値ボーナス<br/>+10% ({getUpgradeCost('expBonus')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('goldBonus')}
          onClick={() => handleUpgradeClick('goldBonus')}
        >
          💰 ゴールドボーナス<br/>+15% ({getUpgradeCost('goldBonus')}G)
        </button>
        <button 
          className="upgrade-btn"
          disabled={player.gold < getUpgradeCost('autoSpeed') || player.autoAttackSpeed <= 100}
          onClick={() => handleUpgradeClick('autoSpeed')}
        >
          🚀 自動攻撃速度UP<br/>({getUpgradeCost('autoSpeed')}G)
        </button>
        <button 
          className={`upgrade-btn ${autoAttack ? 'auto-stop-btn' : ''}`}
          disabled={!autoAttack && player.gold < 50}
          onClick={() => handleUpgradeClick('autoAttack')}
        >
          {autoAttack ? '🔴 自動戦闘停止' : '🟢 自動戦闘開始 (50G)'}
        </button>
        <button 
          className="upgrade-btn next-floor-btn"
          onClick={onNextFloor}
        >
          次の階層へ
        </button>
      </div>
    </div>
  );
};

export default UpgradePanel;