import { useState, useCallback } from 'react';
import type { CoCEdition, Attributes, BasicInfo as BasicInfoType, SkillPoints } from './types/character';
import { VersionSelector } from './components/VersionSelector';
import { BasicInfo } from './components/BasicInfo';
import { Attributes as AttributesPanel } from './components/Attributes';
import { DerivedStats } from './components/DerivedStats';
import { Skills } from './components/Skills';
import './App.css';

/** 空属性初始值 */
const EMPTY_ATTRIBUTES: Attributes = {
  STR: 0, CON: 0, SIZ: 0, INT: 0,
  POW: 0, DEX: 0, APP: 0, EDU: 0,
};

/** 空基本信息初始值 */
const EMPTY_BASIC_INFO: BasicInfoType = {
  name: '',
  player: '',
  occupationId: '',
  age: 0,
  gender: '',
  birthplace: '',
  residence: '',
};

function App() {
  const [edition, setEdition] = useState<CoCEdition>('6e');
  const [attributes, setAttributes] = useState<Attributes>(EMPTY_ATTRIBUTES);
  const [basicInfo, setBasicInfo] = useState<BasicInfoType>(EMPTY_BASIC_INFO);
  const [occupationSkillPoints, setOccupationSkillPoints] = useState<SkillPoints>({});
  const [interestSkillPoints, setInterestSkillPoints] = useState<SkillPoints>({});

  /** 切换版本时重置技能点（属性和基本信息保留） */
  const handleEditionChange = useCallback((newEdition: CoCEdition) => {
    setEdition(newEdition);
    setOccupationSkillPoints({});
    setInterestSkillPoints({});
    setBasicInfo(prev => ({ ...prev, occupationId: '' }));
  }, []);

  /** 重置所有数据 */
  const handleReset = useCallback(() => {
    setAttributes(EMPTY_ATTRIBUTES);
    setBasicInfo(EMPTY_BASIC_INFO);
    setOccupationSkillPoints({});
    setInterestSkillPoints({});
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">克苏鲁的呼唤</h1>
        <p className="app-subtitle">Call of Cthulhu - 调查员角色创建工具</p>
        <VersionSelector edition={edition} onChange={handleEditionChange} />
      </header>

      <BasicInfo
        info={basicInfo}
        edition={edition}
        edu={attributes.EDU}
        onChange={setBasicInfo}
      />

      <AttributesPanel
        attributes={attributes}
        edition={edition}
        onChange={setAttributes}
      />

      <DerivedStats
        attributes={attributes}
      />

      <Skills
        edition={edition}
        attributes={attributes}
        occupationId={basicInfo.occupationId}
        occupationSkillPoints={occupationSkillPoints}
        interestSkillPoints={interestSkillPoints}
        onOccupationPointsChange={setOccupationSkillPoints}
        onInterestPointsChange={setInterestSkillPoints}
      />

      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 30px',
            fontSize: '15px',
            background: 'var(--accent-red)',
            borderColor: '#c04040',
            color: '#fff',
          }}
        >
          重置角色
        </button>
      </div>

      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: 'var(--text-muted)',
        fontSize: '12px',
        borderTop: '1px solid var(--border-color)',
        marginTop: '20px',
      }}>
        COC-CC 人物制作工具 | 支持 COC 第5版 & 第6版规则
      </footer>
    </div>
  );
}

export default App;
