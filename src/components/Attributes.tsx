import { useState, useCallback, useMemo } from 'react';
import type { Attributes as AttrsType, AttributeName, CoCEdition } from '../types/character';
import { ATTRIBUTE_LABELS } from '../types/character';
import { ATTRIBUTE_FORMULAS, rollAttributeDetailed } from '../rules/attributes';

interface Props {
  attributes: AttrsType;
  edition: CoCEdition;
  onChange: (attrs: AttrsType) => void;
}

/** 属性骰点与展示组件 */
export function Attributes({ attributes, edition, onChange }: Props) {
  const [rollingAttr, setRollingAttr] = useState<string | null>(null);
  const [lastRoll, setLastRoll] = useState<Record<string, number[]>>({});

  const attrNames: AttributeName[] = useMemo(
    () => ['STR', 'CON', 'SIZ', 'INT', 'POW', 'DEX', 'APP', 'EDU'],
    []
  );

  /** 掷单个属性 */
  const handleRollSingle = useCallback((attr: AttributeName) => {
    setRollingAttr(attr);
    const result = rollAttributeDetailed(attr);
    setLastRoll(prev => ({ ...prev, [attr]: result.dice }));
    onChange({ ...attributes, [attr]: result.total });
    setTimeout(() => setRollingAttr(null), 400);
  }, [attributes, onChange]);

  /** 一键掷所有属性 */
  const handleRollAll = useCallback(() => {
    setRollingAttr('ALL');
    const newAttrs: Partial<AttrsType> = {};
    const newRolls: Record<string, number[]> = {};
    for (const attr of attrNames) {
      const result = rollAttributeDetailed(attr);
      newAttrs[attr] = result.total;
      newRolls[attr] = result.dice;
    }
    setLastRoll(newRolls);
    onChange(newAttrs as AttrsType);
    setTimeout(() => setRollingAttr(null), 400);
  }, [onChange, attrNames]);

  /** 手动修改属性值 */
  const handleManualChange = useCallback((attr: AttributeName, value: number) => {
    onChange({ ...attributes, [attr]: value });
  }, [attributes, onChange]);

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">🎲</span>
        基础属性
      </h2>

      {edition === '6e' && (
        <div className="edition-note">
          第6版规则：40岁以上角色的属性将受到年龄影响（STR/CON/DEX-1，APP-1，EDU+1 每十年）
        </div>
      )}

      <div className="attributes-container">
        <div className="attributes-grid">
          {attrNames.map(attr => (
            <div key={attr} className="attribute-row">
              <div className="attr-name">
                {ATTRIBUTE_LABELS[attr]}
                <div className="attr-name-en">{attr}</div>
              </div>
              <div className="attr-formula">{ATTRIBUTE_FORMULAS[attr]}</div>
              <input
                type="number"
                className={`attr-value ${rollingAttr === attr || rollingAttr === 'ALL' ? 'rolling' : ''}`}
                value={attributes[attr] || ''}
                onChange={e => handleManualChange(attr, parseInt(e.target.value) || 0)}
                min={0}
                max={30}
              />
              {lastRoll[attr] && (
                <span className="attr-dice-detail">
                  [{lastRoll[attr].join('+')}
                  {ATTRIBUTE_FORMULAS[attr].includes('+') && `+${ATTRIBUTE_FORMULAS[attr].split('+')[1]}`}]
                </span>
              )}
              <button
                className="attr-roll-btn"
                onClick={() => handleRollSingle(attr)}
                title={`掷 ${ATTRIBUTE_FORMULAS[attr]}`}
              >
                掷骰
              </button>
            </div>
          ))}
        </div>

        <div className="action-buttons" style={{ justifyContent: 'center' }}>
          <button className="roll-all-btn" onClick={handleRollAll}>
            🎲 一键掷所有属性
          </button>
        </div>
      </div>
    </div>
  );
}
