import type { Attributes, DerivedAttributes } from '../types/character';

/**
 * 派生属性计算
 * COC 5e/6e 规则
 */

/** 计算伤害加值和体格 */
function calculateDamageBonus(str: number, siz: number): { db: string; build: number } {
  const total = str + siz;
  if (total <= 12) return { db: '-1D6', build: -2 };
  if (total <= 16) return { db: '-1D4', build: -1 };
  if (total <= 24) return { db: '0', build: 0 };
  if (total <= 32) return { db: '+1D4', build: 1 };
  if (total <= 40) return { db: '+1D6', build: 2 };
  if (total <= 56) return { db: '+2D6', build: 3 };
  if (total <= 72) return { db: '+3D6', build: 4 };
  if (total <= 88) return { db: '+4D6', build: 5 };
  return { db: '+5D6', build: 6 };
}

/** 计算移动速度（6e引入，5e中简化处理） */
function calculateMov(dex: number, str: number, siz: number): number {
  if (dex < siz && str < siz) return 7;
  if (dex > siz && str > siz) return 9;
  return 8;
}

/** 计算所有派生属性 */
export function calculateDerived(attrs: Attributes): DerivedAttributes {
  const { db, build } = calculateDamageBonus(attrs.STR, attrs.SIZ);

  return {
    hp: Math.ceil((attrs.CON + attrs.SIZ) / 2),
    mp: attrs.POW,
    san: attrs.POW * 5,
    idea: attrs.INT * 5,
    luck: attrs.POW * 5,
    know: attrs.EDU * 5,
    db,
    build,
    mov: calculateMov(attrs.DEX, attrs.STR, attrs.SIZ),
  };
}

/** 计算职业技能点 = EDU × 20 */
export function calculateOccupationPoints(edu: number): number {
  return edu * 20;
}

/** 计算兴趣技能点 = INT × 10 */
export function calculateInterestPoints(int: number): number {
  return int * 10;
}

/** 计算最低年龄 = EDU + 6 */
export function calculateMinAge(edu: number): number {
  return edu + 6;
}
