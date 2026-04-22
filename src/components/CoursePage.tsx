import React, { useState, useEffect } from "react";
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
  Download,
  LogOut,
  Loader2
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface Chapter {
  title: string;
  start: number;
  end: number;
}

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  description?: string;
  instructorName?: string;
  instructorTitle?: string;
  publishDate?: string;
  chapters?: Chapter[];
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function CoursePage() {
  const { logout, user } = useAuth();
  const [courses, setCourses] = useState<Section[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(35);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        if (data.length > 0 && data[0].lessons.length > 0) {
          setActiveLesson(data[0].lessons[0]);
        }
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Final check for empty courses
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4 italic">课程即将上线</h2>
        <p className="text-on-surface-variant mb-8">管理员正在秘密筹备中...</p>
        <button onClick={logout} className="text-primary hover:underline flex items-center gap-2">
           <LogOut size={16} /> 登出账号
        </button>
      </div>
    );
  }

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
        <div className="p-8 border-b border-outline-variant text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
           课程大纲 / Syllabus
        </div>
        <nav className="flex-grow py-4">
          {courses.map((chapter) => (
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
                    onClick={() => setActiveLesson(lesson)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-3 text-sm transition-all text-left",
                      activeLesson?.id === lesson.id 
                        ? "bg-primary/10 text-primary border-l-2 border-primary font-bold -ml-[1px]" 
                        : "text-on-surface-variant hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle 
                        size={16} 
                        className={cn(activeLesson?.id === lesson.id ? "text-primary" : "text-on-surface-variant")} 
                        fill={activeLesson?.id === lesson.id ? "currentColor" : "none"}
                      />
                      <span>{lesson.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/5">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold uppercase tracking-tighter">
                {user?.email[0]}
             </div>
             <div className="flex-1 truncate text-[10px] font-black uppercase text-white/40 tracking-wider">
               {user?.email}
             </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 text-white/60 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
          >
            <LogOut size={16} />
            <span>退出系统</span>
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
            <span className="text-white">{activeLesson?.title}</span>
          </nav>

          {/* Video Player */}
          <div className="bg-surface-container border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video relative bg-black group overflow-hidden">
               {activeLesson?.videoUrl ? (
                 <video 
                   src={activeLesson.videoUrl} 
                   className="w-full h-full"
                   controls={isPlaying}
                   autoPlay={isPlaying}
                 />
               ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 italic text-white/20">
                     视频未指定
                  </div>
               )}
              
              {/* Controls placeholder if no native controls */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsPlaying(true)}
                    className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary cursor-pointer shadow-[0_0_50px_rgba(160,192,255,0.3)] hover:bg-primary/30 transition-all"
                  >
                    <Play size={48} fill="currentColor" className="ml-2" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Video Lesson Footer */}
            <div className="p-12">
              <div className="flex justify-between items-start mb-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold font-display text-white mb-4 leading-tight">{activeLesson?.title}</h1>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 p-0.5">
                        <img 
                          src={`https://i.pravatar.cc/100?u=${activeLesson?.instructorName || "instructor"}`} 
                          alt="Instructor" 
                          className="w-full h-full rounded-full object-cover grayscale" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{activeLesson?.instructorName || "讲师"}</span>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black">{activeLesson?.instructorTitle || "高级讲师"}</span>
                      </div>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <span className="text-xs text-on-surface-variant font-medium">发布于 {activeLesson?.publishDate || "2024年"}</span>
                  </div>
                </div>
              </div>

              {activeLesson?.description && (
                <div className="p-8 bg-black/40 rounded-xl border border-white/5 leading-relaxed text-on-surface-variant mb-12 text-lg italic whitespace-pre-wrap">
                  {activeLesson.description}
                </div>
              )}

              {/* Quick Chapter Navigation */}
              {activeLesson?.chapters && activeLesson.chapters.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">视频章节</h3>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {activeLesson.chapters.map((chapter, idx) => (
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
              )}
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
