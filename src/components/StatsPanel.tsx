import React from 'react';
import { StatsPanelProps } from '../types/gameTypes';
import './StatsPanel.css';

const StatsPanel: React.FC<StatsPanelProps> = ({ player, floor }) => {
  const expPercent = (player.exp / player.expMax) * 100;
  const hpPercent = (player.hp / player.maxHp) * 100;

  return (
    <div className="stat-panel">
      <h3>キャラクター情報</h3>
      <div className="stat-item">
        レベル: <span>{player.level}</span>
      </div>
      <div className="stat-item">
        経験値: <span>{Math.floor(player.exp)}</span> / <span>{player.expMax}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${expPercent}%` }}></div>
      </div>
      <div className="stat-item">
        HP: <span>{player.hp}</span> / <span>{player.maxHp}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill hp-bar" style={{ width: `${hpPercent}%` }}></div>
      </div>
      <div className="stat-item">
        攻撃力: <span>{player.attack}</span>
      </div>
      <div className="stat-item">
        防御力: <span>{player.defense}</span>
      </div>
      <div className="stat-item">
        クリティカル率: <span>{player.criticalRate}%</span>
      </div>
      <div className="stat-item">
        EXPボーナス: <span>{player.expBonus}%</span>
      </div>
      <div className="stat-item">
        ゴールドボーナス: <span>{player.goldBonus}%</span>
      </div>
      <div className="stat-item">
        自動攻撃速度: <span>{player.autoAttackSpeed}ms</span>
      </div>
      <div className="stat-item">
        ダンジョン階層: <span>{floor}</span>
      </div>
      <div className="stat-item">
        ゴールド: <span>{player.gold}</span>
      </div>
    </div>
  );
};

export default StatsPanel;