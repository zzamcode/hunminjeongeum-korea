import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "원리", id: "principles" },
  { label: "글자", id: "letters" },
  { label: "조합", id: "combine" },
  { label: "철학", id: "philosophy" },
];

const moreItems = [
  { label: "한글 글자 마당", path: "/posters" },
  { label: "한글의 역사", path: "/history" },
  { label: "한글날", path: "/hangulday" },
  { label: "한글을 빛낸 말들", path: "/quotes" },
  { label: "한글 소식", path: "/news" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold text-foreground tracking-widest"
        >
          훈민정음
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {isHome &&
            navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-sm tracking-widest text-muted-foreground hover:text-vermillion transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}

          {/* More dropdown */}
          <li className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="text-sm tracking-widest text-muted-foreground hover:text-vermillion transition-colors flex items-center gap-1"
            >
              더 알아보기
              <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 bg-background/95 backdrop-blur-md border border-border rounded-sm shadow-lg min-w-[10rem] py-2"
                >
                  {moreItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-vermillion hover:bg-muted/50 transition-colors tracking-wider"
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="메뉴"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {isHome &&
                navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="text-sm tracking-widest text-muted-foreground hover:text-vermillion transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}

              <li className="w-16 h-px bg-border" />

              {moreItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm tracking-widest text-muted-foreground hover:text-vermillion transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
