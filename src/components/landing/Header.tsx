import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, Home, Briefcase, Image, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setIsVisible(false);
      setMobileMenuOpen(false);
    } else {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsPastHero(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "What We Do?", icon: Home, id: "what-we-do" },
    { label: "Portfolio", icon: Briefcase, id: "portfolio" },
    { label: "Testimonials", icon: Image, id: "testimonials" },
    { label: "Plans", icon: CreditCard, id: "pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -100 
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-foreground"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-display font-normal text-background">
              Storekriti
            </span>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={scrollToApply}
              variant="outline"
              className="rounded-full px-5 text-sm border-background/30 text-background bg-transparent hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Book a Call
            </Button>
            <Button
              onClick={scrollToApply}
              variant="outline"
              className="rounded-full px-5 text-sm border-background text-background bg-transparent hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Get Help on Whatsapp
            </Button>
          </div>

          {/* Mobile: Burger or Apply button based on scroll position */}
          <div className="md:hidden">
            {isPastHero ? (
              <Button
                onClick={scrollToApply}
                className="bg-background text-foreground hover:bg-background/90 rounded-full px-4 text-sm"
              >
                Apply for Launch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-background hover:bg-background/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: mobileMenuOpen && isVisible ? 1 : 0,
          y: mobileMenuOpen && isVisible ? 0 : -10,
          pointerEvents: mobileMenuOpen && isVisible ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-[57px] left-0 right-0 z-40 md:hidden bg-foreground border-b border-background/10 shadow-xl"
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)} 
              className="flex items-center gap-3 text-left py-3 px-4 text-background hover:bg-background/10 rounded-xl transition-colors duration-200"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
          <div className="pt-2 space-y-2">
            <Button
              onClick={scrollToApply}
              variant="outline"
              className="w-full rounded-full py-3 text-sm border-background/30 text-background bg-transparent hover:bg-background hover:text-foreground"
            >
              Book a Call
            </Button>
            <Button
              onClick={scrollToApply}
              className="w-full bg-background text-foreground hover:bg-background/90 rounded-full py-3 text-sm"
            >
              Apply for Launch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
