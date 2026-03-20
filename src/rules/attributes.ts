import type { AttributeName, Attributes, CoCEdition } from '../types/character';
import { roll3D6, roll2D6Plus6, roll3D6Plus3, rollDetailed } from '../utils/dice';
import type { DiceResult } from '../utils/dice';

/**
 * 属性掷骰规则
 * COC 5e/6e 属性生成规则相同：
 * - STR, CON, POW, DEX, APP: 3D6 (范围 3-18)
 * - SIZ, INT: 2D6+6 (范围 8-18)
 * - EDU: 3D6+3 (范围 6-21)
 */

/** 属性掷骰公式描述 */
export const ATTRIBUTE_FORMULAS: Record<AttributeName, string> = {
  STR: '3D6',
  CON: '3D6',
  SIZ: '2D6+6',
  INT: '2D6+6',
  POW: '3D6',
  DEX: '3D6',
  APP: '3D6',
  EDU: '3D6+3',
};

/** 属性掷骰范围 */
export const ATTRIBUTE_RANGES: Record<AttributeName, [number, number]> = {
  STR: [3, 18],
  CON: [3, 18],
  SIZ: [8, 18],
  INT: [8, 18],
  POW: [3, 18],
  DEX: [3, 18],
  APP: [3, 18],
  EDU: [6, 21],
};

/** 掷单个属性 */
export function rollAttribute(attr: AttributeName): number {
  switch (attr) {
    case 'SIZ':
    case 'INT':
      return roll2D6Plus6();
    case 'EDU':
      return roll3D6Plus3();
    default:
      return roll3D6();
  }
}

/** 掷单个属性（详细结果） */
export function rollAttributeDetailed(attr: AttributeName): DiceResult {
  switch (attr) {
    case 'SIZ':
    case 'INT':
      return rollDetailed(2, 6, 6);
    case 'EDU':
      return rollDetailed(3, 6, 3);
    default:
      return rollDetailed(3, 6, 0);
  }
}

/** 一次性掷所有属性 */
export function rollAllAttributes(): Attributes {
  const attrs: Partial<Attributes> = {};
  const attrNames: AttributeName[] = ['STR', 'CON', 'SIZ', 'INT', 'POW', 'DEX', 'APP', 'EDU'];
  for (const name of attrNames) {
    attrs[name] = rollAttribute(name);
  }
  return attrs as Attributes;
}

/**
 * 6e年龄对属性的影响
 * 40岁以上每10年：-1 STR/CON/DEX（三选一），-1 APP，+1 EDU
 */
export function applyAgeModifiers(
  attrs: Attributes,
  age: number,
  edition: CoCEdition
): { attrs: Attributes; eduGain: number; physicalLoss: number; appLoss: number } {
  const result = { ...attrs };
  let eduGain = 0;
  let physicalLoss = 0;
  let appLoss = 0;

  if (edition === '6e' && age > 39) {
    const decades = Math.floor((age - 40) / 10) + 1;
    eduGain = decades;
    physicalLoss = decades;
    appLoss = decades;

    result.EDU = Math.min(result.EDU + eduGain, 21);
    result.APP = Math.max(result.APP - appLoss, 1);
  }

  return { attrs: result, eduGain, physicalLoss, appLoss };
}
