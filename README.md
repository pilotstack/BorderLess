# BorderLess 🌍

> 探索全球护照 · 打破边界 · 自由移动

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=Vite)](https://vitejs.dev)
[![Tailwindcss](https://img.shields.io/badge/Tailwindcss-4+-00bcff?logo=tailwindcss)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0a0a0a?logo=shadcnui)](https://ui.shadcn.com)

一个全面展示全球护照免签、落地签、电子签等出入境信息的交互式应用。通过实时数据展示、国家对比和排名系统，帮助用户了解护照的全球价值和出行便利性。

![BorderLess Demo](./public/example.png)

<div align="center">
图中数据为生成的随机数据展示，实际信息以官方为准
</div>

## ✨ 主要特性

- 🗺️ **全球护照覆盖** - 199 个国家/地区的护照信息
- 🔍 **快速搜索** - 支持按国家/地区名称、代码快速查找
- 📊 **数据统计** - 显示免签、落地签、电子签等统计数据
- 📈 **排名系统** - 全球护照实力排名展示
- 🏙️ **国家详情** - 详细的国家出入境政策信息
- 🌓 **深色模式** - 支持浅色/深色主题切换
- ⚡ **高性能** - 使用 Vite 构建，快速加载和交互

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+ (或 npm/yarn)
- python 环境（若无数据源,可产生随机的**fake**数据）

### 配置 Supabase

- 克隆项目

```bash
# 克隆项目
git clone https://github.com/pilotstack/BorderLess.git
cd BorderLess
```

- 打开 [Supabase](https://supabase.com/)，注册账号并创建一个项目
- 在 Supabase 侧栏使用 SQL Editor 运行[init.sql](src/data/init.sql)初始化表格
- 运行[passport.py](src/data/passport.py)生成数据库表格 CSV 文件([data](src/data/)文件夹内)
- 在 Supabase 侧栏 Table Editor 导入两个表格的 CSV 文件
- 在 Supabase 侧栏的 Settings 的 Data API 和 API Keys 找到 SUPABASE_URL 和 SUPABASE_PUBLISHABLE_KEY 并将其填入到[.env.example](.env.example)

### 安装

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

打开 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建

```bash
# 生产构建
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint
```

## 📁 项目结构

```
BorderLess/
├── src/
│   ├── components/      # 可复用的 UI 组件库
│   │   └── ui/          # shadcn/ui 组件
│   ├── ui/              # 页面级组件
│   ├── home/            # 首页组件
│   ├── layout/          # 布局组件
│   ├── hooks/           # 自定义 React Hooks
│   ├── lib/             # 工具函数和库
│   ├── data/            # 国家/地区数据和配置
│   ├── assets/          # 静态资源
│   ├── App.tsx          # 根组件
│   ├── main.tsx         # 入口文件
│   └── routes.ts        # 路由配置
├── public/              # 公共资源
├── package.json         # 项目依赖配置
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── README.md            # 本文件
```

## 🛠️ 技术栈

### 核心框架

- **React 18+** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 下一代前端构建工具
- **React Router v7** - 路由管理

### UI 组件库

- **shadcn/ui** - 高质量的 React 组件库
- **Radix UI** - 无头 UI 组件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 图标库

### 数据和状态

- **TanStack Table** - 强大的表格组件
- **React Hook Form** - 表单管理

### 其他工具

- **Supabase** - 后端服务
- **country-flag-icons** - 国家/地区旗帜图标

## 📖 使用指南

### 首页查询

主页提供快速搜索功能，支持：

- 搜索国家/地区名称
- 搜索国家/地区代码 (ISO 3166-1 alpha-2)
- 实时显示搜索结果

### 全球护照浏览

访问"全球"页面查看：

- 按大陆分类的国家列表
- 点击国家/地区查看详细信息

### 排名系统

"排名"页面展示：

- 护照免签排名
- 护照所在国家/地区 GDP 排名
- 出行自由度指数

### 国家详情

点击任意国家查看：

- 详细的签证政策
- 免签国家列表
- 落地签国家列表
- 电子签国家列表
- 拒签国家列表

## 🤝 贡献指南

欢迎贡献代码、反馈问题或提出改进建议！

### 开发流程

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循项目的 ESLint 配置
- 为新功能添加相应的测试
- 更新文档以反映任何新功能

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📧 联系方式

- 提交问题: [GitHub Issues](https://github.com/pilotstack/borderless/issues)
- 讨论功能: [GitHub Discussions](https://github.com/pilotstack/borderless/discussions)

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

<div align="center">

**Made with ❤️ to explore global mobility**

[回到顶部 ⬆️](#borderless-)

</div>
