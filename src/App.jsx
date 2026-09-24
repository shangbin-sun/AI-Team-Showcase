import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'

const productImage = (name) => `/product/${name}.png`
const heroImages = [1, 2, 3, 4, 5].map((index) => productImage(`hero-${index}`))

const features = [
  {
    id: 'conversation',
    nav: '对话成队',
    eyebrow: '1 / 从目标开始',
    title: '一句话,自由创建团队',
    description: '通过聊天快速搭建团队雏形,灵活管理成员与职责,轻松形成清晰的组织架构。从对话到团队,让想法快速落地。',
    points: ['一句话创建团队', '聊天式管理职责', '快速形成组织架构'],
    images: [productImage('conversation-1'), productImage('conversation-2')],
    alts: ['AI Team 对话页面', 'AI Team 团队方案对话'],
  },
  {
    id: 'workflow',
    nav: '协作流程',
    eyebrow: '2 / 看清协作',
    title: '每个角色做什么，交接给谁，一眼看清',
    description: '在团队流程图中查看输入、员工节点和最终输出。沿着协作关系检查依赖与运行准备，让每一步都有明确方向。',
    points: ['查看员工分工与节点关系', '检查输入、依赖和交付', '掌握运行前需要准备的事项'],
    images: [productImage('workflow-1'), productImage('workflow-2')],
    alts: ['AI Team 协作流程图', 'AI Team 团队运行准备'],
  },
  {
    id: 'employees',
    nav: '员工工程',
    eyebrow: '3 / 打磨员工',
    title: '让 AI 员工胜任各自岗位',
    description: '从岗位定义、技能和 WorkFlow 到工程文件，逐项检查每位员工的职责与做事方式，让员工配置贴合具体工作。',
    points: ['编辑岗位职责与技能需求', '维护输入输出契约和工作步骤', '管理员工工程文件'],
    images: [productImage('employee-1'), productImage('employee-2')],
    alts: ['AI 员工岗位与工程编辑器', 'AI 员工工作流配置'],
  },
  {
    id: 'tasks',
    nav: '任务运行',
    eyebrow: '4 / 一起执行',
    title: '从提交任务，到检查每一份成果',
    description: '选择团队或单个员工执行任务。运行期间查看节点状态和日志，及时处理待答问题，结束后核对输入、总结和交付文件。',
    points: ['团队执行或单员工执行', '跟进运行状态、日志与待答问题', '检查成果和输出文件'],
    images: [productImage('tasks-1'), productImage('tasks-2')],
    alts: ['AI Team 任务列表', 'AI Team 已完成的运行详情'],
  },
  {
    id: 'dashboard',
    nav: '团队看板',
    eyebrow: '5 / 看到全局',
    title: '把团队关心的信息整理成看板',
    description: '通过看板预览团队需要的信息呈现。检查生成结果和配置，让重要进展、数据与协作状态更容易被团队掌握。',
    points: ['查看看板生成入口', '预览已保存的看板配置', '集中浏览团队信息'],
    images: [productImage('dashboard-1'), productImage('dashboard-2')],
    alts: ['AI Team 看板入口', 'AI Team 看板预览'],
  },
]

function Icon({ name, size = 18 }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 19h14" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }
  return <svg {...shared}>{paths[name]}</svg>
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="/" aria-label="AI Team 首页">
      <span className="brand-mark">A<span>·</span></span>
      <span>AI Team</span>
    </a>
  )
}

function getDownloadLabel() {
  const platform = `${navigator.userAgentData?.platform || ''} ${navigator.platform || ''} ${navigator.userAgent || ''}`.toLowerCase()
  if (platform.includes('windows')) return '下载 Windows 版'
  if (platform.includes('mac')) return '下载 macOS 版'
  return '下载桌面版'
}

