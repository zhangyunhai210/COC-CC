import type { SkillDef, CoCEdition } from '../types/character';

/**
 * COC 5e/6e 技能定义
 * 两个版本的技能列表基本相同，6e增加了少量技能
 */
export const ALL_SKILLS: SkillDef[] = [
  // 战斗技能
  { id: 'fist', name: '拳击', nameEn: 'Fist/Punch', baseValue: 50, category: 'combat', isCombat: true },
  { id: 'kick', name: '踢击', nameEn: 'Kick', baseValue: 25, category: 'combat', isCombat: true },
  { id: 'headbutt', name: '头槌', nameEn: 'Head Butt', baseValue: 10, category: 'combat', isCombat: true },
  { id: 'grapple', name: '擒拿', nameEn: 'Grapple', baseValue: 25, category: 'combat', isCombat: true },
  { id: 'dodge', name: '闪避', nameEn: 'Dodge', baseValue: 0, basedOn: 'DEX2', category: 'combat' },

  // 射击技能
  { id: 'handgun', name: '手枪', nameEn: 'Handgun', baseValue: 20, category: 'firearms', isCombat: true },
  { id: 'rifle', name: '步枪/霰弹枪', nameEn: 'Rifle/Shotgun', baseValue: 25, category: 'firearms', isCombat: true },
  { id: 'shotgun', name: '霰弹枪', nameEn: 'Shotgun', baseValue: 30, category: 'firearms', isCombat: true, editions: ['6e'] },
  { id: 'smg', name: '冲锋枪', nameEn: 'SMG', baseValue: 15, category: 'firearms', isCombat: true },
  { id: 'machinegun', name: '机枪', nameEn: 'Machine Gun', baseValue: 15, category: 'firearms', isCombat: true },
  { id: 'throw', name: '投掷', nameEn: 'Throw', baseValue: 25, category: 'firearms' },

  // 社交技能
  { id: 'bargain', name: '议价', nameEn: 'Bargain', baseValue: 5, category: 'social' },
  { id: 'credit_rating', name: '信用评级', nameEn: 'Credit Rating', baseValue: 15, category: 'social' },
  { id: 'fast_talk', name: '话术', nameEn: 'Fast Talk', baseValue: 5, category: 'social' },
  { id: 'persuade', name: '说服', nameEn: 'Persuade', baseValue: 15, category: 'social' },
  { id: 'own_language', name: '母语', nameEn: 'Own Language', baseValue: 0, basedOn: 'EDU5', category: 'social' },
  { id: 'other_language', name: '外语', nameEn: 'Other Language', baseValue: 1, category: 'social' },

  // 调查技能
  { id: 'spot_hidden', name: '侦查', nameEn: 'Spot Hidden', baseValue: 25, category: 'investigation' },
  { id: 'listen', name: '聆听', nameEn: 'Listen', baseValue: 25, category: 'investigation' },
  { id: 'library_use', name: '图书馆使用', nameEn: 'Library Use', baseValue: 25, category: 'investigation' },
  { id: 'track', name: '追踪', nameEn: 'Track', baseValue: 10, category: 'investigation' },
  { id: 'photography', name: '摄影', nameEn: 'Photography', baseValue: 10, category: 'investigation' },

  // 知识技能
  { id: 'accounting', name: '会计', nameEn: 'Accounting', baseValue: 10, category: 'knowledge' },
  { id: 'anthropology', name: '人类学', nameEn: 'Anthropology', baseValue: 1, category: 'knowledge' },
  { id: 'archaeology', name: '考古学', nameEn: 'Archaeology', baseValue: 1, category: 'knowledge' },
  { id: 'astronomy', name: '天文学', nameEn: 'Astronomy', baseValue: 1, category: 'knowledge' },
  { id: 'biology', name: '生物学', nameEn: 'Biology', baseValue: 1, category: 'knowledge' },
  { id: 'chemistry', name: '化学', nameEn: 'Chemistry', baseValue: 1, category: 'knowledge' },
  { id: 'geology', name: '地质学', nameEn: 'Geology', baseValue: 1, category: 'knowledge' },
  { id: 'history', name: '历史', nameEn: 'History', baseValue: 20, category: 'knowledge' },
  { id: 'law', name: '法律', nameEn: 'Law', baseValue: 5, category: 'knowledge' },
  { id: 'medicine', name: '医学', nameEn: 'Medicine', baseValue: 5, category: 'knowledge' },
  { id: 'natural_history', name: '博物学', nameEn: 'Natural History', baseValue: 10, category: 'knowledge' },
  { id: 'occult', name: '神秘学', nameEn: 'Occult', baseValue: 5, category: 'knowledge' },
  { id: 'pharmacy', name: '药学', nameEn: 'Pharmacy', baseValue: 1, category: 'knowledge' },
  { id: 'physics', name: '物理学', nameEn: 'Physics', baseValue: 1, category: 'knowledge' },
  { id: 'psychoanalysis', name: '精神分析', nameEn: 'Psychoanalysis', baseValue: 1, category: 'knowledge' },
  { id: 'psychology', name: '心理学', nameEn: 'Psychology', baseValue: 5, category: 'knowledge' },
  { id: 'cthulhu_mythos', name: '克苏鲁神话', nameEn: 'Cthulhu Mythos', baseValue: 0, category: 'knowledge' },

  // 体能技能
  { id: 'climb', name: '攀爬', nameEn: 'Climb', baseValue: 40, category: 'physical' },
  { id: 'jump', name: '跳跃', nameEn: 'Jump', baseValue: 25, category: 'physical' },
  { id: 'swim', name: '游泳', nameEn: 'Swim', baseValue: 25, category: 'physical' },
  { id: 'ride', name: '骑术', nameEn: 'Ride', baseValue: 5, category: 'physical' },
  { id: 'sneak', name: '潜行', nameEn: 'Sneak', baseValue: 10, category: 'physical' },
  { id: 'hide', name: '躲藏', nameEn: 'Hide', baseValue: 10, category: 'physical' },

  // 技术技能
  { id: 'art', name: '艺术', nameEn: 'Art', baseValue: 5, category: 'technical' },
  { id: 'craft', name: '手艺', nameEn: 'Craft', baseValue: 5, category: 'technical' },
  { id: 'conceal', name: '隐藏', nameEn: 'Conceal', baseValue: 15, category: 'technical' },
  { id: 'disguise', name: '乔装', nameEn: 'Disguise', baseValue: 1, category: 'technical' },
  { id: 'drive_auto', name: '驾驶汽车', nameEn: 'Drive Auto', baseValue: 20, category: 'technical' },
  { id: 'electrical_repair', name: '电气维修', nameEn: 'Electrical Repair', baseValue: 10, category: 'technical' },
  { id: 'first_aid', name: '急救', nameEn: 'First Aid', baseValue: 30, category: 'technical' },
  { id: 'locksmith', name: '锁匠', nameEn: 'Locksmith', baseValue: 1, category: 'technical' },
  { id: 'mechanical_repair', name: '机械维修', nameEn: 'Mechanical Repair', baseValue: 20, category: 'technical' },
  { id: 'navigate', name: '导航', nameEn: 'Navigate', baseValue: 10, category: 'technical' },
  { id: 'operate_heavy', name: '操作重型机械', nameEn: 'Operate Heavy Machinery', baseValue: 1, category: 'technical' },
  { id: 'pilot', name: '驾驶飞行器', nameEn: 'Pilot', baseValue: 1, category: 'technical' },
  { id: 'martial_arts', name: '武术', nameEn: 'Martial Arts', baseValue: 1, category: 'technical', editions: ['6e'] },
  { id: 'computer_use', name: '电脑使用', nameEn: 'Computer Use', baseValue: 1, category: 'technical', editions: ['6e'] },
];

/** 获取指定版本的技能列表 */
export function getSkillsForEdition(edition: CoCEdition): SkillDef[] {
  return ALL_SKILLS.filter(
    skill => !skill.editions || skill.editions.includes(edition)
  );
}

/** 计算技能的实际基础值（考虑属性依赖） */
export function getSkillBaseValue(skill: SkillDef, dex: number, edu: number): number {
  if (skill.basedOn === 'DEX2') return dex * 2;
  if (skill.basedOn === 'EDU5') return edu * 5;
  return skill.baseValue;
}
