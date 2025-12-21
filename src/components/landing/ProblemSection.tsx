import { motion, useInView } from "framer-motion";
import { Eye, ShoppingCart, Link2, Users, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const problems = [
  {
    icon: Eye,
    number: "01",
    title: "Beautiful but useless",
    description:
      "Websites that look good but fail to convert visitors into paying customers.",
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "Poor checkout flow",
    description:
      "Slow performance and confusing checkout process that kills your conversions.",
  },
  {
    icon: Link2,
    number: "03",
    title: "No integrations",
    description:
      "Missing essential payment gateways, shipping solutions, and third-party tools.",
  },
  {
    icon: Users,
    number: "04",
    title: "No proven system",
    description:
      "Built by freelancers without a structured, results-driven process in place.",
  },
];

const stats = [
  { value: 70, suffix: "%", label: "of visitors leave in 3 seconds" },
  { value: 68, suffix: "%", label: "abandonment cart rate" },
  { value: 88, suffix: "%", label: "won't return after bad UX" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground"
    >
      {count}
      {suffix}
    </span>
  );
}

export function ProblemSection() {
  return (
    <section className="px-4 sm:px-6 py-20 md:py-28 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 mb-5 md:mb-6 text-sm font-medium bg-background text-foreground rounded-full border border-border">
            The Biggest Problem for Brand Owners
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal text-foreground leading-tight">
           Why most websites are unable to sell online{" "}
            
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center p-4 sm:p-6"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-10 md:mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <div className="h-full bg-card border border-border/60 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-medium text-foreground mb-2">
                    <span className="text-primary">
                      {problem.number}
                    </span>{" "}
                    — {problem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plus line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-muted-foreground inline-block bg-card/50 px-6 py-3 rounded-full border border-border/40">
            <span className="font-medium text-foreground">Plus:</span>{" "}
            Outdated designs, no mobile optimization, slow loading speeds, and
            zero SEO foundation.
          </p>
        </motion.div>

        {/* ✅ BLACK RECTANGULAR CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex justify-center mt-8"
        >
          <Button
            className="
              h-12
              px-8
              rounded-xl
              bg-foreground
              text-background
              hover:bg-foreground/90
              text-[15px]
              font-semibold
              flex items-center gap-2
            "
          >
            Book a call to fix these problems
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
