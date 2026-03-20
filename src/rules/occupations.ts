import type { OccupationDef, CoCEdition } from '../types/character';

/**
 * COC 5e/6e 职业定义
 * 每个职业包含职业技能列表和信用评级范围
 */
export const ALL_OCCUPATIONS: OccupationDef[] = [
  {
    id: 'antiquarian',
    name: '古物研究者',
    nameEn: 'Antiquarian',
    skills: ['art', 'bargain', 'history', 'library_use', 'other_language', 'spot_hidden', 'own_language'],
    creditRating: [30, 70],
    editions: ['5e', '6e'],
    description: '收藏和研究古物的专家',
  },
  {
    id: 'author',
    name: '作家',
    nameEn: 'Author',
    skills: ['history', 'library_use', 'other_language', 'own_language', 'persuade', 'psychology'],
    creditRating: [10, 50],
    editions: ['5e', '6e'],
    description: '以写作为生的文字工作者',
  },
  {
    id: 'dilettante',
    name: '纨绔子弟',
    nameEn: 'Dilettante',
    skills: ['credit_rating', 'art', 'ride', 'persuade', 'other_language', 'shotgun', 'navigate'],
    creditRating: [50, 90],
    editions: ['5e', '6e'],
    description: '出身富裕的业余爱好者',
  },
  {
    id: 'doctor',
    name: '医生',
    nameEn: 'Doctor of Medicine',
    skills: ['biology', 'credit_rating', 'first_aid', 'medicine', 'pharmacy', 'psychology', 'other_language'],
    creditRating: [30, 80],
    editions: ['5e', '6e'],
    description: '受过专业医学训练的医疗人员',
  },
  {
    id: 'drifter',
    name: '流浪者',
    nameEn: 'Drifter',
    skills: ['bargain', 'conceal', 'fast_talk', 'hide', 'listen', 'natural_history', 'sneak'],
    creditRating: [0, 15],
    editions: ['5e', '6e'],
    description: '居无定所的漂泊者',
  },
  {
    id: 'engineer',
    name: '工程师',
    nameEn: 'Engineer',
    skills: ['chemistry', 'electrical_repair', 'geology', 'library_use', 'mechanical_repair', 'operate_heavy', 'physics'],
    creditRating: [30, 70],
    editions: ['5e', '6e'],
    description: '精通工程技术的专业人员',
  },
  {
    id: 'journalist',
    name: '记者',
    nameEn: 'Journalist',
    skills: ['fast_talk', 'history', 'library_use', 'own_language', 'persuade', 'photography', 'psychology'],
    creditRating: [10, 40],
    editions: ['5e', '6e'],
    description: '新闻媒体工作者',
  },
  {
    id: 'lawyer',
    name: '律师',
    nameEn: 'Lawyer',
    skills: ['bargain', 'credit_rating', 'fast_talk', 'law', 'library_use', 'persuade', 'psychology'],
    creditRating: [30, 80],
    editions: ['5e', '6e'],
    description: '精通法律的专业人士',
  },
  {
    id: 'military_officer',
    name: '军官',
    nameEn: 'Military Officer',
    skills: ['accounting', 'bargain', 'credit_rating', 'first_aid', 'navigate', 'psychology', 'handgun'],
    creditRating: [20, 50],
    editions: ['5e', '6e'],
    description: '受过军事训练的指挥官',
  },
  {
    id: 'missionary',
    name: '传教士',
    nameEn: 'Missionary',
    skills: ['art', 'first_aid', 'mechanical_repair', 'medicine', 'natural_history', 'persuade', 'other_language'],
    creditRating: [10, 30],
    editions: ['5e', '6e'],
    description: '传播信仰的宗教人士',
  },
  {
    id: 'professor',
    name: '教授',
    nameEn: 'Professor',
    skills: ['bargain', 'credit_rating', 'library_use', 'other_language', 'persuade', 'psychology', 'own_language'],
    creditRating: [20, 60],
    editions: ['5e', '6e'],
    description: '高等院校的学术研究者',
  },
  {
    id: 'police_detective',
    name: '警探',
    nameEn: 'Police Detective',
    skills: ['bargain', 'disguise', 'fast_talk', 'law', 'listen', 'persuade', 'psychology', 'spot_hidden'],
    creditRating: [20, 50],
    editions: ['5e', '6e'],
    description: '刑事案件调查员',
  },
  {
    id: 'private_eye',
    name: '私家侦探',
    nameEn: 'Private Eye',
    skills: ['bargain', 'disguise', 'fast_talk', 'handgun', 'hide', 'law', 'library_use', 'locksmith', 'photography', 'psychology', 'sneak', 'spot_hidden'],
    creditRating: [10, 40],
    editions: ['5e', '6e'],
    description: '受雇进行调查的私人侦探',
  },
  {
    id: 'parapsychologist',
    name: '超心理学家',
    nameEn: 'Parapsychologist',
    skills: ['anthropology', 'history', 'library_use', 'occult', 'photography', 'psychology', 'other_language'],
    creditRating: [10, 40],
    editions: ['5e', '6e'],
    description: '研究超自然现象的学者',
  },
  // 6e 新增职业
  {
    id: 'archaeologist',
    name: '考古学家',
    nameEn: 'Archaeologist',
    skills: ['archaeology', 'history', 'library_use', 'other_language', 'navigate', 'photography', 'spot_hidden'],
    creditRating: [20, 50],
    editions: ['6e'],
    description: '研究古代文明遗迹的学者',
  },
  {
    id: 'athlete',
    name: '运动员',
    nameEn: 'Athlete',
    skills: ['climb', 'dodge', 'jump', 'ride', 'swim', 'throw', 'first_aid'],
    creditRating: [10, 60],
    editions: ['6e'],
    description: '职业体育运动者',
  },
  {
    id: 'criminal',
    name: '罪犯',
    nameEn: 'Criminal',
    skills: ['bargain', 'conceal', 'disguise', 'fast_talk', 'handgun', 'locksmith', 'sneak', 'spot_hidden'],
    creditRating: [5, 40],
    editions: ['6e'],
    description: '游走在法律边缘的人物',
  },
  {
    id: 'clergy',
    name: '牧师',
    nameEn: 'Clergy',
    skills: ['accounting', 'history', 'library_use', 'listen', 'other_language', 'persuade', 'psychology'],
    creditRating: [10, 50],
    editions: ['6e'],
    description: '教会中的神职人员',
  },
  {
    id: 'farmer',
    name: '农民',
    nameEn: 'Farmer',
    skills: ['bargain', 'craft', 'first_aid', 'mechanical_repair', 'natural_history', 'navigate', 'operate_heavy'],
    creditRating: [5, 30],
    editions: ['6e'],
    description: '以农业为生的劳动者',
  },
  {
    id: 'nurse',
    name: '护士',
    nameEn: 'Nurse',
    skills: ['biology', 'first_aid', 'listen', 'medicine', 'persuade', 'pharmacy', 'psychology'],
    creditRating: [10, 40],
    editions: ['6e'],
    description: '专业的医疗护理人员',
  },
];

/** 获取指定版本的职业列表 */
export function getOccupationsForEdition(edition: CoCEdition): OccupationDef[] {
  return ALL_OCCUPATIONS.filter(occ => occ.editions.includes(edition));
}

/** 根据ID获取职业 */
export function getOccupationById(id: string): OccupationDef | undefined {
  return ALL_OCCUPATIONS.find(occ => occ.id === id);
}
