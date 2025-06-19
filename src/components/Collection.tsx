import React, { useState } from 'react';
import { CollectedItem } from '../types/gameTypes';
import { getRarityColor, getItemSellPrice } from '../data/itemData';
import './Collection.css';

interface CollectionProps {
  collection: CollectedItem[];
  onSellItem: (itemId: string, quantity: number) => void;
}

const Collection: React.FC<CollectionProps> = ({ collection, onSellItem }) => {
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'quantity' | 'date'>('rarity');
  const [sellQuantities, setSellQuantities] = useState<Record<string, number>>({});

  const handleSellQuantityChange = (itemId: string, quantity: number) => {
    setSellQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleSellItem = (itemId: string) => {
    const quantity = sellQuantities[itemId] || 1;
    onSellItem(itemId, quantity);
    setSellQuantities(prev => ({
      ...prev,
      [itemId]: 0
    }));
  };

  const sortedCollection = [...collection].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.item.name.localeCompare(b.item.name, 'ja');
      case 'rarity':
        const rarityOrder = { 'common': 1, 'uncommon': 2, 'rare': 3, 'epic': 4, 'legendary': 5 };
        return (rarityOrder[b.item.rarity] || 0) - (rarityOrder[a.item.rarity] || 0);
      case 'quantity':
        return b.quantity - a.quantity;
      case 'date':
        return new Date(b.firstObtained).getTime() - new Date(a.firstObtained).getTime();
      default:
        return 0;
    }
  });

  const totalItems = collection.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = collection.length;

  return (
    <div className="collection">
      <h3>📦 コレクション</h3>
      
      <div className="collection-stats">
        <div className="stat">
          <span className="stat-label">総アイテム数:</span>
          <span className="stat-value">{totalItems}</span>
        </div>
        <div className="stat">
          <span className="stat-label">種類:</span>
          <span className="stat-value">{uniqueItems}</span>
        </div>
      </div>

      <div className="sort-controls">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as any)}
          className="sort-select"
        >
          <option value="rarity">レア度順</option>
          <option value="name">名前順</option>
          <option value="quantity">数量順</option>
          <option value="date">取得日順</option>
        </select>
      </div>

      <div className="items-container">
        {collection.length === 0 ? (
          <div className="no-items">
            まだアイテムを獲得していません
          </div>
        ) : (
          sortedCollection.map((collectedItem) => (
            <div 
              key={collectedItem.item.id} 
              className={`collection-item ${collectedItem.item.rarity}`}
            >
              <div className="item-header">
                <span className="item-icon">{collectedItem.item.icon}</span>
                <span className="item-quantity">×{collectedItem.quantity}</span>
              </div>
              
              <div 
                className="item-name"
                style={{ color: getRarityColor(collectedItem.item.rarity) }}
              >
                {collectedItem.item.name}
              </div>
              
              <div className="item-rarity">
                {collectedItem.item.rarity}
              </div>
              
              <div className="item-description">
                {collectedItem.item.description}
              </div>
              
              {collectedItem.item.effect && (
                <div className="item-effect">
                  効果: {collectedItem.item.effect.type === 'attack' ? '攻撃力' : 
                         collectedItem.item.effect.type === 'hp' ? 'HP' :
                         collectedItem.item.effect.type === 'exp' ? '経験値' : 'ゴールド'}
                  +{collectedItem.item.effect.value}
                </div>
              )}
              
              <div className="item-date">
                初回取得: {collectedItem.firstObtained.toLocaleDateString('ja-JP')}
              </div>
              
              <div className="sell-section">
                <div className="sell-price">
                  売値: {getItemSellPrice(collectedItem.item)}G
                </div>
                <div className="sell-controls">
                  <input 
                    type="number" 
                    min="1" 
                    max={collectedItem.quantity}
                    value={sellQuantities[collectedItem.item.id] || 1}
                    onChange={(e) => handleSellQuantityChange(collectedItem.item.id, parseInt(e.target.value) || 1)}
                    className="sell-quantity-input"
                  />
                  <button 
                    className="sell-btn"
                    onClick={() => handleSellItem(collectedItem.item.id)}
                    disabled={collectedItem.quantity === 0}
                  >
                    💰 売却
                  </button>
                </div>
                <button 
                  className="sell-all-btn"
                  onClick={() => handleSellItem(collectedItem.item.id)}
                  onMouseEnter={() => handleSellQuantityChange(collectedItem.item.id, collectedItem.quantity)}
                  disabled={collectedItem.quantity === 0}
                >
                  全て売却 ({getItemSellPrice(collectedItem.item) * collectedItem.quantity}G)
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;