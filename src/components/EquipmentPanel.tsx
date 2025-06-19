import React from 'react';
import { GameState, Item } from '../types/gameTypes';
import { getRarityColor } from '../data/itemData';
import { upgradeEquipment, canUpgradeEquipment } from '../data/equipmentData';
import './EquipmentPanel.css';

interface EquipmentPanelProps {
  gameState: GameState;
  onEquip: (item: Item) => void;
  onUnequip: (slot: 'head' | 'body' | 'hands' | 'feet' | 'weapon') => void;
  onUpgradeEquipment: (item: Item) => void;
}

const EquipmentPanel: React.FC<EquipmentPanelProps> = ({
  gameState,
  onEquip,
  onUnequip,
  onUpgradeEquipment
}) => {
  const { equipment, collection } = gameState;

  const getEquipmentItems = () => {
    return collection.filter(item => item.item.equipmentSlot);
  };

  const getSlotIcon = (slot: string) => {
    switch (slot) {
      case 'head': return '🎩';
      case 'body': return '🥻';
      case 'hands': return '🧤';
      case 'feet': return '👢';
      case 'weapon': return '⚔️';
      default: return '📦';
    }
  };

  const getSlotName = (slot: string) => {
    switch (slot) {
      case 'head': return '頭';
      case 'body': return '胴';
      case 'hands': return '手';
      case 'feet': return '足';
      case 'weapon': return '武器';
      default: return '';
    }
  };

  const getStatDisplay = (item: Item) => {
    if (!item.stats) return '';
    const stats = [];
    if (item.stats.attack) stats.push(`攻撃+${item.stats.attack}`);
    if (item.stats.defense) stats.push(`防御+${item.stats.defense}`);
    if (item.stats.hp) stats.push(`HP+${item.stats.hp}`);
    if (item.stats.criticalRate) stats.push(`クリ+${item.stats.criticalRate}%`);
    return stats.join(' ');
  };

  const getUpgradeDisplay = (item: Item) => {
    if (!item.upgradeLevel || item.upgradeLevel === 0) return '';
    return ` +${item.upgradeLevel}`;
  };

  return (
    <div className="equipment-panel">
      <h3>🎒 装備</h3>
      
      <div className="equipment-slots">
        {(['head', 'body', 'hands', 'feet', 'weapon'] as const).map(slot => (
          <div key={slot} className="equipment-slot">
            <div className="slot-header">
              <span className="slot-icon">{getSlotIcon(slot)}</span>
              <span className="slot-name">{getSlotName(slot)}</span>
            </div>
            
            {equipment[slot] ? (
              <div className={`equipped-item ${equipment[slot]!.rarity}`}>
                <div className="item-header">
                  <span className="item-icon">{equipment[slot]!.icon}</span>
                  <span 
                    className="item-name"
                    style={{ color: getRarityColor(equipment[slot]!.rarity) }}
                  >
                    {equipment[slot]!.name}{getUpgradeDisplay(equipment[slot]!)}
                  </span>
                </div>
                <div className="item-stats">
                  {getStatDisplay(equipment[slot]!)}
                </div>
                <button 
                  className="unequip-btn"
                  onClick={() => onUnequip(slot)}
                >
                  外す
                </button>
              </div>
            ) : (
              <div className="empty-slot">
                未装備
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="available-equipment">
        <h4>装備可能アイテム</h4>
        <div className="equipment-list">
          {getEquipmentItems().map(collectedItem => (
            <div 
              key={collectedItem.item.id}
              className={`equipment-item ${collectedItem.item.rarity}`}
            >
              <div className="item-header">
                <span className="item-icon">{collectedItem.item.icon}</span>
                <span 
                  className="item-name"
                  style={{ color: getRarityColor(collectedItem.item.rarity) }}
                >
                  {collectedItem.item.name}{getUpgradeDisplay(collectedItem.item)}
                </span>
                <span className="item-quantity">×{collectedItem.quantity}</span>
              </div>
              
              <div className="item-stats">
                {getStatDisplay(collectedItem.item)}
              </div>
              
              <div className="item-slot-type">
                {getSlotIcon(collectedItem.item.equipmentSlot!)} {getSlotName(collectedItem.item.equipmentSlot!)}
              </div>
              
              <div className="item-actions">
                <button 
                  className="equip-btn"
                  onClick={() => onEquip(collectedItem.item)}
                  disabled={equipment[collectedItem.item.equipmentSlot!]?.id === collectedItem.item.id}
                >
                  {equipment[collectedItem.item.equipmentSlot!]?.id === collectedItem.item.id ? '装備中' : '装備する'}
                </button>
                
                {canUpgradeEquipment(collectedItem.item, collectedItem.quantity) && (
                  <button 
                    className="upgrade-btn"
                    onClick={() => onUpgradeEquipment(collectedItem.item)}
                  >
                    ⭐UP!
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {getEquipmentItems().length === 0 && (
            <div className="no-equipment">
              装備可能なアイテムがありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentPanel;