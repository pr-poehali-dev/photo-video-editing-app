import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Section = "editor" | "media" | "effects" | "settings" | "help";

const NAV_ITEMS: { id: Section; icon: string; label: string }[] = [
  { id: "editor", icon: "Layers", label: "Редактор" },
  { id: "media", icon: "FolderOpen", label: "Медиафайлы" },
  { id: "effects", icon: "Sparkles", label: "Эффекты" },
  { id: "settings", icon: "Settings", label: "Настройки" },
  { id: "help", icon: "BookOpen", label: "Справка" },
];

const TOOLS = [
  { icon: "MousePointer2", label: "Выделение", shortcut: "V" },
  { icon: "Scissors", label: "Обрезка", shortcut: "C" },
  { icon: "Move", label: "Перемещение", shortcut: "M" },
  { icon: "Pencil", label: "Рисование", shortcut: "B" },
  { icon: "Type", label: "Текст", shortcut: "T" },
  { icon: "Crop", label: "Кадрирование", shortcut: "K" },
  { icon: "ZoomIn", label: "Масштаб", shortcut: "Z" },
  { icon: "Eraser", label: "Ластик", shortcut: "E" },
];

const MEDIA_FILES = [
  { id: 1, name: "intro_clip.mp4", type: "video", duration: "0:24", size: "48 МБ" },
  { id: 2, name: "photo_001.jpg", type: "photo", duration: null, size: "4.2 МБ" },
  { id: 3, name: "background.mp4", type: "video", duration: "1:12", size: "120 МБ" },
  { id: 4, name: "portrait.png", type: "photo", duration: null, size: "2.8 МБ" },
  { id: 5, name: "music.mp3", type: "audio", duration: "3:45", size: "8.1 МБ" },
  { id: 6, name: "drone_shot.mp4", type: "video", duration: "0:58", size: "94 МБ" },
  { id: 7, name: "logo.svg", type: "photo", duration: null, size: "0.1 МБ" },
  { id: 8, name: "voiceover.wav", type: "audio", duration: "2:30", size: "28 МБ" },
];

const EFFECTS = [
  { name: "Cinematic LUT", category: "Цвет", preview: "from-amber-900 to-stone-900" },
  { name: "Blur Motion", category: "Переход", preview: "from-blue-900 to-slate-900" },
  { name: "Fade to Black", category: "Переход", preview: "from-gray-900 to-black" },
  { name: "Vignette", category: "Оверлей", preview: "from-zinc-800 to-zinc-950" },
  { name: "Film Grain", category: "Текстура", preview: "from-stone-700 to-stone-900" },
  { name: "Glow", category: "Свет", preview: "from-yellow-900 to-orange-950" },
  { name: "Color Grading", category: "Цвет", preview: "from-teal-900 to-cyan-950" },
  { name: "Dissolve", category: "Переход", preview: "from-violet-900 to-purple-950" },
  { name: "Zoom In", category: "Движение", preview: "from-emerald-900 to-green-950" },
  { name: "Shake", category: "Движение", preview: "from-red-900 to-rose-950" },
  { name: "Vhs Glitch", category: "Ретро", preview: "from-pink-900 to-fuchsia-950" },
  { name: "Sepia Tone", category: "Цвет", preview: "from-yellow-800 to-amber-950" },
];

const TUTORIALS = [
  { title: "Начало работы с редактором", level: "Начинающий", time: "5 мин", icon: "PlayCircle" },
  { title: "Работа с таймлайном", level: "Начинающий", time: "8 мин", icon: "Clock" },
  { title: "Импорт и организация медиа", level: "Начинающий", time: "6 мин", icon: "FolderOpen" },
  { title: "Применение эффектов и фильтров", level: "Средний", time: "12 мин", icon: "Sparkles" },
  { title: "Цветокоррекция", level: "Средний", time: "15 мин", icon: "Palette" },
  { title: "Экспорт в разные форматы", level: "Начинающий", time: "4 мин", icon: "Download" },
  { title: "Работа с аудиодорожками", level: "Средний", time: "10 мин", icon: "Music" },
  { title: "Ключевые кадры и анимация", level: "Продвинутый", time: "20 мин", icon: "Zap" },
];

