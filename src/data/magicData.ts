export interface MagicSpell {
  id: string;
  name: string;
  description: string;
  element: 'fire' | 'ice' | 'lightning' | 'dark' | 'light' | 'earth' | 'wind' | 'arcane';
  unlockLevel: number;
  level: number;
  maxLevel: number;
  baseDamage: number;
  damagePerLevel: number;
  cost: number;
  costMultiplier: number;
  icon: string;
  nameEvolutions: {
    level1: string;
    level10: string;
    level20: string;
    level30: string;
    level40: string;
    level50: string;
  };
  phrases: {
    level1: string[];
    level5: string[];
    level10: string[];
    level15: string[];
    level20: string[];
    max: string[];
  };
}

export const magicSpells: MagicSpell[] = [
  {
    id: 'fire_bolt',
    name: 'ファイアボルト',
    description: '基本的な炎の魔法',
    nameEvolutions: {
      level1: 'ファイアボルト',
      level10: 'インフェルナル・ファイアボール',
      level20: 'フレイム・エンペラー・キャノン',
      level30: 'ソーラー・ゴッド・ストライク',
      level40: 'コズミック・インシネレーション',
      level50: 'ジェネシス・フレイム・ゴッド・キャノン'
    },
    element: 'fire',
    unlockLevel: 1,
    level: 1,
    maxLevel: 20,
    baseDamage: 5,
    damagePerLevel: 2,
    cost: 10,
    costMultiplier: 1.5,
    icon: '🔥',
    phrases: {
      level1: [
        "炎よ、我が敵を焼け！",
        "火の玉よ、飛び散れ！",
        "燃え上がれ、ファイアボルト！"
      ],
      level5: [
        "紅蓮の炎よ、我が意志に従え！",
        "灼熱の業火、敵を焼き尽くせ！",
        "炎の精霊よ、力を貸せ！"
      ],
      level10: [
        "地獄の業火よ、降臨せよ！",
        "煉獄の炎、全てを灰燼に帰せ！",
        "火炎の覇王、我が敵を滅せん！"
      ],
      level15: [
        "太陽の怒りよ、この地に降り注げ！",
        "不滅の業火、永劫の炎となりて燃え盛れ！",
        "炎帝の威光、我が手に宿りし真紅の審判！"
      ],
      level20: [
        "創世の炎よ、万物を焼き尽くす原初の力！",
        "宇宙を焼く業火、星々すら灰燼と化す究極炎帝術！",
        "炎神の真名を呼び、天地を焼き払う終焉の劫火！"
      ],
      max: [
        "【焔神滅殺陣】炎の彼方より来たれ、万象焼却の究極奥義！",
        "【煉獄天焼術】創造神すら恐れる、宇宙消滅の終極業火！",
        "【太陽皇帝砲】恒星を凌駕する、絶対零度を超えた無限炎熱！"
      ]
    }
  },
  {
    id: 'ice_shard',
    name: 'アイスシャード',
    description: '氷の刃を放つ魔法',
    nameEvolutions: {
      level1: 'アイスシャード',
      level10: 'アブソルート・ゼロ・アーツ',
      level20: 'フロスト・エンペラー・ブレード',
      level30: 'エターナル・アイス・シール・キャノン',
      level40: 'コズミック・フリーズ',
      level50: 'ヴォイド・アイス・ゴッド・キャノン'
    },
    element: 'ice',
    unlockLevel: 3,
    level: 1,
    maxLevel: 20,
    baseDamage: 7,
    damagePerLevel: 3,
    cost: 15,
    costMultiplier: 1.6,
    icon: '❄️',
    phrases: {
      level1: [
        "氷よ、鋭き刃となれ！",
        "凍てつく氷の矢よ！",
        "アイスシャード、貫け！"
      ],
      level5: [
        "極寒の刃よ、敵を刺し貫け！",
        "氷晶の槍、魂まで凍らせよ！",
        "ブリザードの怒り、炸裂せよ！"
      ],
      level10: [
        "絶対零度の刃、全てを凍結せよ！",
        "氷河期の呪い、敵を永劫の氷に！",
        "氷雪の女王、我に力を！"
      ],
      level15: [
        "天界の氷雪よ、絶対静寂の刃となれ！",
        "永劫氷牢、時間すら凍らせる究極の冷気！",
        "氷帝の威厳、万物を静寂に包む絶対零界！"
      ],
      level20: [
        "宇宙の果ての冷気よ、熱死を呼ぶ終焉の氷！",
        "時空を凍らせる原初の寒気、存在すら凍結せよ！",
        "氷神の真髄、エントロピーすら停止する絶対氷界！"
      ],
      max: [
        "【氷神絶殺陣】宇宙の終焉を告げる、絶対零度を超えた虚無の氷！",
        "【永劫氷封術】時間と空間を凍らせる、究極の静寂術！",
        "【絶対零皇砲】存在概念すら凍結する、神すら恐れる氷の終極！"
      ]
    }
  },
  {
    id: 'lightning',
    name: 'ライトニング',
    description: '雷の力を呼び起こす魔法',
    nameEvolutions: {
      level1: 'ライトニング',
      level10: 'ディヴァイン・サンダー・パニッシュメント',
      level20: 'サンダー・エンペラー・アナイアレーション',
      level30: 'セレスティアル・ライトニング・アーツ',
      level40: 'コズミック・サンダー・ゴッド・キャノン',
      level50: 'ジェネシス・サンダー・エンペラー・キャノン'
    },
    element: 'lightning',
    unlockLevel: 5,
    level: 1,
    maxLevel: 20,
    baseDamage: 10,
    damagePerLevel: 4,
    cost: 20,
    costMultiplier: 1.7,
    icon: '⚡',
    phrases: {
      level1: [
        "雷よ、敵を打ち砕け！",
        "電光石火、ライトニング！",
        "雷鳴轟け、稲妻よ！"
      ],
      level5: [
        "天の怒り、雷神の裁きを！",
        "紫電一閃、敵を粉砕せよ！",
        "雷帝の威光、炸裂せよ！"
      ],
      level10: [
        "天罰の雷、神の怒りを示せ！",
        "雷神の真髄、万雷の轟きよ！",
        "雷皇帝、天地を震撼させよ！"
      ],
      level15: [
        "宇宙を貫く神雷よ、天界の審判を下せ！",
        "雷帝の真名、万象を粉砕する究極の電光！",
        "神域の雷鳴、存在すら粉砕する天の裁き！"
      ],
      level20: [
        "創世の雷よ、ビッグバンを再現する原初の電撃！",
        "宇宙を走る神経、銀河すら粉砕する究極雷帝術！",
        "雷神の終極、時空を切り裂く無限電圧！"
      ],
      max: [
        "【雷神滅殺陣】天地創造の雷、宇宙の法則を粉砕する終極電撃！",
        "【万雷皇帝砲】神々すら恐れる、次元を超越した無限雷撃！",
        "【天罰絶対術】創造神の怒り、存在概念を消去する究極雷刑！"
      ]
    }
  },
  {
    id: 'shadow_strike',
    name: 'シャドウストライク',
    description: '闇の力で敵を襲う魔法',
    nameEvolutions: {
      level1: 'シャドウストライク',
      level10: 'アビサル・ヴォイド・アーツ',
      level20: 'ダーク・エンペラー・アナイアレーション',
      level30: 'ヴォイド・ドミニオン・アーツ',
      level40: 'ディメンショナル・イレイザー・キャノン',
      level50: 'エグジスタンス・オブリタレーション'
    },
    element: 'dark',
    unlockLevel: 8,
    level: 1,
    maxLevel: 20,
    baseDamage: 12,
    damagePerLevel: 5,
    cost: 25,
    costMultiplier: 1.8,
    icon: '🌑',
    phrases: {
      level1: [
        "闇よ、敵を包め！",
        "影の刃、敵を斬れ！",
        "シャドウストライク！"
      ],
      level5: [
        "深淵の闇よ、敵を呑み込め！",
        "虚無の刃、魂を切り裂け！",
        "闇の帝王、力を貸せ！"
      ],
      level10: [
        "無の深淵、全てを闇に還せ！",
        "虚無の支配者、我が敵を消せ！",
        "闇黒皇帝、降臨せよ！"
      ],
      level15: [
        "深淵の彼方より、絶対暗黒の審判を！",
        "虚無の皇帝、存在すら無に帰す闇の支配！",
        "闇神の威光、光すら呑み込む絶対暗黒界！"
      ],
      level20: [
        "宇宙の果ての闇よ、全ての光を呑み込む原初の虚無！",
        "存在の彼方、概念すら消去する究極闇帝術！",
        "闇神の本体、万物を無に還す終焉の深淵！"
      ],
      max: [
        "【闇神絶殺陣】創世以前の闇、全存在を無に還す究極虚無術！",
        "【深淵皇帝砲】神すら恐れる、次元を消去する絶対暗黒！",
        "【虚無創造術】無の概念すら超越した、究極の存在消去術！"
      ]
    }
  },
  {
    id: 'holy_light',
    name: 'ホーリーライト',
    description: '聖なる光の魔法',
    nameEvolutions: {
      level1: 'ホーリーライト',
      level10: 'セレスティアル・セイクリッド・ライト',
      level20: 'ライト・エンペラー・ピュリフィケーション',
      level30: 'ディヴァイン・レルム・イルミネーション',
      level40: 'コズミック・セイクリッド・ライト・キャノン',
      level50: 'ジェネシス・ライト・ゴッド・アーツ'
    },
    element: 'light',
    unlockLevel: 10,
    level: 1,
    maxLevel: 20,
    baseDamage: 8,
    damagePerLevel: 3,
    cost: 18,
    costMultiplier: 1.6,
    icon: '✨',
    phrases: {
      level1: [
        "聖なる光よ、悪を払え！",
        "神の恵み、ホーリーライト！",
        "浄化の光、輝け！"
      ],
      level5: [
        "天界の光よ、邪悪を滅せよ！",
        "神聖なる輝き、敵を浄化せよ！",
        "光の天使、力を貸せ！"
      ],
      level10: [
        "神の威光、全てを照らせ！",
        "聖域の光、悪しき者を滅せよ！",
        "光明皇帝、降臨せよ！"
      ],
      level15: [
        "天界の威光よ、神域の裁きを示せ！",
        "光神の真名、万物を照らす絶対聖光！",
        "聖帝の威厳、闇すら浄化する無限光明！"
      ],
      level20: [
        "創世の光よ、宇宙を照らす原初の輝き！",
        "光神の本質、全存在を浄化する究極聖光術！",
        "聖なる終極、闇の概念すら消去する絶対光！"
      ],
      max: [
        "【光神滅殺陣】創造の光、万物を浄化する究極聖光術！",
        "【聖域皇帝砲】神々の威光、次元を照らす絶対聖光！",
        "【創世光明術】宇宙の始まり、全てを照らす原初の神光！"
      ]
    }
  },
  {
    id: 'arcane_missile',
    name: 'アーケインミサイル',
    description: '純粋な魔力の弾丸',
    nameEvolutions: {
      level1: 'アーケインミサイル',
      level10: 'プライモーディアル・マナ・キャノン',
      level20: 'アーケイン・エンペラー・ドミニオン',
      level30: 'リアリティ・オルタレーション・キャノン',
      level40: 'ディメンショナル・マニピュレーション',
      level50: 'クリエイター・ゴッド・マジック・キャノン'
    },
    element: 'arcane',
    unlockLevel: 15,
    level: 1,
    maxLevel: 20,
    baseDamage: 15,
    damagePerLevel: 6,
    cost: 30,
    costMultiplier: 2.0,
    icon: '🔮',
    phrases: {
      level1: [
        "純粋な魔力よ、敵を貫け！",
        "アーケインミサイル、発射！",
        "魔法の弾丸、炸裂せよ！"
      ],
      level5: [
        "根源の魔力よ、敵を粉砕せよ！",
        "魔法の真髄、純粋なる力よ！",
        "アーケインの皇帝、力を貸せ！"
      ],
      level10: [
        "魔法の根源、全てを貫く純粋力！",
        "アーケインの支配者、敵を消せ！",
        "魔力皇帝、降臨せよ！"
      ],
      level15: [
        "魔法の源流よ、根源の力を解放せよ！",
        "アーケインの皇帝、純粋魔力の究極審判！",
        "魔法神の威光、万象を支配する絶対魔力！"
      ],
      level20: [
        "宇宙の魔力よ、全ての法則を支配する原初の力！",
        "魔法の神髄、存在の根源を操る究極アーケイン術！",
        "魔力神の本体、現実を書き換える終極魔法！"
      ],
      max: [
        "【魔神絶殺陣】魔法の起源、現実を創造する究極アーケイン術！",
        "【根源皇帝砲】宇宙の法則、万物を支配する絶対魔力！",
        "【現実改変術】神すら超越する、存在を書き換える究極魔法！"
      ]
    }
  }
];

