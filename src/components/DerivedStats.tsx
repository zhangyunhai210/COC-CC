import type { DerivedAttributes, Attributes } from '../types/character';
import { calculateDerived } from '../rules/derived';

interface Props {
  attributes: Attributes;
}

/** 派生属性展示组件 */
export function DerivedStats({ attributes }: Props) {
  const hasAttributes = Object.values(attributes).some(v => v > 0);

  if (!hasAttributes) {
    return (
      <div className="card">
        <h2 className="card-title">
          <span className="icon">📊</span>
          派生属性
        </h2>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
          请先掷基础属性以计算派生属性
        </p>
      </div>
    );
  }

  const derived: DerivedAttributes = calculateDerived(attributes);

  const stats = [
    { label: '生命值', labelEn: 'HP', value: derived.hp, className: 'hp', formula: '(CON+SIZ)/2' },
    { label: '魔法值', labelEn: 'MP', value: derived.mp, className: 'mp', formula: 'POW' },
    { label: '理智值', labelEn: 'SAN', value: derived.san, className: 'san', formula: 'POW×5' },
    { label: '灵感', labelEn: 'Idea', value: derived.idea, className: '', formula: 'INT×5' },
    { label: '幸运', labelEn: 'Luck', value: derived.luck, className: '', formula: 'POW×5' },
    { label: '知识', labelEn: 'Know', value: derived.know, className: '', formula: 'EDU×5' },
    { label: '伤害加值', labelEn: 'DB', value: derived.db, className: '', formula: 'STR+SIZ查表' },
    { label: '移动速度', labelEn: 'MOV', value: derived.mov, className: '', formula: 'DEX/STR/SIZ' },
  ];

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📊</span>
        派生属性
      </h2>
      <div className="derived-grid">
        {stats.map(stat => (
          <div key={stat.labelEn} className="derived-item">
            <div className="derived-label">
              {stat.label} ({stat.labelEn})
            </div>
            <div className={`derived-value ${stat.className}`}>
              {stat.value}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {stat.formula}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
