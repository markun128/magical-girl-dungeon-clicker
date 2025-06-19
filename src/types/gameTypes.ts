export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  level: number;
  exp: number;
  expMax: number;
  attack: number;
  gold: number;
  animFrame: number;
  animSpeed: number;
  isAttacking: boolean;
  attackCooldown: number;
  defense: number;
  criticalRate: number;
  expBonus: number;
  goldBonus: number;
  autoAttackSpeed: number;
  upgradeCount: {
    attack: number;
    hp: number;
    defense: number;
    critical: number;
    expBonus: number;
    goldBonus: number;
    autoSpeed: number;
  };
}

export interface Monster {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  name: string;
  color: string;
  animFrame: number;
  animSpeed: number;
  level: number;
  attack: number;
  attackCooldown: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface DamageText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

export interface GameState {
  player: Player;
  monsters: Monster[];
  currentFloor: number;
  currentDungeonId: string;
  autoAttack: boolean;
  particles: Particle[];
  damageTexts: DamageText[];
  unlockedTitles: string[];
  titleNotifications: string[];
  battleLog: BattleLog[];
  collection: CollectedItem[];
  magicSpells: Record<string, number>; // spellId -> level
  currentSpell: string;
  equipment: {
    head: Item | null;
    body: Item | null;
    hands: Item | null;
    feet: Item | null;
    weapon: Item | null;
  };
}

export interface CollectedItem {
  item: Item;
  quantity: number;
  firstObtained: Date;
}

export interface BattleLog {
  id: number;
  timestamp: Date;
  type: 'attack' | 'levelup' | 'item_drop' | 'monster_defeat';
  message: string;
  attackPhrase?: string;
  item?: Item;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  dropRate: number;
  effect?: {
    type: 'attack' | 'hp' | 'exp' | 'gold';
    value: number;
  };
  icon: string;
  sellPrice?: number;
  equipmentSlot?: 'head' | 'body' | 'hands' | 'feet' | 'weapon';
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    criticalRate?: number;
  };
  upgradeLevel?: number;
  maxUpgradeLevel?: number;
  upgradedName?: string;
}

export interface MonsterType {
  name: string;
  color: string;
  hp: number;
}

export type UpgradeType = 'attack' | 'autoAttack' | 'hp' | 'defense' | 'critical' | 'expBonus' | 'goldBonus' | 'autoSpeed';

export interface GameCanvasProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onCanvasClick: () => void;
}

export interface StatsPanelProps {
  player: Player;
  floor: number;
}

export interface UpgradePanelProps {
  player: Player;
  autoAttack: boolean;
  onUpgrade: (type: UpgradeType) => void;
  onNextFloor: () => void;
}