function DownloadButton({ compact = false }) {
  return (
    <button className={`button button-dark${compact ? ' button-compact' : ''}`} type="button">
      {!compact && <Icon name="download" size={17} />}
      <span>{getDownloadLabel()}</span>
    </button>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className={`main-nav${menuOpen ? ' main-nav-open' : ''}`} aria-label="功能导航">
          {features.map((feature) => <a key={feature.id} href={`#${feature.id}`} onClick={() => setMenuOpen(false)}>{feature.nav}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-docs" href="/docs"><Icon name="book" size={17} /><span>使用文档</span></a>
          <DownloadButton compact />
        </div>
        <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  )
}

function Carousel({ feature }) {
  const [index, setIndex] = useState(0)
  const [pausedUntilMouseLeave, setPausedUntilMouseLeave] = useState(false)
  const touchStart = useRef(null)
  const length = feature.images.length
  const change = (direction) => setIndex((current) => (current + direction + length) % length)

  useEffect(() => {
    if (pausedUntilMouseLeave) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % length), 5200)
    return () => window.clearInterval(timer)
  }, [length, pausedUntilMouseLeave])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') change(-1)
    if (event.key === 'ArrowRight') change(1)
  }

  return (
    <div className="carousel" aria-roledescription="carousel" aria-label={`${feature.nav}产品截图`} onKeyDown={onKeyDown} onMouseLeave={() => setPausedUntilMouseLeave(false)} tabIndex={0}>
      <div className="carousel-halo" />
      <div className="carousel-window" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const distance = event.changedTouches[0].clientX - touchStart.current
        if (Math.abs(distance) > 45) change(distance > 0 ? -1 : 1)
        touchStart.current = null
      }}>
        <div className="carousel-chrome"><span /><span /><span /><div className="chrome-address">ai-team / {feature.id}</div></div>
        <div className="carousel-image-wrap">
          {feature.images.map((src, imageIndex) => (
            <img
              key={src}
              src={src}
              alt={feature.alts[imageIndex]}
              className={`carousel-image${imageIndex === index ? ' carousel-image-active' : ''}`}
              loading="lazy"
              draggable="false"
            />
          ))}
        </div>
      </div>
      <div className="carousel-pagination" role="tablist" aria-label="选择截图">
        {feature.images.map((src, dotIndex) => <button key={src} className={`pagination-bar${dotIndex === index ? ' pagination-bar-active' : ''}`} type="button" role="tab" aria-selected={dotIndex === index} aria-label={`第 ${dotIndex + 1} 张截图`} onClick={() => { setIndex(dotIndex); setPausedUntilMouseLeave(true) }} />)}
      </div>
    </div>
  )
}

function FeatureSection({ feature }) {
  return (
    <section id={feature.id} className="feature-section">
      <div className="feature-inner">
        <div className="feature-copy">
          <div className="feature-eyebrow"><span className="eyebrow-dot" />{feature.eyebrow}</div>
          <h2>{feature.title}</h2>
          <p className="feature-description">{feature.description}</p>
          <ul className="feature-points">{feature.points.map((point) => <li key={point}><span className="point-check">✓</span>{point}</li>)}</ul>
        </div>
        <Carousel feature={feature} />
      </div>
    </section>
  )
}

function HomePage() {
  const [heroImage, setHeroImage] = useState(0)
  const [heroPausedUntilMouseLeave, setHeroPausedUntilMouseLeave] = useState(false)
  useEffect(() => {
    if (heroPausedUntilMouseLeave) return
    const timer = window.setInterval(() => setHeroImage((index) => (index + 1) % heroImages.length), 3000)
    return () => window.clearInterval(timer)
  }, [heroPausedUntilMouseLeave])

  return (
    <div className="home-page">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />
          <div className="hero-copy">
            <h1>从想法，到一起工作的 <span>AI Team</span></h1>
            <p>把一个目标拆解成团队协作方案、员工职责与执行任务。<br className="desktop-break" />让 AI 员工各司其职，一起把事情做完。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/docs">查看使用文档 <Icon name="arrow" size={17} /></a>
              <DownloadButton />
            </div>
          </div>
          <div className="hero-visual" aria-label="AI Team 产品界面预览" onMouseLeave={() => setHeroPausedUntilMouseLeave(false)}>
            <div className="hero-image-glow" />
            <div className="hero-image-card">
              <div className="hero-image-topbar"><span className="window-dot window-dot-coral" /><span className="window-dot window-dot-yellow" /><span className="window-dot window-dot-green" /><span className="hero-image-label">AI Team <span>/ 产品预览</span></span></div>
              <div className="hero-image-stage">
                {heroImages.map((src, imageIndex) => <img key={src} src={src} alt="AI Team 产品界面预览" className={`hero-image${heroImage === imageIndex ? ' hero-image-active' : ''}`} />)}
              </div>
            </div>
            <div className="hero-carousel-pagination" role="tablist" aria-label="选择首屏产品截图">
              {heroImages.map((src, imageIndex) => <button key={src} className={`pagination-bar${imageIndex === heroImage ? ' pagination-bar-active' : ''}`} type="button" role="tab" aria-selected={imageIndex === heroImage} aria-label={`第 ${imageIndex + 1} 张首屏图片`} onClick={() => { setHeroImage(imageIndex); setHeroPausedUntilMouseLeave(true) }} />)}
            </div>
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
          </div>
          <video className="hero-introduction-video" controls preload="metadata" src="/videos/ai-team-introduction.mp4" aria-label="AI Team 产品介绍视频" />
        </section>

        <div id="features" className="feature-sections">
          {features.map((feature) => <FeatureSection key={feature.id} feature={feature} />)}
        </div>
      </main>
    </div>
  )
}

