import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Building, User, Lock, X, Verified, Users, TrendingUp, MessageSquare, Briefcase } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const mode = searchParams.get("mode") || "login";
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    if (!email) {
      setError("请输入账号");
      return;
    }
    const result = await login(email);
    if (result.success) {
      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/courses");
      }
    } else {
      setError("登录失败");
    }
  };

  const toggleMode = (newIsLogin: boolean) => {
    setIsLogin(newIsLogin);
    navigate(`/auth?mode=${newIsLogin ? "login" : "register"}`, { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-low w-full max-w-[1000px] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[640px] border border-white/5"
      >
        {/* Left Side: Visual/Context */}
        <div className="w-full md:w-5/12 bg-[#0a0a0c] relative overflow-hidden flex flex-col justify-between p-12 text-white border-r border-white/5">
          <div className="z-10">
            <h2 className="text-4xl font-bold mb-4 font-display tracking-tight">UnitX</h2>
            <div className="h-1 w-12 bg-primary mb-6" />
            <p className="text-xl text-on-surface-variant leading-relaxed">
              重塑企业级<br />知识传递与人才成长
            </p>
          </div>

          <div className="z-10 space-y-8">
            {[
              { icon: Verified, text: "权威机构认证课程" },
              { icon: Users, text: "500+ 顶尖企业合作伙伴" },
              { icon: TrendingUp, text: "定制化人才培养方案" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Background Decorative Overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full translate-x-1/2" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-12 flex flex-col relative bg-black">
          <button 
            onClick={() => navigate("/")}
            className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex-grow flex flex-col justify-center max-w-[420px] mx-auto w-full pt-8">
            <div className="mb-10">
              <h1 className="text-3xl font-black font-display tracking-tighter text-white mb-2 italic uppercase">UNITX 学院</h1>
              <p className="text-sm text-on-surface-variant font-medium tracking-wide">
                企业级架构实战教程 · 随时随地，直接开启学习
              </p>
            </div>
            {/* Tabs */}
            <div className="flex gap-4 p-1 bg-white/5 rounded-xl mb-12">
              <button 
                onClick={() => toggleMode(true)}
                className={cn(
                  "flex-1 py-3 text-sm font-black tracking-widest uppercase transition-all rounded-lg",
                  isLogin ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:text-white"
                )}
              >
                登录
              </button>
              <button 
                onClick={() => toggleMode(false)}
                className={cn(
                  "flex-1 py-3 text-sm font-black tracking-widest uppercase transition-all rounded-lg",
                  !isLogin ? "bg-white/10 text-white shadow-xl" : "text-white/40 hover:text-white"
                )}
              >
                注册
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div 
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-on-surface-variant tracking-[0.2em] uppercase">账号 (Email)</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="email" 
                        placeholder="请输入您的邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-white placeholder:text-white/20"
                      />
                    </div>
                    {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
                  </div>
                  <button 
                    onClick={handleAuth}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold border border-primary hover:bg-transparent hover:text-primary active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(160,192,255,0.2)]"
                  >
                    完成登录
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-5">
                    {[
                      { label: "公司名称", icon: Building, placeholder: "您的企业或工作室名称" },
                      { label: "姓名", icon: User, placeholder: "您的真实姓名" },
                      { label: "手机号", icon: Phone, placeholder: "请输入您的手机号" }
                    ].map((field, idx) => (
                      <div key={idx} className="space-y-2.5">
                        <label className="text-[10px] font-black text-on-surface-variant tracking-[0.2em] uppercase">{field.label}</label>
                        <div className="relative">
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                          <input 
                            type="text" 
                            placeholder={field.placeholder}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-white placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={handleAuth}
                    className="w-full bg-primary text-black py-4 rounded-xl font-bold border border-primary hover:bg-transparent hover:text-primary active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(160,192,255,0.2)]"
                  >
                    立即注册
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Terms */}
          <div className="mt-12 text-center text-on-surface-variant font-medium">
            <p className="text-[11px] leading-relaxed">
              登录即代表您同意我们的 
              <a href="#" className="text-primary hover:underline mx-1">服务协议</a> 和 
              <a href="#" className="text-primary hover:underline">隐私政策</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
