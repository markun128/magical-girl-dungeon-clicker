import { Item } from '../types/gameTypes';

export const equipmentItems: Item[] = [
  // Weapons
  {
    id: 'basic_wand',
    name: 'ベーシックワンド',
    description: '基本的な魔法の杖',
    rarity: 'common',
    dropRate: 20,
    icon: '🪄',
    equipmentSlot: 'weapon',
    stats: {
      attack: 5,
      criticalRate: 1
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'ベーシックロッド'
  },
  {
    id: 'crystal_staff',
    name: 'クリスタルスタッフ',
    description: '水晶を埋め込んだ強力な杖',
    rarity: 'uncommon',
    dropRate: 8,
    icon: '⚡',
    equipmentSlot: 'weapon',
    stats: {
      attack: 12,
      criticalRate: 3
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'クリスタルセプター'
  },
  {
    id: 'legendary_scepter',
    name: 'レジェンダリーセプター',
    description: '伝説の魔法使いが使用した究極の杖',
    rarity: 'legendary',
    dropRate: 1,
    icon: '🌟',
    equipmentSlot: 'weapon',
    stats: {
      attack: 50,
      criticalRate: 10
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'レジェンドセプター'
  },

  // Head Equipment
  {
    id: 'magic_hat',
    name: 'マジックハット',
    description: '魔力を高める帽子',
    rarity: 'common',
    dropRate: 15,
    icon: '🎩',
    equipmentSlot: 'head',
    stats: {
      attack: 3,
      hp: 10
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'マジックキャップ'
  },
  {
    id: 'arcane_crown',
    name: 'アーケインクラウン',
    description: '古代魔法使いの王冠',
    rarity: 'epic',
    dropRate: 2,
    icon: '👑',
    equipmentSlot: 'head',
    stats: {
      attack: 15,
      hp: 50,
      criticalRate: 5
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'アーケインティアラ'
  },

  // Body Equipment
  {
    id: 'magic_robe',
    name: 'マジックローブ',
    description: '魔法使いの基本的なローブ',
    rarity: 'common',
    dropRate: 18,
    icon: '🥻',
    equipmentSlot: 'body',
    stats: {
      defense: 5,
      hp: 20
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'マジックドレス'
  },
  {
    id: 'enchanted_armor',
    name: 'エンチャントアーマー',
    description: '魔法で強化された鎧',
    rarity: 'rare',
    dropRate: 5,
    icon: '🛡️',
    equipmentSlot: 'body',
    stats: {
      defense: 15,
      hp: 80,
      attack: 5
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'エンチャントメイル'
  },

  // Hands Equipment
  {
    id: 'magic_gloves',
    name: 'マジックグローブ',
    description: '魔法の力を宿した手袋',
    rarity: 'common',
    dropRate: 12,
    icon: '🧤',
    equipmentSlot: 'hands',
    stats: {
      attack: 4,
      criticalRate: 2
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'マジックハンド'
  },
  {
    id: 'power_gauntlets',
    name: 'パワーガントレット',
    description: '強大な力を秘めた篭手',
    rarity: 'epic',
    dropRate: 3,
    icon: '⚔️',
    equipmentSlot: 'hands',
    stats: {
      attack: 20,
      defense: 8,
      criticalRate: 6
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'パワーナックル'
  },

  // Feet Equipment
  {
    id: 'swift_boots',
    name: 'スウィフトブーツ',
    description: '素早さを高める靴',
    rarity: 'uncommon',
    dropRate: 10,
    icon: '👢',
    equipmentSlot: 'feet',
    stats: {
      defense: 3,
      hp: 15,
      criticalRate: 2
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'スウィフトシューズ'
  },
  {
    id: 'dragon_boots',
    name: 'ドラゴンブーツ',
    description: 'ドラゴンの皮で作られた最強の靴',
    rarity: 'legendary',
    dropRate: 0.5,
    icon: '🐉',
    equipmentSlot: 'feet',
    stats: {
      defense: 25,
      hp: 100,
      attack: 10,
      criticalRate: 8
    },
    upgradeLevel: 0,
    maxUpgradeLevel: 5,
    upgradedName: 'ドラゴンシューズ'
  }
];

export const getRandomEquipmentDrop = (): Item | null => {
  const roll = Math.random() * 100;
  let cumulativeRate = 0;
  
  // Sort items by drop rate (highest first) for fair distribution
  const sortedItems = [...equipmentItems].sort((a, b) => b.dropRate - a.dropRate);
  
  for (const item of sortedItems) {
    cumulativeRate += item.dropRate;
    if (roll <= cumulativeRate) {
      return { ...item, upgradeLevel: 0 };
    }
  }
  
  return null; // No equipment dropped
};

export const upgradeEquipment = (item: Item): Item => {
  if (!item.upgradeLevel || !item.maxUpgradeLevel || item.upgradeLevel >= item.maxUpgradeLevel) {
    return item;
  }

  const newUpgradeLevel = item.upgradeLevel + 1;
  const upgradeMultiplier = 1 + (newUpgradeLevel * 0.2); // 20% increase per level
  
  let newName = item.name;
  if (newUpgradeLevel === item.maxUpgradeLevel && item.upgradedName) {
    newName = item.upgradedName;
  } else if (newUpgradeLevel > 0) {
    newName = `${item.name} +${newUpgradeLevel}`;
  }

  const newStats = { ...item.stats };
  if (newStats.attack) newStats.attack = Math.floor(newStats.attack * upgradeMultiplier);
  if (newStats.defense) newStats.defense = Math.floor(newStats.defense * upgradeMultiplier);
  if (newStats.hp) newStats.hp = Math.floor(newStats.hp * upgradeMultiplier);
  if (newStats.criticalRate) newStats.criticalRate = Math.floor(newStats.criticalRate * upgradeMultiplier);

  return {
    ...item,
    name: newName,
    upgradeLevel: newUpgradeLevel,
    stats: newStats
  };
};

export const canUpgradeEquipment = (item: Item, availableQuantity: number): boolean => {
  return availableQuantity >= 5 && 
         item.upgradeLevel !== undefined && 
         item.maxUpgradeLevel !== undefined && 
         item.upgradeLevel < item.maxUpgradeLevel;
};