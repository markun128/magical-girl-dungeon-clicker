export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  dropRate: number; // percentage (0-100)
  effect?: {
    type: 'attack' | 'hp' | 'exp' | 'gold';
    value: number;
  };
  icon: string;
  sellPrice?: number;
}

export interface BattleLog {
  id: number;
  timestamp: Date;
  type: 'attack' | 'levelup' | 'item_drop' | 'monster_defeat';
  message: string;
  attackPhrase?: string;
  item?: Item;
}

export const items: Item[] = [
  // Common Items (30% drop rate)
  {
    id: 'magic_crystal',
    name: '魔法結晶',
    description: '微弱な魔力を帯びた結晶',
    rarity: 'common',
    dropRate: 30,
    effect: { type: 'attack', value: 1 },
    icon: '💎'
  },
  {
    id: 'potion',
    name: '回復ポーション',
    description: '体力を回復する薬',
    rarity: 'common',
    dropRate: 25,
    effect: { type: 'hp', value: 10 },
    icon: '🧪'
  },
  
  // Uncommon Items (15% drop rate)
  {
    id: 'enchanted_ring',
    name: '魔力の指輪',
    description: '魔法の力を高める指輪',
    rarity: 'uncommon',
    dropRate: 15,
    effect: { type: 'attack', value: 3 },
    icon: '💍'
  },
  {
    id: 'exp_tome',
    name: '知識の書',
    description: '経験値を増加させる古書',
    rarity: 'uncommon',
    dropRate: 12,
    effect: { type: 'exp', value: 50 },
    icon: '📜'
  },
  
  // Rare Items (8% drop rate)
  {
    id: 'magic_staff',
    name: '魔導師の杖',
    description: '高位魔法使いが使用する杖',
    rarity: 'rare',
    dropRate: 8,
    effect: { type: 'attack', value: 10 },
    icon: '🔮'
  },
  {
    id: 'golden_coin',
    name: '古代金貨',
    description: '古代文明の貴重な金貨',
    rarity: 'rare',
    dropRate: 6,
    effect: { type: 'gold', value: 100 },
    icon: '🪙'
  },
  
  // Epic Items (3% drop rate)
  {
    id: 'dragon_scale',
    name: 'ドラゴンの鱗',
    description: '伝説のドラゴンから得た鱗',
    rarity: 'epic',
    dropRate: 3,
    effect: { type: 'hp', value: 100 },
    icon: '🐲'
  },
  {
    id: 'arcane_orb',
    name: '秘術の宝珠',
    description: '強大な魔力を秘めた宝珠',
    rarity: 'epic',
    dropRate: 2,
    effect: { type: 'attack', value: 25 },
    icon: '🔮'
  },
  
  // Legendary Items (1% drop rate)
  {
    id: 'excalibur',
    name: 'エクスカリバー',
    description: '伝説の聖剣',
    rarity: 'legendary',
    dropRate: 1,
    effect: { type: 'attack', value: 100 },
    icon: '⚔️'
  },
  {
    id: 'philosophers_stone',
    name: '賢者の石',
    description: '究極の錬金術の産物',
    rarity: 'legendary',
    dropRate: 0.5,
    effect: { type: 'attack', value: 50 },
    icon: '💍'
  }
];

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return '#ffffff';
    case 'uncommon': return '#1eff00';
    case 'rare': return '#0099ff';
    case 'epic': return '#a335ee';
    case 'legendary': return '#ff8000';
    default: return '#ffffff';
  }
};

export const getRandomItemDrop = (): Item | null => {
  const roll = Math.random() * 100;
  let cumulativeRate = 0;
  
  // Sort items by drop rate (highest first) for fair distribution
  const sortedItems = [...items].sort((a, b) => b.dropRate - a.dropRate);
  
  for (const item of sortedItems) {
    cumulativeRate += item.dropRate;
    if (roll <= cumulativeRate) {
      return item;
    }
  }
  
  return null; // No item dropped
};

export const getItemSellPrice = (item: Item): number => {
  if (item.sellPrice) {
    return item.sellPrice;
  }
  
  // Calculate sell price based on rarity
  const basePrice = {
    'common': 5,
    'uncommon': 15,
    'rare': 50,
    'epic': 150,
    'legendary': 500
  };
  
  return basePrice[item.rarity] || 1;
};