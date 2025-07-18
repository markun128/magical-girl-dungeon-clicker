export const attackPhrases: string[] = [
  "我が魔力よ、闇を切り裂け！",
  "古代の契約により、汝を滅せん！",
  "封印されし力よ、今解き放たれん！",
  "星降る夜に誓いし魔法陣、発動！",
  "深淵の炎よ、我が敵を焼き尽くせ！",
  "月光に宿りし聖なる力、降臨せよ！",
  "時空を歪める禁断の魔術、炸裂！",
  "真紅の稲妻よ、我が意志に従え！",
  "氷結の呪文、永劫の眠りを与えん！",
  "光の剣よ、邪悪を貫け！",
  "闇に堕ちし者よ、浄化の時は来た！",
  "我が左手に宿りし竜の力、覚醒！",
  "天使の羽根よ、神罰を下せ！",
  "魔界の扉を開く、禁じられた呪文！",
  "紫電一閃、必殺の魔法剣！",
  "虚無の彼方より来たれ、破滅の魔弾！",
  "薔薇の棘に宿りし呪い、発動せよ！",
  "銀月の加護を受けし我が魔法、炸裂！",
  "深海の底に眠りし古代魔法、蘇生！",
  "天空に舞う雷鳴よ、我が敵を打て！"
];

export const damagePhrases: string[] = [
  "きゃあ！ダメ、そんなに強く...！",
  "痛い！もうやめて！",
  "あぁ...こんなの初めて...",
  "うぅ...負けるわけには...",
  "きゃっ！まだ戦える...はず...",
  "ひゃあ！そこは...！",
  "あ、やられちゃった...",
  "くっ...この程度じゃ...！",
  "いやぁ...でも負けない！",
  "きゃー！服が...！",
  "うぅ...でも魔法少女は諦めない！",
  "ひぃ...恥ずかしい...",
  "あん...まだ大丈夫...！",
  "いたっ！でも戦い続ける！",
  "きゃ...このままじゃ...",
  "うぐぅ...魔力が...",
  "あぁん...でも負けたくない！",
  "ひょえ...強い敵ね...",
  "きゃっ！お、お手柔らかに...！",
  "うう...みんなのために...！"
];

export const getRandomAttackPhrase = (): string => {
  return attackPhrases[Math.floor(Math.random() * attackPhrases.length)];
};

export const getRandomDamagePhrase = (): string => {
  return damagePhrases[Math.floor(Math.random() * damagePhrases.length)];
};