const TIMELINE_TRACKS = [
  { label: "Видео 1", color: "#2196F3", clips: [{ start: 0, width: 200, name: "intro_clip.mp4" }, { start: 220, width: 320, name: "drone_shot.mp4" }] },
  { label: "Видео 2", color: "#4CAF50", clips: [{ start: 140, width: 180, name: "background.mp4" }] },
  { label: "Аудио 1", color: "#FF9800", clips: [{ start: 0, width: 540, name: "music.mp3" }] },
  { label: "Текст", color: "#9C27B0", clips: [{ start: 60, width: 120, name: "Заголовок" }] },
];

const FORMATS = ["MP4 (H.264)", "MP4 (H.265)", "MOV (ProRes)", "AVI", "WebM", "GIF", "JPEG", "PNG", "TIFF", "RAW"];

function EditorSection({ activeTool, setActiveTool }: { activeTool: number; setActiveTool: (i: number) => void }) {
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Tool Sidebar */}
      <div className="w-12 flex flex-col items-center py-3 gap-1 border-r" style={{ background: "hsl(var(--toolbar-bg))", borderColor: "hsl(var(--panel-border))" }}>
        {TOOLS.map((tool, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <button className={`tool-btn ${activeTool === i ? "active" : ""}`} onClick={() => setActiveTool(i)}>
                <Icon name={tool.icon} size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              <span>{tool.label}</span>
              <span className="ml-2 font-mono-code opacity-60">{tool.shortcut}</span>
            </TooltipContent>
          </Tooltip>
        ))}
        <div className="flex-1" />
        <button className="tool-btn">
          <Icon name="Undo2" size={16} />
        </button>
        <button className="tool-btn">
          <Icon name="Redo2" size={16} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top toolbar */}
        <div className="h-9 flex items-center px-3 gap-2 border-b" style={{ background: "hsl(var(--toolbar-bg))", borderColor: "hsl(var(--panel-border))" }}>
          <span className="text-xs opacity-40 font-mono-code">1920 × 1080</span>
          <div className="w-px h-4 opacity-20 bg-current" />
          <span className="text-xs opacity-40 font-mono-code">100%</span>
          <div className="flex-1" />
          <button className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors hover:bg-secondary" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Icon name="Grid3x3" size={12} />
            <span>Сетка</span>
          </button>
          <button className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors hover:bg-secondary" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Icon name="Maximize2" size={12} />
            <span>Во весь экран</span>
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center canvas-bg relative">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--highlight)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative shadow-2xl animate-fade-in" style={{ width: 560, height: 315, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-30">
                <Icon name="Film" size={40} />
                <p className="text-xs mt-2 font-light tracking-widest uppercase">Предпросмотр</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center gap-3 bg-gradient-to-t from-black/60 to-transparent px-4">
              <span className="font-mono-code text-xs opacity-60">00:00:00:00</span>
              <button onClick={() => setPlaying(p => !p)} className="w-6 h-6 rounded-full flex items-center justify-center transition-colors" style={{ background: "hsl(var(--highlight))" }}>
                <Icon name={playing ? "Pause" : "Play"} size={10} />
              </button>
              <span className="font-mono-code text-xs opacity-60">00:01:30:00</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="h-44 border-t flex flex-col" style={{ background: "hsl(var(--timeline-bg))", borderColor: "hsl(var(--panel-border))" }}>
          <div className="h-8 flex items-center px-3 gap-2 border-b shrink-0" style={{ borderColor: "hsl(var(--panel-border))" }}>
            <button className="tool-btn w-7 h-7"><Icon name="SkipBack" size={13} /></button>
            <button className="tool-btn w-7 h-7" onClick={() => setPlaying(p => !p)}>
              <Icon name={playing ? "Pause" : "Play"} size={13} />
            </button>
            <button className="tool-btn w-7 h-7"><Icon name="SkipForward" size={13} /></button>
            <div className="w-px h-4 mx-1 opacity-20 bg-current" />
            <span className="font-mono-code text-xs opacity-50">00:00:08:12</span>
            <div className="flex-1" />
            <button className="tool-btn w-7 h-7"><Icon name="Plus" size={13} /></button>
            <button className="tool-btn w-7 h-7"><Icon name="Minus" size={13} /></button>
            <span className="text-xs opacity-40 mr-1">Масштаб</span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-auto">
            {TIMELINE_TRACKS.map((track, ti) => (
              <div key={ti} className="timeline-track flex" style={{ minWidth: 700 }}>
                <div className="w-20 shrink-0 flex items-center px-2 border-r text-xs font-medium" style={{ borderColor: "hsl(var(--panel-border))", color: track.color }}>
                  {track.label}
                </div>
                <div className="flex-1 relative h-full">
                  {track.clips.map((clip, ci) => (
                    <div key={ci} className="timeline-clip animate-fade-in" style={{ left: clip.start, width: clip.width, background: track.color + "33", borderLeft: `2px solid ${track.color}`, color: track.color }}>
                      {clip.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-56 border-l flex flex-col" style={{ background: "hsl(var(--panel-bg))", borderColor: "hsl(var(--panel-border))" }}>
        <div className="section-header">
          <span>Параметры</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
          {[
            { label: "Яркость", value: brightness, set: setBrightness },
            { label: "Контраст", value: contrast, set: setContrast },
            { label: "Насыщенность", value: saturation, set: setSaturation },
          ].map((param) => (
            <div key={param.label}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{param.label}</span>
                <span className="font-mono-code text-xs" style={{ color: "hsl(var(--highlight))" }}>{param.value[0]}</span>
              </div>
              <Slider value={param.value} onValueChange={param.set} min={0} max={200} step={1} className="w-full" />
            </div>
          ))}
          <div className="h-px" style={{ background: "hsl(var(--panel-border))" }} />
          <div>
            <p className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>Позиция</p>
            <div className="grid grid-cols-2 gap-1">
              {["X: 0", "Y: 0", "W: 1920", "H: 1080"].map((v) => (
                <div key={v} className="rounded px-2 py-1 font-mono-code text-xs" style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}>
                  {v}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px" style={{ background: "hsl(var(--panel-border))" }} />
          <div>
            <p className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>Поворот</p>
            <Slider defaultValue={[0]} min={-180} max={180} step={1} className="w-full" />
          </div>
          <div>
            <p className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>Прозрачность</p>
            <Slider defaultValue={[100]} min={0} max={100} step={1} className="w-full" />
          </div>
        </div>
        <div className="p-3 border-t" style={{ borderColor: "hsl(var(--panel-border))" }}>
          <button className="w-full py-2 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>
            <Icon name="Download" size={14} />
            Экспорт
          </button>
        </div>
      </div>
    </div>
  );
}

function MediaSection() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");

  const filters = [
    { id: "all", label: "Все" },
    { id: "video", label: "Видео" },
    { id: "photo", label: "Фото" },
    { id: "audio", label: "Аудио" },
  ];

  const filtered = filter === "all" ? MEDIA_FILES : MEDIA_FILES.filter(f => f.type === filter);

  const typeIcon = (type: string) => {
    if (type === "video") return "Film";
    if (type === "photo") return "Image";
    return "Music";
  };

  const typeColor = (type: string) => {
    if (type === "video") return "#2196F3";
    if (type === "photo") return "#4CAF50";
    return "#FF9800";
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>
          <Icon name="Upload" size={14} />
          Импорт
        </button>
        <div className="flex rounded overflow-hidden border" style={{ borderColor: "hsl(var(--panel-border))" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className="px-3 py-1.5 text-xs font-medium transition-colors" style={{ background: filter === f.id ? "hsl(var(--highlight) / 0.2)" : "transparent", color: filter === f.id ? "hsl(var(--highlight))" : "hsl(var(--muted-foreground))" }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button onClick={() => setView("grid")} className={`tool-btn w-7 h-7 ${view === "grid" ? "active" : ""}`}>
          <Icon name="LayoutGrid" size={14} />
        </button>
        <button onClick={() => setView("list")} className={`tool-btn w-7 h-7 ${view === "list" ? "active" : ""}`}>
          <Icon name="List" size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {view === "grid" ? (
          <div className="grid grid-cols-4 gap-3">
            {filtered.map(file => (
              <div key={file.id} className="media-thumb animate-slide-up">
                <div className="aspect-video flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${typeColor(file.type)}22, ${typeColor(file.type)}11)` }}>
                  <Icon name={typeIcon(file.type)} size={28} style={{ color: typeColor(file.type) + "aa" }} />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-40">{file.size}</span>
                    {file.duration && <span className="font-mono-code text-xs opacity-40">{file.duration}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
                {["Имя", "Тип", "Длительность", "Размер"].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(file => (
                <tr key={file.id} className="border-b transition-colors hover:bg-secondary cursor-pointer" style={{ borderColor: "hsl(var(--panel-border))" }}>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <Icon name={typeIcon(file.type)} size={14} style={{ color: typeColor(file.type) }} />
                      <span className="text-xs">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-xs opacity-60">{file.type === "photo" ? "Фото" : file.type === "video" ? "Видео" : "Аудио"}</td>
                  <td className="py-2 px-3 font-mono-code text-xs opacity-60">{file.duration || "—"}</td>
                  <td className="py-2 px-3 text-xs opacity-60">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function EffectsSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const categories = ["Все", "Цвет", "Переход", "Оверлей", "Текстура", "Свет", "Движение", "Ретро"];
  const [cat, setCat] = useState("Все");

  const filtered = cat === "Все" ? EFFECTS : EFFECTS.filter(e => e.category === cat);

  return (
    <div className="flex-1 flex overflow-hidden animate-fade-in">
      <div className="w-40 border-r flex flex-col" style={{ background: "hsl(var(--panel-bg))", borderColor: "hsl(var(--panel-border))" }}>
        <div className="section-header"><span>Категории</span></div>
        <div className="flex flex-col p-2 gap-0.5">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className="text-left px-3 py-1.5 rounded text-xs transition-colors" style={{ background: cat === c ? "hsl(var(--highlight) / 0.15)" : "transparent", color: cat === c ? "hsl(var(--highlight))" : "hsl(var(--muted-foreground))" }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b gap-2" style={{ borderColor: "hsl(var(--panel-border))" }}>
          <div className="flex items-center gap-2 flex-1 rounded px-3 py-1.5" style={{ background: "hsl(var(--muted))" }}>
            <Icon name="Search" size={13} style={{ color: "hsl(var(--muted-foreground))" }} />
            <input className="bg-transparent text-xs outline-none flex-1" placeholder="Поиск эффектов..." style={{ color: "hsl(var(--foreground))" }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {filtered.map(effect => (
              <div key={effect.name} onClick={() => setSelected(effect.name === selected ? null : effect.name)} className="rounded cursor-pointer transition-all duration-200 overflow-hidden" style={{ border: `1px solid ${selected === effect.name ? "hsl(var(--highlight))" : "hsl(var(--panel-border))"}` }}>
                <div className={`h-16 bg-gradient-to-br ${effect.preview} flex items-center justify-center`}>
                  <Icon name="Sparkles" size={20} className="opacity-30" />
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-xs font-medium">{effect.name}</p>
                  <p className="text-xs opacity-40">{effect.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selected && (
          <div className="border-t p-3 flex items-center justify-between" style={{ borderColor: "hsl(var(--panel-border))" }}>
            <div>
              <p className="text-sm font-medium">{selected}</p>
              <p className="text-xs opacity-40 mt-0.5">Нажмите «Применить» для добавления на клип</p>
            </div>
            <button className="px-4 py-1.5 rounded text-xs font-medium transition-colors" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>
              Применить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsSection() {
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "Основные" },
    { id: "export", label: "Экспорт" },
    { id: "shortcuts", label: "Горячие клавиши" },
    { id: "profile", label: "Профиль" },
  ];

  return (
    <div className="flex-1 flex overflow-hidden animate-fade-in">
      <div className="w-40 border-r flex flex-col" style={{ background: "hsl(var(--panel-bg))", borderColor: "hsl(var(--panel-border))" }}>
        <div className="section-header"><span>Раздел</span></div>
        <div className="flex flex-col p-2 gap-0.5">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className="text-left px-3 py-1.5 rounded text-xs transition-colors" style={{ background: activeTab === t.id ? "hsl(var(--highlight) / 0.15)" : "transparent", color: activeTab === t.id ? "hsl(var(--highlight))" : "hsl(var(--muted-foreground))" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "general" && (
          <div className="max-w-lg flex flex-col gap-6 animate-fade-in">
            <h2 className="text-base font-semibold">Основные настройки</h2>
            {[
              { label: "Язык интерфейса", value: "Русский" },
              { label: "Разрешение по умолчанию", value: "1920 × 1080" },
              { label: "Частота кадров", value: "24 fps" },
              { label: "Рабочая папка", value: "/Users/user/FrameForge" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
                <span className="text-sm">{item.label}</span>
                <span className="text-sm opacity-60 font-mono-code">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "export" && (
          <div className="max-w-lg flex flex-col gap-4 animate-fade-in">
            <h2 className="text-base font-semibold">Поддерживаемые форматы</h2>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.map(fmt => (
                <div key={fmt} className="flex items-center gap-2 px-3 py-2 rounded border" style={{ borderColor: "hsl(var(--panel-border))" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--highlight))" }} />
                  <span className="text-xs">{fmt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "shortcuts" && (
          <div className="max-w-lg flex flex-col gap-2 animate-fade-in">
            <h2 className="text-base font-semibold mb-2">Горячие клавиши</h2>
            {TOOLS.map(tool => (
              <div key={tool.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "hsl(var(--panel-border))" }}>
                <span className="text-sm">{tool.label}</span>
                <kbd className="px-2 py-0.5 rounded font-mono-code text-xs" style={{ background: "hsl(var(--muted))", color: "hsl(var(--highlight))" }}>{tool.shortcut}</kbd>
              </div>
            ))}
          </div>
        )}
        {activeTab === "profile" && (
          <div className="max-w-lg flex flex-col gap-4 animate-fade-in">
            <h2 className="text-base font-semibold">Профиль пользователя</h2>
            <div className="flex items-center gap-4 p-4 rounded border" style={{ borderColor: "hsl(var(--panel-border))" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>А</div>
              <div>
                <p className="font-medium">Пользователь</p>
                <p className="text-sm opacity-50">user@example.com</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[["Проектов", "12"], ["Экспортов", "48"], ["Часов работы", "72"]].map(([k, v]) => (
                <div key={k} className="rounded border p-3 text-center" style={{ borderColor: "hsl(var(--panel-border))" }}>
                  <p className="text-xl font-bold" style={{ color: "hsl(var(--highlight))" }}>{v}</p>
                  <p className="text-xs opacity-50 mt-1">{k}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HelpSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const levels: Record<string, string> = {
    "Начинающий": "#4CAF50",
    "Средний": "#FF9800",
    "Продвинутый": "#F44336",
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold mb-1">Обучение и справка</h2>
        <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>Видеоуроки и документация для работы с редактором</p>
        <div className="grid grid-cols-2 gap-3">
          {TUTORIALS.map((t, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} className="rounded border p-4 cursor-pointer transition-all duration-200" style={{ borderColor: selected === i ? "hsl(var(--highlight))" : "hsl(var(--panel-border))", background: selected === i ? "hsl(var(--highlight) / 0.05)" : "transparent" }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "hsl(var(--muted))" }}>
                  <Icon name={t.icon} size={16} style={{ color: "hsl(var(--highlight))" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: levels[t.level] + "22", color: levels[t.level] }}>{t.level}</span>
                    <span className="text-xs opacity-40 flex items-center gap-1">
                      <Icon name="Clock" size={10} />{t.time}
                    </span>
                  </div>
                </div>
              </div>
              {selected === i && (
                <div className="mt-3 pt-3 border-t animate-fade-in" style={{ borderColor: "hsl(var(--panel-border))" }}>
                  <p className="text-xs opacity-60 mb-2">Нажмите кнопку ниже, чтобы начать урок</p>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>
                    <Icon name="PlayCircle" size={12} />
                    Начать урок
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 rounded border" style={{ borderColor: "hsl(var(--panel-border))", background: "hsl(var(--panel-bg))" }}>
          <div className="flex items-center gap-3 mb-3">
            <Icon name="HelpCircle" size={18} style={{ color: "hsl(var(--highlight))" }} />
            <span className="font-medium text-sm">Нужна помощь?</span>
          </div>
          <p className="text-sm opacity-60 mb-3">Не нашли ответ на свой вопрос? Свяжитесь с поддержкой или посетите форум сообщества.</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded text-xs font-medium" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>Написать в поддержку</button>
            <button className="px-4 py-2 rounded text-xs font-medium border transition-colors hover:bg-secondary" style={{ borderColor: "hsl(var(--panel-border))", color: "hsl(var(--muted-foreground))" }}>Форум</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [section, setSection] = useState<Section>("editor");
  const [activeTool, setActiveTool] = useState(0);

  const sectionLabel: Record<Section, string> = {
    editor: "Рабочий стол",
    media: "Медиафайлы",
    effects: "Эффекты и фильтры",
    settings: "Настройки",
    help: "Туториалы и справка",
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "hsl(var(--toolbar-bg))" }}>
      {/* Top Menu Bar */}
      <div className="h-10 flex items-center px-3 border-b shrink-0 gap-4" style={{ background: "hsl(var(--toolbar-bg))", borderColor: "hsl(var(--panel-border))" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "hsl(var(--highlight))" }}>
            <Icon name="Film" size={11} />
          </div>
          <span className="text-sm font-semibold tracking-tight">FrameForge</span>
        </div>
        <div className="flex items-center gap-0.5">
          {["Файл", "Правка", "Вид", "Клип", "Фильтры", "Окно"].map(m => (
            <button key={m} className="px-2.5 py-1 rounded text-xs transition-colors hover:bg-secondary" style={{ color: "hsl(var(--muted-foreground))" }}>{m}</button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ background: "hsl(var(--muted))" }}>
          <Icon name="Search" size={12} style={{ color: "hsl(var(--muted-foreground))" }} />
          <input className="bg-transparent text-xs outline-none w-28" placeholder="Поиск..." style={{ color: "hsl(var(--foreground))" }} />
        </div>
        <div className="flex items-center gap-1">
          <button className="tool-btn w-7 h-7"><Icon name="Bell" size={13} /></button>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ml-1" style={{ background: "hsl(var(--highlight))", color: "#fff" }}>А</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav */}
        <div className="w-14 flex flex-col items-center py-3 gap-1 border-r shrink-0" style={{ background: "hsl(var(--toolbar-bg))", borderColor: "hsl(var(--panel-border))" }}>
          {NAV_ITEMS.map(item => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button onClick={() => setSection(item.id)} className={`tool-btn w-10 h-10 ${section === item.id ? "active" : ""}`}>
                  <Icon name={item.icon} size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section Header */}
          <div className="h-9 flex items-center px-4 border-b shrink-0" style={{ background: "hsl(var(--panel-bg))", borderColor: "hsl(var(--panel-border))" }}>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              {sectionLabel[section]}
            </span>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {section === "editor" && <EditorSection activeTool={activeTool} setActiveTool={setActiveTool} />}
            {section === "media" && <MediaSection />}
            {section === "effects" && <EffectsSection />}
            {section === "settings" && <SettingsSection />}
            {section === "help" && <HelpSection />}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 flex items-center px-4 gap-4 border-t shrink-0" style={{ background: "hsl(var(--timeline-bg))", borderColor: "hsl(var(--panel-border))" }}>
        <span className="font-mono-code text-xs opacity-40">Готов</span>
        <div className="w-px h-3 opacity-20 bg-current" />
        <span className="font-mono-code text-xs opacity-40">Проект: Без имени</span>
        <div className="flex-1" />
        <span className="font-mono-code text-xs opacity-40">GPU: Активен</span>
        <div className="w-px h-3 opacity-20 bg-current" />
        <span className="font-mono-code text-xs opacity-40">RAM: 2.4 GB</span>
      </div>
    </div>
  );
}
