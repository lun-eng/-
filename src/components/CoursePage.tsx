import React, { useState } from "react";
import { 
  ChevronRight, 
  BookOpen, 
  PlayCircle, 
  PauseCircle,
  Play,
  Pause,
  CheckCircle, 
  Lock, 
  Share2, 
  Bookmark,
  Expand,
  Volume2,
  Settings,
  Layers,
  Zap,
  Shield,
  Download
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { COURSE_SYLLABUS } from "../constants";

export default function CoursePage() {
  const [activeLesson, setActiveLesson] = useState(COURSE_SYLLABUS[0].lessons[0]);
  const [progress, setProgress] = useState(35); // simulated progress percentage
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulated chapters for the current video
  const videoChapters = [
    { title: "开篇：行业现状", start: 0, end: 15 },
    { title: "架构核心逻辑", start: 15, end: 45 },
    { title: "实战案例演示", start: 45, end: 85 },
    { title: "总结与答疑", start: 85, end: 100 },
  ];

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.round((x / rect.width) * 100);
    setProgress(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setHoverProgress(percentage);
  };

  return (
    <div className="flex bg-black min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-surface-dim border-r border-outline-variant flex flex-col fixed top-20 bottom-0 overflow-y-auto">
        <div className="p-8 border-b border-outline-variant">
          <h2 className="text-xl font-bold font-display text-white">课程大纲</h2>
          <p className="text-xs text-on-surface-variant mt-1 uppercase tracking-widest font-semibold">企业级培训 v2.4</p>
        </div>

        <nav className="flex-grow py-4">
          {COURSE_SYLLABUS.map((chapter) => (
            <div key={chapter.id} className="mb-2">
              <div className="flex items-center justify-between px-6 py-3 text-sm font-bold text-on-surface-variant hover:bg-white/5 cursor-pointer group transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="group-hover:text-primary transition-colors" />
                  <span>{chapter.title}</span>
                </div>
                <ChevronRight size={16} />
              </div>
              <div className="ml-6 border-l border-outline">
                {chapter.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => lesson.status !== "locked" && setActiveLesson(lesson)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-3 text-sm transition-all text-left",
                      activeLesson.id === lesson.id 
                        ? "bg-primary/10 text-primary border-l-2 border-primary font-bold -ml-[1px]" 
                        : "text-on-surface-variant hover:bg-white/5 hover:text-white",
                      lesson.status === "locked" && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {lesson.status === "completed" ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : lesson.status === "locked" ? (
                        <Lock size={16} />
                      ) : (
                        <PlayCircle 
                          size={16} 
                          className={cn(activeLesson.id === lesson.id ? "text-primary" : "text-on-surface-variant")} 
                          fill={activeLesson.id === lesson.id ? "currentColor" : "none"}
                        />
                      )}
                      <span>{lesson.id} {lesson.title}</span>
                    </div>
                    <span className="text-[10px] opacity-40 font-mono italic">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 text-white border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition-all">
            <Download size={16} />
            <span>下载学习资料</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 p-10 overflow-y-auto pt-10">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-8">
            <span className="hover:text-primary cursor-pointer transition-colors">课程中心</span>
            <ChevronRight size={10} />
            <span className="hover:text-primary cursor-pointer transition-colors">基础入门</span>
            <ChevronRight size={10} />
            <span className="text-white">{activeLesson.id} {activeLesson.title}</span>
          </nav>

          {/* Video Player */}
          <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video relative bg-black group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Architecture" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Watermark */}
              <div className="absolute top-8 left-8 z-20 pointer-events-none select-none opacity-50">
                <p className="text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase bg-black/50 px-6 py-2 rounded-md border border-white/10 backdrop-blur-md">
                  视频仅作为UnitX培训使用
                </p>
              </div>

              {/* Controls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <motion.div 
                   whileHover={{ scale: 1.1 }}
                   onClick={() => setIsPlaying(!isPlaying)}
                   className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary cursor-pointer pointer-events-auto shadow-[0_0_50px_rgba(160,192,255,0.3)] hover:bg-primary/30 transition-all"
                 >
                   {isPlaying ? (
                     <Pause size={48} fill="currentColor" />
                   ) : (
                     <Play size={48} fill="currentColor" className="ml-2" />
                   )}
                 </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-primary transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause size={24} fill="currentColor" />
                        ) : (
                          <Play size={24} fill="currentColor" />
                        )}
                      </button>
                      <div className="flex items-center gap-4 text-[10px] font-mono text-white/50">
                        <span className="text-white">
                          {Math.floor((progress * 765) / 100 / 60)}:
                          {String(Math.floor(((progress * 765) / 100) % 60)).padStart(2, "0")}
                        </span>
                        <div className="w-[1px] h-3 bg-white/20" />
                        <span>{activeLesson.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Volume2 size={20} className="cursor-pointer hover:text-primary transition-colors opacity-60" />
                      <Settings size={20} className="cursor-pointer hover:text-primary transition-colors opacity-60" />
                      <button className="flex items-center gap-2 text-xs border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-all font-bold">
                        <Expand size={16} />
                        <span>全屏播放</span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar with Chapters */}
                  <div className="relative group/progress">
                    {/* Hover Chapter Tooltip */}
                    {hoverProgress !== null && (
                      <div 
                        className="absolute bottom-6 -translate-x-1/2 pointer-events-none"
                        style={{ left: `${hoverProgress}%` }}
                      >
                        <div className="bg-surface-container-highest border border-white/10 px-3 py-1.5 rounded-md shadow-2xl backdrop-blur-xl">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">
                            {videoChapters.find(c => hoverProgress >= c.start && hoverProgress < c.end)?.title || "章节"}
                          </p>
                          <p className="text-[10px] text-white/40 font-mono">
                            {Math.floor((hoverProgress * 765) / 100 / 60)}:
                            {String(Math.floor(((hoverProgress * 765) / 100) % 60)).padStart(2, "0")}
                          </p>
                        </div>
                        <div className="w-0.5 h-6 bg-primary/40 mx-auto mt-1" />
                      </div>
                    )}

                    <div 
                      className="relative w-full h-2 cursor-pointer flex gap-[2px]"
                      onClick={handleProgressClick}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setHoverProgress(null)}
                    >
                      {videoChapters.map((chapter, i) => (
                        <div 
                          key={i} 
                          className="h-full bg-white/10 relative overflow-hidden transition-all group-hover/progress:h-3"
                          style={{ width: `${chapter.end - chapter.start}%` }}
                        >
                          {/* Active Progress in Segment */}
                          {progress > chapter.start && (
                            <div 
                              className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(160,192,255,0.4)]"
                              style={{ width: `${Math.min(100, ((progress - chapter.start) / (chapter.end - chapter.start)) * 100)}%` }}
                            />
                          )}
                        </div>
                      ))}
                      
                      {/* Playhead Handle */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full ring-4 ring-primary/30 shadow-2xl transition-transform group-hover/progress:scale-125 z-10 pointer-events-none"
                        style={{ left: `${progress}%`, marginLeft: "-8px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Lesson Footer */}
            <div className="p-12">
              <div className="flex justify-between items-start mb-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold font-display text-white mb-4 leading-tight">{activeLesson.id} {activeLesson.title}：企业级可扩展性设计</h1>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 p-0.5">
                        <img src="https://i.pravatar.cc/100?u=chen" alt="Instructor" className="w-full h-full rounded-full object-cover grayscale" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">陈教授</span>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black">高级架构师</span>
                      </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <span className="text-xs text-on-surface-variant font-medium">发布于 2024年3月12日</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black/40 rounded-xl border border-white/5 leading-relaxed text-on-surface-variant mb-12 text-lg italic">
                本章节将深入探讨现代企业级系统的核心架构原则。我们将从分层架构入手，分析如何通过模块化设计提升系统的可扩展性与维护性。重点包括微服务演进、数据一致性策略以及在高并发环境下的性能优化手段。
              </div>

              {/* Quick Chapter Navigation */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">视频章节</h3>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {videoChapters.map((chapter, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setProgress(chapter.start)}
                      className={cn(
                        "px-5 py-2.5 rounded-lg border text-xs font-bold transition-all transition-colors flex items-center gap-3",
                        progress >= chapter.start && progress < chapter.end
                          ? "bg-primary text-black border-primary"
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span className="opacity-40 font-mono italic">0{idx + 1}</span>
                      <span>{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-12 bg-surface-container p-8 rounded-xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">总体学习进度</span>
                <span className="text-xl font-bold text-white">架构基础认证库</span>
              </div>
              <span className="text-2xl font-black text-primary italic">15%</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "15%" }}
                className="h-full bg-primary shadow-[0_0_15px_rgba(160,192,255,0.4)]" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
