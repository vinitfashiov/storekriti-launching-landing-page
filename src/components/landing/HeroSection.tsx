import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // ✅ Your provided image URL
  const HERO_IMAGE =
    "https://careercounsellingpatna.in/oled.png";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Side */}
          <div className="lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 text-xs sm:text-sm font-medium bg-secondary text-foreground rounded-full border border-border">
                D2C Website Experts
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal tracking-tight text-foreground leading-[1.1] mb-6"
            >
              We build websites that bring orders for You!
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="max-w-xl mb-8"
            >
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                For serious brand owners who want to sell online, not just look
                good. Fixed project pricing. No surprises.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6"
            >
              <Button
                onClick={scrollToApply}
                size="lg"
                className="w-full sm:w-auto group px-8 py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-foreground/20"
              >
                Book a call with Storekriti
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Avg. launch value: ₹20K • Limited monthly slots
              </p>
            </motion.div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-sm text-muted-foreground/70 italic"
            >
              With over 100+ Brands Online • Launched their Website Online
            </motion.p>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-3xl blur-2xl transform scale-105" />

              {/* Browser Mockup Frame */}
              <div className="relative bg-card border border-border/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10">
                {/* Browser Top Bar */}
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/50 border-b border-border/60">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-3 sm:px-4 py-1 bg-background rounded-md text-[10px] sm:text-xs text-muted-foreground">
                      yourbrand.store
                    </div>
                  </div>
                </div>

                {/* ✅ IMAGE */}
                <div className="aspect-[4/3] bg-background p-[2px]">
                  <div className="w-full h-full rounded-xl overflow-hidden relative">

                    <img
                      src={HERO_IMAGE}
                      alt="Website preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-card border border-border/60 rounded-xl p-3 sm:p-4 shadow-xl shadow-foreground/10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-base sm:text-lg">
                      ✓
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      Website is Live
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Ready to accept orders
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
