import { motion } from "framer-motion";
import { Shield, Award, Clock, Users, CheckCircle2, Star, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { number: "100+", label: "Brands Launched", icon: CheckCircle2, accent: "from-green-500/20 to-green-500/5" },
  { number: "7", label: "Day Rapid Delivery", icon: Clock, accent: "from-blue-500/20 to-blue-500/5" },
  { number: "₹25L+", label: "GMV Generated", icon: Award, accent: "from-amber-500/20 to-amber-500/5" },
  {
  number: "4.8 ★",
  label: "Client Rating on Us",
  icon: Star,
  accent: "from-purple-400/20 to-purple-400/5",
},
];

const trustPoints = [
  {
    icon: Zap,
    title: "Speed That Delivers",
    description: "While others take weeks, we launch in 7 days. No compromises on quality.",
    highlight: "7 Days",
  },
  {
    icon: Shield,
    title: "Proven Framework",
    description: "Our launch system has been refined across 100+ successful D2C brand builds.",
    highlight: "50+ Brands",
  },
  {
    icon: Users,
    title: "Direct Access",
    description: "WhatsApp access to your project lead. No middlemen, no delays.",
    highlight: "24/7 Support",
  },
];

export function TrustSection() {
  return (
    <section className="px-4 sm:px-6 py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2.5 mb-6 text-sm font-semibold bg-background text-foreground rounded-full"
          >
            Why Brands Trust Us
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-5">
            Built for <span className="italic">serious</span> founders
          </h2>
          <p className="text-lg sm:text-xl text-background/70 max-w-xl mx-auto">
            We work with brands committed to building something exceptional.
          </p>
        </motion.div>

        {/* Stats - Large Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 md:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${stat.accent} border border-background/10 backdrop-blur-sm transition-all duration-300 hover:border-background/20 hover:scale-[1.02]`}>
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-background/50 mb-4" />
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-background mb-2">
                  {stat.number}
                </p>
                <p className="text-sm sm:text-base text-background/60 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Points - Feature Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-background/5 border border-background/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:bg-background/10 hover:border-background/20">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <point.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-background/50 bg-background/10 px-3 py-1.5 rounded-full">
                    {point.highlight}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display mb-3">{point.title}</h3>
                <p className="text-base sm:text-lg text-background/70 leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-base sm:text-lg text-background/60 italic mb-8">
            "We don't work with everyone. We work with brands ready to invest in quality."
          </p>
          <Link to="/comparison">
            <div className="flex justify-center">
  <Button
    variant="outline"
    className="
      h-12 sm:h-[50px]
      px-8
      min-w-[240px]
      rounded-xl
      bg-white
      text-black
      border border-black/30
      hover:bg-white
      font-semibold
      text-[15px] sm:text-[16px]
      flex items-center justify-center gap-2
      transition-none
    "
  >
    See Why We're Different
    <ArrowRight className="h-4 w-4 text-black" />
  </Button>
</div>

          </Link>
        </motion.div>
      </div>
    </section>
  );
}
