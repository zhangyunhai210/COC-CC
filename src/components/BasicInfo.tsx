import type { BasicInfo as BasicInfoType, CoCEdition } from '../types/character';
import type { OccupationDef } from '../types/character';
import { getOccupationsForEdition } from '../rules/occupations';
import { calculateMinAge } from '../rules/derived';

interface Props {
  info: BasicInfoType;
  edition: CoCEdition;
  edu: number;
  onChange: (info: BasicInfoType) => void;
}

/** 角色基本信息表单 */
export function BasicInfo({ info, edition, edu, onChange }: Props) {
  const occupations = getOccupationsForEdition(edition);
  const minAge = calculateMinAge(edu);

  const handleChange = (field: keyof BasicInfoType, value: string | number) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📋</span>
        基本信息
      </h2>
      <div className="basic-info-grid">
        <div className="form-field">
          <label>姓名</label>
          <input
            type="text"
            value={info.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="角色姓名"
          />
        </div>
        <div className="form-field">
          <label>玩家</label>
          <input
            type="text"
            value={info.player}
            onChange={e => handleChange('player', e.target.value)}
            placeholder="玩家姓名"
          />
        </div>
        <div className="form-field">
          <label>性别</label>
          <select
            value={info.gender}
            onChange={e => handleChange('gender', e.target.value)}
          >
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div className="form-field">
          <label>年龄</label>
          <div>
            <input
              type="number"
              value={info.age || ''}
              onChange={e => handleChange('age', parseInt(e.target.value) || 0)}
              min={minAge}
              max={90}
              placeholder={String(minAge)}
              style={{ width: '80px' }}
            />
            {edu > 0 && (
              <div className="age-hint">最低年龄: {minAge}</div>
            )}
            {edition === '6e' && info.age > 39 && (
              <div className="age-warning">
                40岁以上属性将受年龄影响
              </div>
            )}
          </div>
        </div>
        <div className="form-field">
          <label>职业</label>
          <select
            value={info.occupationId}
            onChange={e => handleChange('occupationId', e.target.value)}
          >
            <option value="">请选择职业</option>
            {occupations.map((occ: OccupationDef) => (
              <option key={occ.id} value={occ.id}>
                {occ.name} ({occ.nameEn})
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>出身地</label>
          <input
            type="text"
            value={info.birthplace}
            onChange={e => handleChange('birthplace', e.target.value)}
            placeholder="角色出身地"
          />
        </div>
        <div className="form-field">
          <label>居住地</label>
          <input
            type="text"
            value={info.residence}
            onChange={e => handleChange('residence', e.target.value)}
            placeholder="当前居住地"
          />
        </div>
      </div>
    </div>
  );
}
