/** COC 版本类型 */
export type CoCEdition = '5e' | '6e';

/** 属性名称 */
export type AttributeName = 'STR' | 'CON' | 'SIZ' | 'INT' | 'POW' | 'DEX' | 'APP' | 'EDU';

/** 属性中文名映射 */
export const ATTRIBUTE_LABELS: Record<AttributeName, string> = {
  STR: '力量',
  CON: '体质',
  SIZ: '体型',
  INT: '智力',
  POW: '意志',
  DEX: '敏捷',
  APP: '外貌',
  EDU: '教育',
};

/** 角色属性值 */
export type Attributes = Record<AttributeName, number>;

/** 派生属性 */
export interface DerivedAttributes {
  /** 生命值 */
  hp: number;
  /** 魔法值 */
  mp: number;
  /** 理智值 */
  san: number;
  /** 灵感 */
  idea: number;
  /** 幸运 */
  luck: number;
  /** 知识 */
  know: number;
  /** 伤害加值 */
  db: string;
  /** 体格 */
  build: number;
  /** 移动速度 */
  mov: number;
}

/** 技能定义 */
export interface SkillDef {
  /** 技能ID */
  id: string;
  /** 中文名称 */
  name: string;
  /** 英文名称 */
  nameEn: string;
  /** 基础值（固定值或基于属性的计算函数标识） */
  baseValue: number;
  /** 是否基于属性动态计算基础值 */
  basedOn?: 'DEX2' | 'EDU5';
  /** 技能分类 */
  category: SkillCategory;
  /** 是否为战斗技能 */
  isCombat?: boolean;
  /** 适用版本，不指定则两个版本都有 */
  editions?: CoCEdition[];
}

/** 技能分类 */
export type SkillCategory =
  | 'combat'      // 战斗
  | 'firearms'    // 射击
  | 'social'      // 社交
  | 'investigation' // 调查
  | 'knowledge'   // 知识
  | 'physical'    // 体能
  | 'technical'   // 技术
  | 'other';      // 其他

/** 技能分类中文名 */
export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  combat: '战斗技能',
  firearms: '射击技能',
  social: '社交技能',
  investigation: '调查技能',
  knowledge: '知识技能',
  physical: '体能技能',
  technical: '技术技能',
  other: '其他技能',
};

/** 角色已分配的技能点 */
export type SkillPoints = Record<string, number>;

/** 职业定义 */
export interface OccupationDef {
  /** 职业ID */
  id: string;
  /** 中文名称 */
  name: string;
  /** 英文名称 */
  nameEn: string;
  /** 职业技能ID列表 */
  skills: string[];
  /** 信用评级范围 */
  creditRating: [number, number];
  /** 适用版本 */
  editions: CoCEdition[];
  /** 描述 */
  description?: string;
}

/** 角色基本信息 */
export interface BasicInfo {
  /** 角色姓名 */
  name: string;
  /** 玩家姓名 */
  player: string;
  /** 职业ID */
  occupationId: string;
  /** 年龄 */
  age: number;
  /** 性别 */
  gender: string;
  /** 出身地 */
  birthplace: string;
  /** 居住地 */
  residence: string;
}

/** 完整角色数据 */
export interface Character {
  /** 使用的COC版本 */
  edition: CoCEdition;
  /** 基本信息 */
  basicInfo: BasicInfo;
  /** 基础属性 */
  attributes: Attributes;
  /** 派生属性 */
  derived: DerivedAttributes;
  /** 职业技能点分配 */
  occupationSkillPoints: SkillPoints;
  /** 兴趣技能点分配 */
  interestSkillPoints: SkillPoints;
  /** 总职业技能点 */
  totalOccupationPoints: number;
  /** 总兴趣技能点 */
  totalInterestPoints: number;
}
