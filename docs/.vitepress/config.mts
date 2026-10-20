import { defineConfig } from 'vitepress'

const repository = process.env.GITHUB_REPOSITORY
const repositoryName = repository?.split('/')[1]
const isUserSite = repositoryName?.endsWith('.github.io') ?? false
const base = process.env.VITEPRESS_BASE ?? (repositoryName && !isUserSite ? `/${repositoryName}/` : '/')

export default defineConfig({
  lang: 'zh-CN', title: '知行笔记', description: '记录 Rust、前端、AI 工程与开源项目实践。', base, cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' }, { text: '技术博客', link: '/blog/' },
      { text: '知识库', link: '/knowledge/' }, { text: '开源项目', link: '/projects/' }, { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/blog/': [{ text: '技术博客', items: [
        { text: '文章索引', link: '/blog/' }, { text: 'React Hooks 依赖数组', link: '/blog/react-hooks-dependency-array' }
      ] }],
      '/knowledge/': [
        { text: '知识库', items: [{ text: '知识库总览', link: '/knowledge/' }] },
        { text: 'Rust', collapsed: false, items: [
          { text: '基础语法与类型系统', link: '/knowledge/rust/' }, { text: '所有权与生命周期', link: '/knowledge/rust/ownership' },
          { text: 'Trait 与泛型', link: '/knowledge/rust/traits-generics' }, { text: '异步编程', link: '/knowledge/rust/async' }, { text: 'Axum', link: '/knowledge/rust/axum' }
        ] },
        { text: '前端', collapsed: false, items: [
          { text: 'JavaScript 与 TypeScript', link: '/knowledge/frontend/' }, { text: 'Vue', link: '/knowledge/frontend/vue' },
          { text: 'React', link: '/knowledge/frontend/react' }, { text: 'React Hooks 与源码分析', link: '/knowledge/frontend/react-hooks' }
        ] },
        { text: '计算机基础', collapsed: true, items: [
          { text: '计算机组成原理', link: '/knowledge/computer-science/' }, { text: '操作系统', link: '/knowledge/computer-science/os' },
          { text: '计算机网络', link: '/knowledge/computer-science/network' }, { text: '数据库', link: '/knowledge/computer-science/database' }
        ] },
        { text: 'AI 工程', collapsed: true, items: [
          { text: 'AI Agent', link: '/knowledge/ai/' }, { text: 'Coding Agent', link: '/knowledge/ai/coding-agent' },
          { text: '多 Agent 协作', link: '/knowledge/ai/multi-agent' }, { text: '工程实践', link: '/knowledge/ai/engineering' }
        ] },
        { text: '开源项目分析', collapsed: true, items: [
          { text: '项目架构与源码分析', link: '/knowledge/open-source/' }, { text: 'VitePress 源码分析', link: '/knowledge/open-source/vitepress-architecture' }
        ] }
      ],
      '/projects/': [{ text: '开源项目', items: [
        { text: '项目索引', link: '/projects/' }, { text: 'VitePress 架构分析', link: '/knowledge/open-source/vitepress-architecture' }
      ] }]
    },
    search: { provider: 'local' }, outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    socialLinks: repository
      ? [{ icon: 'github', link: `https://github.com/${repository}`, ariaLabel: 'GitHub 仓库' }]
      : [],
    footer: { message: '用文字记录实践，用实践检验理解。', copyright: 'Copyright © 2026 知行笔记' },
    lastUpdated: { text: '最后更新于' }
  }
})
