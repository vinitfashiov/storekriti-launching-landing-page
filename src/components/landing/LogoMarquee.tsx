import { motion } from "framer-motion";

const brands = [
  "Skincare Co.",
  "Urban Threads",
  "Pure Organics",
  "Craft & Co.",
  "Bloom Beauty",
  "Heritage Foods",
  "Nova Lifestyle",
  "Artisan Home",
];

export const LogoMarquee = () => {
  return (
    <section className="py-8 sm:py-12 border-b border-border/40 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <p className="text-center text-muted-foreground text-xs sm:text-sm tracking-wide uppercase">
          Trusted by growing D2C brands
        </p>
      </div>
      
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 sm:gap-12 md:gap-16 items-center"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-base sm:text-xl md:text-2xl font-serif text-muted-foreground/60 whitespace-nowrap hover:text-foreground transition-colors duration-300"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
