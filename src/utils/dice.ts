/**
 * 掷骰子工具函数
 */

/** 掷一个n面骰子 */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/** 掷多个骰子并求和 */
export function rollDice(count: number, sides: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += rollDie(sides);
  }
  return total;
}

/** 掷 nD6 */
export function rollD6(count: number): number {
  return rollDice(count, 6);
}

/** 3D6 - 用于 STR, CON, POW, DEX, APP */
export function roll3D6(): number {
  return rollD6(3);
}

/** 2D6+6 - 用于 SIZ, INT */
export function roll2D6Plus6(): number {
  return rollD6(2) + 6;
}

/** 3D6+3 - 用于 EDU */
export function roll3D6Plus3(): number {
  return rollD6(3) + 3;
}

/** 掷骰子结果，包含每个骰子的值（用于展示动画） */
export interface DiceResult {
  dice: number[];
  modifier: number;
  total: number;
}

/** 详细掷骰 - 返回每个骰子的值 */
export function rollDetailed(count: number, sides: number, modifier: number = 0): DiceResult {
  const dice: number[] = [];
  for (let i = 0; i < count; i++) {
    dice.push(rollDie(sides));
  }
  const total = dice.reduce((sum, d) => sum + d, 0) + modifier;
  return { dice, modifier, total };
}
