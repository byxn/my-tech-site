# 知行笔记：个人技术博客与知识库

基于 VitePress 1.x、Vue 3 和 Markdown 的静态网站。无需后端或数据库；本地用 VS Code 编辑 Markdown，通过 Git 管理版本，并由 GitHub Actions 发布到 GitHub Pages。

## 环境要求

- Node.js 20 或更新版本（推荐当前 LTS）
- npm 10 或更新版本
- Git

## 本地启动

```bash
npm ci
npm run docs:dev
```

终端会显示本地地址，通常是 `http://localhost:5173`。生产构建和本地预览：

```bash
npm run docs:build
npm run docs:preview
```

构建产物位于 `docs/.vitepress/dist`。

## 页面结构

- `/`：首页、最近更新和专题入口
- `/blog/`：博客索引及独立文章
- `/knowledge/`：知识库总览
- `/knowledge/rust/`、`frontend/`、`computer-science/`、`ai/`、`open-source/`：分类索引和笔记
- `/projects/`：开源项目分析索引
- `/about/`：关于与写作原则

导航、分类侧边栏、本地全文搜索、代码高亮、文章目录、深色模式及上一篇/下一篇由 VitePress 默认主题提供。

## 新增博客文章

1. 在 `docs/blog/` 新建英文文件名，例如 `rust-error-handling.md`。
2. 复制 `docs/templates/blog.md` 的 frontmatter 和章节结构，填写标题、摘要、日期、标签与分类。
3. 在 `docs/blog/index.md` 的文章表格和 `docs/.vitepress/config.mts` 的博客侧边栏增加链接。
4. 如需显示在首页最近更新区域，在 `docs/index.md` 添加链接。

## 新增知识笔记

1. 在相应 `docs/knowledge/<category>/` 目录新建英文文件名 Markdown。
2. 参考 `docs/templates/note.md`，按主题保留适用章节，不必强行填写每一项。
3. 在分类 `index.md`、知识库侧边栏（`docs/.vitepress/config.mts`）添加入口。
4. 用 `npm run docs:build` 检查页面和内部链接。

## GitHub Pages 部署

### 创建仓库并推送

在 GitHub 新建空仓库，然后在项目目录执行（将地址换成自己的仓库）：

```bash
git init
git add .
git commit -m "Build personal tech blog and knowledge base"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

工作流 `.github/workflows/deploy.yml` 在每次推送到 `main` 后运行 `npm ci`、`npm run docs:build`，再上传 Pages artifact 并部署。构建失败时 `Build site` 步骤会显示命令错误，部署 job 不会运行。

### 开启 Pages

首次部署前，先在 GitHub 仓库打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions** 并保存。`configure-pages` 会检查 Pages 配置，但默认 `GITHUB_TOKEN` 不会替仓库开启 Pages；若未启用，工作流会在该步骤报 `Get Pages site failed: Not Found`。随后推送到 `main` 或 `master`，并在 **Actions** 页查看部署状态；成功后从 `github-pages` environment 或 Pages 设置页打开网站。

### base 路径

配置读取 Actions 自动提供的 `GITHUB_REPOSITORY`：普通项目仓库自动使用 `/<repository>/`；命名为 `<username>.github.io` 的用户站点使用 `/`。其他部署位置可通过 `VITEPRESS_BASE` 环境变量覆盖，值需以 `/` 开头和结尾。本地未设置时默认 `/`。

### 故障排查

- **Actions 没有触发：** 确认推送分支为 `main`，并检查 Actions 是否启用。
- **`npm ci` 失败：** 检查 `package-lock.json` 是否与 `package.json` 一起提交。
- **构建失败：** 展开 `Build site` 日志，按首个 Markdown、配置或 TypeScript 错误修复，再本地运行构建。
- **页面空白或资源 404：** 检查仓库名、Pages Source 和 `base`；项目站点需要 `/<repository>/` 前缀。
- **部署失败：** 检查 Pages 设置是否选择 GitHub Actions，并确认 `pages: write` 与 `id-token: write` 权限未被组织策略禁止。
- **链接失效：** 确认目标文件存在；新增页面也要同步索引和侧边栏。

部署使用 GitHub Actions 自动提供的 `GITHUB_TOKEN`，不需要将个人 Token 或密钥写入仓库。

## 内容维护建议

文章与笔记独立存为 Markdown。源码分析应写明版本或 commit；实践结论尽量包含可复现步骤和官方参考资料。首页和关于页中的 GitHub 地址可在仓库确定后替换为实际地址。
