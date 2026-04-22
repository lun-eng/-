import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Save, 
  Video, 
  Layout, 
  GripVertical,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface Chapter {
  title: string;
  start: number; // percentage 0-100
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

const LessonEditor = ({ 
  lesson, 
  onUpdate 
}: { 
  lesson: Lesson, 
  onUpdate: (updates: Partial<Lesson>) => void 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addChapter = () => {
    const chapters = lesson.chapters || [];
    const newChapter: Chapter = { title: "新章节", start: 0, end: 10 };
    onUpdate({ chapters: [...chapters, newChapter] });
  };

  const updateChapter = (idx: number, updates: Partial<Chapter>) => {
    const chapters = [...(lesson.chapters || [])];
    chapters[idx] = { ...chapters[idx], ...updates };
    onUpdate({ chapters });
  };

  const removeChapter = (idx: number) => {
    const chapters = (lesson.chapters || []).filter((_, i) => i !== idx);
    onUpdate({ chapters });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">OSS 视频直链 (Video URL)</label>
              <div className="relative group/input">
                <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-primary transition-colors" size={16} />
                <input 
                  type="text" 
                  value={lesson.videoUrl}
                  onChange={(e) => onUpdate({ videoUrl: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-black border border-white/5 focus:border-primary outline-none rounded text-xs transition-all placeholder:text-white/10"
                  placeholder="https://oss.../video.mp4"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">课程内容简介 (Description)</label>
              <textarea 
                value={lesson.description || ""}
                onChange={(e) => onUpdate({ description: e.target.value })}
                className="w-full p-4 bg-black border border-white/5 focus:border-primary outline-none rounded text-xs transition-all placeholder:text-white/10 min-h-[100px] resize-none"
                placeholder="详细介绍本节课的核心知识点..."
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
           <div className="bg-white/2 border border-white/5 rounded-lg p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">讲师与发布信息</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest">讲师姓名</label>
                  <input 
                    type="text" 
                    value={lesson.instructorName || ""}
                    onChange={(e) => onUpdate({ instructorName: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/5 focus:border-primary outline-none rounded text-[11px] transition-all"
                    placeholder="陈教授"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest">讲师头衔</label>
                  <input 
                    type="text" 
                    value={lesson.instructorTitle || ""}
                    onChange={(e) => onUpdate({ instructorTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/5 focus:border-primary outline-none rounded text-[11px] transition-all"
                    placeholder="高级架构师"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold text-white/30 uppercase tracking-widest">发布日期</label>
                <input 
                  type="text" 
                  value={lesson.publishDate || ""}
                  onChange={(e) => onUpdate({ publishDate: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/5 focus:border-primary outline-none rounded text-[11px] transition-all"
                  placeholder="2024年3月12日"
                />
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 py-2 flex items-center justify-center gap-2 border border-white/10 rounded text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all"
              >
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                视频打点章节 ({lesson.chapters?.length || 0})
              </button>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/40 border border-white/5 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">视频内部打点 (Interactive Chapters)</span>
              <button 
                onClick={addChapter}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] font-black uppercase tracking-widest"
              >
                <Plus size={10} /> 添加打点
              </button>
            </div>

            <div className="space-y-3">
              {(lesson.chapters || []).map((chapter, cIdx) => (
                <div key={cIdx} className="grid grid-cols-12 gap-4 items-end bg-white/2 p-3 rounded border border-white/5">
                  <div className="col-span-5 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold text-white/20 uppercase">章节名</label>
                    <input 
                      type="text" 
                      value={chapter.title}
                      onChange={(e) => updateChapter(cIdx, { title: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 outline-none text-[11px] py-1"
                    />
                  </div>
                  <div className="col-span-3 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold text-white/20 uppercase">起始 %</label>
                    <input 
                      type="number" 
                      value={chapter.start}
                      onChange={(e) => updateChapter(cIdx, { start: Number(e.target.value) })}
                      className="w-full bg-transparent border-b border-white/10 outline-none text-[11px] py-1"
                    />
                  </div>
                  <div className="col-span-3 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold text-white/20 uppercase">结束 %</label>
                    <input 
                      type="number" 
                      value={chapter.end}
                      onChange={(e) => updateChapter(cIdx, { end: Number(e.target.value) })}
                      className="w-full bg-transparent border-b border-white/10 outline-none text-[11px] py-1"
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button onClick={() => removeChapter(cIdx)} className="text-white/10 hover:text-red-500 transition-colors mb-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {(!lesson.chapters || lesson.chapters.length === 0) && (
                <p className="text-center py-4 text-[10px] text-white/10 font-bold uppercase tracking-widest">尚未添加任何视频章节打点</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [courses, setCourses] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courses),
      });
      if (response.ok) {
        setMessage({ type: "success", text: "课程大纲已保存" });
      } else {
        setMessage({ type: "error", text: "保存失败" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "网络错误" });
    } finally {
      setIsSaving(false);
    }
  };

  const addSection = () => {
    const newSection: Section = {
      id: `S${courses.length + 1}`,
      title: "新章节",
      lessons: []
    };
    setCourses([...courses, newSection]);
  };

  const removeSection = (id: string) => {
    setCourses(courses.filter(s => s.id !== id));
  };

  const updateSectionTitle = (id: string, title: string) => {
    setCourses(courses.map(s => s.id === id ? { ...s, title } : s));
  };

  const addLesson = (sectionId: string) => {
    setCourses(courses.map(s => {
      if (s.id === sectionId) {
        const newLesson: Lesson = {
          id: `L${s.lessons.length + 1}`,
          title: "新课程",
          videoUrl: ""
        };
        return { ...s, lessons: [...s.lessons, newLesson] };
      }
      return s;
    }));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setCourses(courses.map(s => {
      if (s.id === sectionId) {
        return { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) };
      }
      return s;
    }));
  };

  const updateLesson = (sectionId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourses(courses.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: s.lessons.map(l => l.id === lessonId ? { ...l, ...updates } : l)
        };
      }
      return s;
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-primary/20 flex items-center justify-center rounded">
            <Layout className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight text-white uppercase italic">管理后台 / 后台管理系统</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">管理员：{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <AnimatePresence>
            {message && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  "px-4 py-2 rounded-md flex items-center gap-2 text-xs font-bold",
                  message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                )}
              >
                {message.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black rounded font-black text-xs uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
            保存发布
          </button>
          
          <button 
            onClick={logout}
            className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            登出
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-10">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black font-display tracking-tighter uppercase italic text-white flex items-center gap-4">
              课程大纲编辑 <span className="text-white/20 italic font-mono text-sm tracking-normal">Syllabus Editor</span>
            </h2>
            <p className="text-on-surface-variant font-medium mt-2">点击添加章节或在下方直接编辑课程及 OSS 视频链接。</p>
          </div>
          
          <button 
            onClick={addSection}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Plus size={14} />
            添加新章节
          </button>
        </div>

        <div className="space-y-8">
          {courses.map((section, sIdx) => (
            <motion.div 
              layout
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#141416] border border-white/5 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Section Header */}
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1 max-w-2xl">
                  <div className="w-10 h-10 flex items-center justify-center font-mono text-[10px] bg-black text-white/40 border border-white/5 italic">
                    0{sIdx + 1}
                  </div>
                  <input 
                    type="text" 
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    className="flex-1 bg-transparent border-b border-white/10 focus:border-primary outline-none py-1 text-lg font-bold font-display italic transition-all placeholder:text-white/10"
                    placeholder="请输入章节标题"
                  />
                </div>
                
                <div className="flex items-center gap-4 ml-6">
                  <button 
                    onClick={() => addLesson(section.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all"
                  >
                    <Plus size={12} />
                    添加课程
                  </button>
                  <button 
                    onClick={() => removeSection(section.id)}
                    className="p-2 text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Lessons List */}
              <div className="p-2">
                {section.lessons.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-white/20 italic">
                    <Video size={48} className="mb-4 opacity-10" />
                    <p className="text-sm">暂无课程内容，点击右上角添加新课程。</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {section.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="p-6 flex flex-col gap-6 group hover:bg-white/2 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <GripVertical className="text-white/10 cursor-grab" size={16} />
                            <span className="font-mono text-[10px] text-white/20 italic">0{lIdx + 1}</span>
                            <div className="flex-1 max-w-lg">
                              <input 
                                type="text" 
                                value={lesson.title}
                                onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                                className="w-full bg-transparent border-b border-transparent focus:border-primary outline-none py-1 text-sm font-bold transition-all"
                                placeholder="输入课程标题"
                              />
                            </div>
                          </div>
                          <button 
                            onClick={() => removeLesson(section.id, lesson.id)}
                            className="p-2 text-white/5 group-hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <LessonEditor 
                          lesson={lesson} 
                          onUpdate={(updates) => updateLesson(section.id, lesson.id, updates)} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {courses.length === 0 && (
            <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Layout className="text-white/20" size={32} />
               </div>
               <h3 className="text-xl font-bold font-display italic text-white/40">空空如也</h3>
               <p className="text-on-surface-variant mt-2 mb-8">开始构建您的课程大纲并指定视频链接。</p>
               <button 
                  onClick={addSection}
                  className="px-8 py-3 bg-primary text-black rounded font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_50px_rgba(160,192,255,0.1)]"
                >
                  立即创建第一个章节
               </button>
            </div>
          )}
        </div>
      </main>

      <footer className="h-20 border-t border-white/5 bg-black/40 px-10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
        <span>© 2024 UNITX MANAGEMENT SYSTEM</span>
        <div className="flex gap-8">
          <span>系统状态：运行良好</span>
          <span>连接：OSS-WUXI-PROD</span>
        </div>
      </footer>
    </div>
  );
}
