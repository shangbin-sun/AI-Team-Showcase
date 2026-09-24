# AI Team 网站

Vite + React 网站，包含主页 `/` 和用户手册 `/docs`。开发服务固定使用 `http://127.0.0.1:5174/`，避免占用 AI Team 产品的 5173 端口。

## 启动与重启

在项目目录执行：

```powershell
npm install
npm run dev
```

首次启动需要安装依赖；以后直接运行 `npm run dev`。重新启动时，在运行网站的终端按 `Ctrl+C` 停止服务，再运行 `npm run dev`。替换图片或修改文案后，开发服务通常会自动更新；必要时刷新浏览器，无需重启。

生产构建使用 `npm run build`，输出在 `dist/`。可以运行 `npm run preview` 在本机预览构建结果；预览也使用 5174 端口，需先停止开发服务。

## 替换轮播图片

图片位于 [`public/product/`](public/product/)。用新的 PNG 覆盖同名文件即可，不需要修改代码。建议使用统一的截图尺寸与比例，避免轮播时画面跳动。

| 展示位置 | 图片文件 |
| --- | --- |
| 首屏 | `hero-1.png`、`hero-2.png`、`hero-3.png`、`hero-4.png`、`hero-5.png` |
| 对话成队 | `conversation-1.png`、`conversation-2.png` |
| 协作流程 | `workflow-1.png`、`workflow-2.png` |
| 员工工程 | `employee-1.png`、`employee-2.png` |
| 任务运行 | `tasks-1.png`、`tasks-2.png` |
| 团队看板 | `dashboard-1.png`、`dashboard-2.png` |

首屏图片与功能区独立。`hero-1.png` 到 `hero-5.png` 初始分别复制自 `conversation-1.png`、`workflow-1.png`、`employee-1.png`、`tasks-1.png` 和 `dashboard-1.png`；之后可以单独替换首屏图片而不影响功能区。若要增加图片、删除图片或更改文件名，需要修改 [`src/App.jsx`](src/App.jsx) 中对应功能的 `images` 和 `alts` 列表；首屏图片数量或文件名变化时，则修改该文件顶部的 `heroImages`。

## 调整轮播速度

在 [`src/App.jsx`](src/App.jsx) 中调整对应的毫秒数：

- `HomePage` 内的 `setInterval`：首屏每 **3 秒**切换一次，修改 `3000`。
- `Carousel` 内的 `setInterval`：五组功能轮播每 **5.2 秒**切换一次，修改 `5200`。

左右按钮、滑动与底部横杠分页仍可手动切换图片。

## 用户手册

文档页读取 [`public/docs/AI-Team-用户手册.md`](public/docs/AI-Team-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.md)，其配图位于 [`public/docs/screenshots/`](public/docs/screenshots/)。手册左侧导航由 Markdown 标题生成。修改手册正文或配图后刷新 `/docs` 即可查看。
