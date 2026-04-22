import { motion } from "motion/react";
import { Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20">
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container max-w-[1600px] px-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-1.5 border border-white/20 rounded-full bg-white/5"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">ENTERPRISE GRADE TRAINING</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] font-display"
            >
              UnitX 视频培训平台
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-on-surface-variant max-w-xl leading-relaxed"
            >
              为专业视频创作者打造的沉浸式学习环境。通过尖端的 4K 播放引擎、实时协作笔记与企业级认证体系，重塑您的技能进阶之路。
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 mt-4"
            >
              <Link 
                to="/auth?mode=register" 
                className="px-10 py-4 bg-primary text-black font-black rounded-sm hover:opacity-90 active:scale-95 transition-all shadow-[0_0_40px_rgba(160,192,255,0.2)]"
              >
                立即注册
              </Link>
              <Link 
                to="/auth?mode=login" 
                className="px-10 py-4 border-2 border-white/20 text-white font-black rounded-sm hover:bg-white/5 active:scale-95 transition-all"
              >
                登录系统
              </Link>
            </motion.div>
          </div>

          {/* Right Video Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative group"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0f0f12] shadow-2xl overflow-hidden aspect-video relative">
              {/* Fake Interface Grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-12 text-center pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">UNITX</h2>
                <p className="text-xl md:text-2xl font-medium text-white/90">提供全球最精准的在线视觉检测系统</p>
              </div>

              <img 
                alt="UnitX Logo Background" 
                className="w-full h-full object-cover opacity-40 blur-[2px]" 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              />
              
              {/* Video Player Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button className="text-white hover:text-primary transition-colors">
                        <Play size={24} fill="currentColor" />
                      </button>
                      <div className="flex items-center gap-4 text-[10px] font-mono text-white/60">
                        <span className="text-white">04:22</span>
                        <div className="w-[1px] h-3 bg-white/20" />
                        <span>12:45</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute h-full w-[35%] bg-primary rounded-full shadow-[0_0_10px_rgba(160,192,255,0.5)]" />
                    <div className="absolute left-[35%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full ring-2 ring-primary shadow-xl" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
