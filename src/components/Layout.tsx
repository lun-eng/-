import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, HelpCircle, LogOut } from "lucide-react";
import { NAV_LINKS } from "../constants";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans text-on-surface bg-surface selection:bg-primary/30">
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <nav className="flex justify-between items-center h-20 px-10 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-bold text-white font-display tracking-tight hover:text-white/90">
              UnitX培训平台
            </Link>
            {isLoggedIn && (
              <div className="hidden lg:flex gap-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-all hover:text-white relative py-2",
                      location.pathname === link.href 
                        ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-primary" 
                        : "text-on-surface-variant"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <>
                <button className="text-on-surface-variant hover:text-white transition-colors">
                  <Bell size={22} />
                </button>
                <button className="text-on-surface-variant hover:text-white transition-colors">
                  <HelpCircle size={22} />
                </button>
                <div className="w-[1px] h-6 bg-outline mx-2" />
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors text-sm font-medium"
                >
                  <LogOut size={18} />
                  <span>退出</span>
                </button>
              </>
            )}
            {!isLoggedIn ? (
              <Link 
                to="/auth?mode=login" 
                className="bg-primary text-black px-6 py-2.5 rounded-lg text-sm font-black hover:opacity-90 transition-all shadow-[0_0_20px_rgba(160,192,255,0.2)]"
              >
                登录 / 注册
              </Link>
            ) : (
              <Link 
                to="/courses" 
                className="bg-surface-container-high border border-outline text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-all"
              >
                个人中心
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-8 max-w-[1440px] mx-auto w-full">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-outline text-lg font-display">UnitX</span>
            <p className="text-xs text-outline mt-1 italic">
              © 2024 UnitX 专业能力提升. 保留所有权利。
            </p>
          </div>
          <div className="flex gap-8">
            {["隐私政策", "服务条款", "讲师后台", "帮助中心"].map((item) => (
              <a key={item} href="#" className="text-xs text-outline hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
