import React from 'react';
import { BattleLog } from '../types/gameTypes';
import { getRarityColor } from '../data/itemData';
import './BattleLog.css';

interface BattleLogProps {
  logs: BattleLog[];
}

const BattleLogComponent: React.FC<BattleLogProps> = ({ logs }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'attack': return '⚔️';
      case 'levelup': return '⬆️';
      case 'item_drop': return '📦';
      case 'monster_defeat': return '💀';
      default: return '📝';
    }
  };

  return (
    <div className="battle-log">
      <h3>📜 戦闘ログ</h3>
      <div className="log-container">
        {logs.length === 0 ? (
          <div className="no-logs">戦闘を開始してください</div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className={`log-entry ${log.type}`}
            >
              <div className="log-header">
                <span className="log-icon">{getLogIcon(log.type)}</span>
                <span className="log-time">{formatTime(log.timestamp)}</span>
              </div>
              <div className="log-message">{log.message}</div>
              {log.attackPhrase && (
                <div className="log-attack-phrase">
                  💭 "{log.attackPhrase}"
                </div>
              )}
              {log.item && (
                <div 
                  className="log-item"
                  style={{ color: getRarityColor(log.item.rarity) }}
                >
                  {log.item.icon} {log.item.name} ({log.item.rarity})
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BattleLogComponent;