import type { CoCEdition } from '../types/character';

interface Props {
  edition: CoCEdition;
  onChange: (edition: CoCEdition) => void;
}

/** 版本选择组件 - 支持COC第5版和第6版切换 */
export function VersionSelector({ edition, onChange }: Props) {
  return (
    <div className="version-selector">
      <button
        className={`version-btn ${edition === '5e' ? 'active' : ''}`}
        onClick={() => onChange('5e')}
      >
        第5版 (1992)
      </button>
      <button
        className={`version-btn ${edition === '6e' ? 'active' : ''}`}
        onClick={() => onChange('6e')}
      >
        第6版 (2004)
      </button>
    </div>
  );
}
