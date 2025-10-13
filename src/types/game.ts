export type GameState = 'title' | 'forest' | 'library' | 'battle' | 'credits';

export type SpellType = 'water' | 'fire' | 'thunder';

export interface Position {
  x: number;
  y: number;
}

export interface Character {
  position: Position;
  hp: number;
  maxHp: number;
  hasStaff: boolean;
}

export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  damage: number;
  sprite: string;
}

export interface Spell {
  type: SpellType;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  damage: { min: number; max: number };
  icon: string;
  color: string;
  description: string;
}

export interface Question {
  question: string;
  answer: number;
  type: string;
}

export interface DialogMessage {
  text: string;
  speaker: string;
}
