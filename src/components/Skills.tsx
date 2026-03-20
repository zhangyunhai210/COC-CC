import { useMemo } from 'react';
import type { CoCEdition, SkillPoints, Attributes, SkillCategory } from '../types/character';
import { SKILL_CATEGORY_LABELS } from '../types/character';
import { getSkillsForEdition, getSkillBaseValue } from '../rules/skills';
import { getOccupationById } from '../rules/occupations';
import { calculateOccupationPoints, calculateInterestPoints } from '../rules/derived';

interface Props {
  edition: CoCEdition;
  attributes: Attributes;
  occupationId: string;
  occupationSkillPoints: SkillPoints;
  interestSkillPoints: SkillPoints;
  onOccupationPointsChange: (points: SkillPoints) => void;
  onInterestPointsChange: (points: SkillPoints) => void;
}

/** 技能分配组件 */
export function Skills({
  edition,
  attributes,
  occupationId,
  occupationSkillPoints,
  interestSkillPoints,
  onOccupationPointsChange,
  onInterestPointsChange,
}: Props) {
  const skills = useMemo(() => getSkillsForEdition(edition), [edition]);
  const occupation = useMemo(() => getOccupationById(occupationId), [occupationId]);

  const totalOccPoints = calculateOccupationPoints(attributes.EDU);
  const totalIntPoints = calculateInterestPoints(attributes.INT);

  /** 已使用的职业技能点 */
  const usedOccPoints = useMemo(() =>
    Object.values(occupationSkillPoints).reduce((sum, v) => sum + v, 0),
    [occupationSkillPoints]
  );

  /** 已使用的兴趣技能点 */
  const usedIntPoints = useMemo(() =>
    Object.values(interestSkillPoints).reduce((sum, v) => sum + v, 0),
    [interestSkillPoints]
  );

  const remainingOccPoints = totalOccPoints - usedOccPoints;
  const remainingIntPoints = totalIntPoints - usedIntPoints;

  /** 职业技能ID集合 */
  const occupationSkillIds = useMemo(
    () => new Set(occupation?.skills ?? []),
    [occupation]
  );

  /** 按分类分组技能 */
  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skills> = {};
    const categoryOrder: SkillCategory[] = [
      'combat', 'firearms', 'social', 'investigation',
      'knowledge', 'physical', 'technical', 'other'
    ];

    for (const cat of categoryOrder) {
      const filtered = skills.filter(s => s.category === cat);
      if (filtered.length > 0) {
        groups[cat] = filtered;
      }
    }
    return groups;
  }, [skills]);

  const hasAttributes = Object.values(attributes).some(v => v > 0);

  if (!hasAttributes) {
    return (
      <div className="card">
        <h2 className="card-title">
          <span className="icon">📝</span>
          技能
        </h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          请先掷基础属性以分配技能点
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📝</span>
        技能
      </h2>

      {!occupation && (
        <div className="edition-note">
          请先选择职业以查看职业技能标记。职业技能可获得额外技能点分配。
        </div>
      )}

      <div className="skills-header">
        <div className="skill-points-info">
          <div>
            <span className="skill-points-label">职业技能点: </span>
            <span className={`skill-points-value ${remainingOccPoints < 0 ? 'over' : 'ok'}`}>
              {remainingOccPoints} / {totalOccPoints}
            </span>
            <span className="skill-points-label"> (EDU×20)</span>
          </div>
          <div>
            <span className="skill-points-label">兴趣技能点: </span>
            <span className={`skill-points-value ${remainingIntPoints < 0 ? 'over' : 'ok'}`}>
              {remainingIntPoints} / {totalIntPoints}
            </span>
            <span className="skill-points-label"> (INT×10)</span>
          </div>
        </div>
      </div>

      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skills-category">
          <div className="skills-category-title">
            {SKILL_CATEGORY_LABELS[category as SkillCategory]}
          </div>
          <div className="skills-list">
            {categorySkills.map(skill => {
              const baseVal = getSkillBaseValue(skill, attributes.DEX, attributes.EDU);
              const isOccSkill = occupationSkillIds.has(skill.id);
              const occPts = occupationSkillPoints[skill.id] || 0;
              const intPts = interestSkillPoints[skill.id] || 0;
              const total = baseVal + occPts + intPts;

              return (
                <div
                  key={skill.id}
                  className={`skill-row ${isOccSkill ? 'occupation-skill' : ''}`}
                >
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-name-en">{skill.nameEn}</span>
                  <span className="skill-base">{baseVal}%</span>

                  {/* 克苏鲁神话不可分配点数 */}
                  {skill.id === 'cthulhu_mythos' ? (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      (不可分配)
                    </span>
                  ) : (
                    <>
                      {isOccSkill && (
                        <>
                          <span className="skill-type-tag occ">职业</span>
                          <input
                            type="number"
                            className="skill-input"
                            value={occPts || ''}
                            onChange={e => {
                              const val = Math.max(0, parseInt(e.target.value) || 0);
                              onOccupationPointsChange({
                                ...occupationSkillPoints,
                                [skill.id]: val,
                              });
                            }}
                            min={0}
                            placeholder="0"
                          />
                        </>
                      )}
                      <span className="skill-type-tag int">兴趣</span>
                      <input
                        type="number"
                        className="skill-input"
                        value={intPts || ''}
                        onChange={e => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          onInterestPointsChange({
                            ...interestSkillPoints,
                            [skill.id]: val,
                          });
                        }}
                        min={0}
                        placeholder="0"
                      />
                    </>
                  )}

                  <span className="skill-total">{total}%</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
