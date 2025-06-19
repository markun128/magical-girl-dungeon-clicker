export interface Title {
  id: string;
  name: string;
  description: string;
  requirement: {
    type: 'level' | 'floor' | 'both';
    level?: number;
    floor?: number;
  };
  unlocked: boolean;
}

export const CHARACTER_NAME = "セラフィナ・ルミナス";

export const titles: Title[] = [
  {
    id: 'novice',
    name: '見習い魔法使い',
    description: '魔法の道を歩み始めた者',
    requirement: { type: 'level', level: 1 },
    unlocked: true
  },
  {
    id: 'apprentice',
    name: '魔法学徒',
    description: '基礎魔法を習得した学習者',
    requirement: { type: 'level', level: 5 },
    unlocked: false
  },
  {
    id: 'adept',
    name: '魔導師',
    description: '中級魔法を操る者',
    requirement: { type: 'level', level: 10 },
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'ダンジョン探索者',
    description: '深層への挑戦者',
    requirement: { type: 'floor', floor: 5 },
    unlocked: false
  },
  {
    id: 'mage',
    name: '上級魔法使い',
    description: '高度な魔法を習得した者',
    requirement: { type: 'level', level: 15 },
    unlocked: false
  },
  {
    id: 'conqueror',
    name: 'ダンジョン征服者',
    description: '数多のダンジョンを制覇した者',
    requirement: { type: 'floor', floor: 10 },
    unlocked: false
  },
  {
    id: 'archmage',
    name: '大魔導師',
    description: '魔法の奥義を極めし者',
    requirement: { type: 'level', level: 25 },
    unlocked: false
  },
  {
    id: 'abyssal',
    name: '深淵の探求者',
    description: 'ダンジョンの深奥に到達した者',
    requirement: { type: 'floor', floor: 20 },
    unlocked: false
  },
  {
    id: 'legendary',
    name: '伝説の魔法使い',
    description: '伝説に名を刻む偉大なる魔法使い',
    requirement: { type: 'both', level: 30, floor: 25 },
    unlocked: false
  },
  {
    id: 'transcendent',
    name: '超越者',
    description: '人間の限界を超越した存在',
    requirement: { type: 'both', level: 50, floor: 50 },
    unlocked: false
  },
  {
    id: 'goddess',
    name: '魔法女神',
    description: '魔法そのものを体現する究極の存在',
    requirement: { type: 'both', level: 100, floor: 100 },
    unlocked: false
  }
];

export const getCurrentTitle = (level: number, floor: number, unlockedTitles: string[]): Title => {
  // 解放されている称号の中で最も高位のものを返す
  const availableTitles = titles.filter(title => {
    if (!unlockedTitles.includes(title.id)) return false;
    
    switch (title.requirement.type) {
      case 'level':
        return level >= (title.requirement.level || 0);
      case 'floor':
        return floor >= (title.requirement.floor || 0);
      case 'both':
        return level >= (title.requirement.level || 0) && floor >= (title.requirement.floor || 0);
      default:
        return false;
    }
  });

  // 最後の（最も高位の）称号を返す
  return availableTitles[availableTitles.length - 1] || titles[0];
};

export const checkNewTitleUnlocks = (level: number, floor: number, currentUnlocked: string[]): Title[] => {
  const newUnlocks: Title[] = [];
  
  titles.forEach(title => {
    if (currentUnlocked.includes(title.id)) return;
    
    let shouldUnlock = false;
    
    switch (title.requirement.type) {
      case 'level':
        shouldUnlock = level >= (title.requirement.level || 0);
        break;
      case 'floor':
        shouldUnlock = floor >= (title.requirement.floor || 0);
        break;
      case 'both':
        shouldUnlock = level >= (title.requirement.level || 0) && floor >= (title.requirement.floor || 0);
        break;
    }
    
    if (shouldUnlock) {
      newUnlocks.push(title);
    }
  });
  
  return newUnlocks;
};