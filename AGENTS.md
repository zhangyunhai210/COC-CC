# AGENTS.md

## Cursor Cloud specific instructions

这是一个 COC（克苏鲁的呼唤）TRPG 人物制作网站，使用 React + TypeScript + Vite 技术栈。

### 服务启动

- **开发服务器**: `npm run dev` — 启动 Vite 开发服务器（端口 3000），支持 HMR 热更新
- **构建**: `npm run build` — TypeScript 编译 + Vite 生产构建
- **Lint**: `npm run lint` — ESLint 检查

### 项目结构

- `src/rules/` — COC 5e/6e 规则引擎（属性、派生属性、技能、职业）
- `src/components/` — React 组件（版本选择、基本信息、属性、派生属性、技能）
- `src/types/` — TypeScript 类型定义
- `src/utils/` — 工具函数（掷骰子）

### 注意事项

- 该项目是纯前端静态应用，无需后端服务或数据库
- 切换 COC 版本（5e/6e）时会重置职业选择和技能点分配，但保留属性和基本信息
- `old/` 目录保存了项目重构前的原始静态 HTML/CSS 文件