function getDocumentHeadings(markdown) {
  const slugger = new GithubSlugger()
  return markdown.split('\n').flatMap((line) => {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/)
    if (!match) return []
    const text = match[2].replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_~]/g, '').trim()
    if (text === '目录') return []
    return [{ id: slugger.slug(text), text, depth: match[1].length }]
  })
}

function DocsHeader() {
  return <header className="docs-header"><div className="docs-header-inner"><Brand /><div className="docs-breadcrumb"><span className="breadcrumb-divider">/</span><span>用户手册</span></div><a className="docs-home-link" href="/">返回首页 <Icon name="arrow" size={15} /></a></div></header>
}

function DocsPage() {
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState('')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const toc = useMemo(() => getDocumentHeadings(markdown), [markdown])

  useEffect(() => {
    let cancelled = false
    fetch('/docs/AI-Team-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.md')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.text()
      })
      .then((content) => { if (!cancelled) setMarkdown(content) })
      .catch(() => { if (!cancelled) setError('暂时无法加载用户手册，请稍后刷新页面。') })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!toc.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActiveId(visible[0].target.id)
    }, { rootMargin: '-90px 0px -70% 0px', threshold: 0 })
    toc.forEach(({ id }) => {
      const heading = document.getElementById(id)
      if (heading) observer.observe(heading)
    })
    return () => observer.disconnect()
  }, [toc])

  const onTocClick = () => setMobileTocOpen(false)
  const markdownComponents = {
    img({ src = '', alt = '', ...props }) {
      const resolvedSrc = new URL(src, `${window.location.origin}/docs/AI-Team-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C.md`).pathname
      return <figure className="manual-figure"><img src={resolvedSrc} alt={alt} loading="lazy" {...props} /></figure>
    },
    a({ href = '', children, ...props }) {
      const isExternal = /^https?:\/\//.test(href)
      return <a href={href} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>{children}</a>
    },
  }

  return (
    <div className="docs-page">
      <DocsHeader />
      <div className="docs-shell">
        <button className="toc-mobile-toggle" type="button" aria-expanded={mobileTocOpen} onClick={() => setMobileTocOpen((open) => !open)}>
          <span><span className="toc-toggle-icon">☰</span>目录</span><span className="toc-current">{toc.find((item) => item.id === activeId)?.text || '选择章节'}</span>
        </button>
        <aside className={`docs-sidebar${mobileTocOpen ? ' docs-sidebar-open' : ''}`}>
          <div className="sidebar-caption">AI TEAM · 用户手册</div>
          <nav aria-label="用户手册目录">
            <a className={`toc-link toc-link-main${activeId === '' ? ' toc-link-active' : ''}`} href="#ai-team-用户手册" onClick={onTocClick}>用户手册</a>
            {toc.map((item) => <a key={item.id} href={`#${item.id}`} onClick={onTocClick} className={`toc-link toc-level-${item.depth}${activeId === item.id ? ' toc-link-active' : ''}`}>{item.text}</a>)}
          </nav>
          <a className="sidebar-home" href="/"><span>←</span> 回到 AI Team 首页</a>
        </aside>
        <main className="docs-main">
          <div className="docs-page-kicker"><span className="docs-page-kicker-line" />使用指南</div>
          {error ? <div className="docs-error">{error}</div> : !markdown ? <div className="docs-loading">正在加载用户手册…</div> : <article className="manual-content"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={markdownComponents}>{markdown}</ReactMarkdown></article>}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const isDocs = window.location.pathname.replace(/\/$/, '') === '/docs'
  return isDocs ? <DocsPage /> : <HomePage />
}