export const getRandomPhrase = (spellId: string, level: number): string => {
  const spell = magicSpells.find(s => s.id === spellId);
  if (!spell) return "我が魔力よ、闇を切り裂け！";

  let phrases: string[];
  
  if (level >= 20) {
    phrases = spell.phrases.max;
  } else if (level >= 15) {
    phrases = spell.phrases.level15;
  } else if (level >= 10) {
    phrases = spell.phrases.level10;
  } else if (level >= 5) {
    phrases = spell.phrases.level5;
  } else {
    phrases = spell.phrases.level1;
  }

  return phrases[Math.floor(Math.random() * phrases.length)];
};

export const getSpellDamageBonus = (spellId: string, level: number): number => {
  const spell = magicSpells.find(s => s.id === spellId);
  if (!spell) return 0;
  
  return spell.baseDamage + (spell.damagePerLevel * (level - 1));
};

export const getSpellUpgradeCost = (spellId: string, currentLevel: number): number => {
  const spell = magicSpells.find(s => s.id === spellId);
  if (!spell) return 999999;
  
  return Math.floor(spell.cost * Math.pow(spell.costMultiplier, currentLevel - 1));
};

export const getAvailableSpells = (playerLevel: number): MagicSpell[] => {
  return magicSpells.filter(spell => spell.unlockLevel <= playerLevel);
};

export const getSpellDisplayName = (spellId: string, level: number): string => {
  const spell = magicSpells.find(s => s.id === spellId);
  if (!spell) return 'Unknown Spell';
  
  if (level >= 50) {
    return spell.nameEvolutions.level50;
  } else if (level >= 40) {
    return spell.nameEvolutions.level40;
  } else if (level >= 30) {
    return spell.nameEvolutions.level30;
  } else if (level >= 20) {
    return spell.nameEvolutions.level20;
  } else if (level >= 10) {
    return spell.nameEvolutions.level10;
  } else {
    return spell.nameEvolutions.level1;
  }
};