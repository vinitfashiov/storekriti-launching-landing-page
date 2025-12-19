import { motion } from "framer-motion";
import { Check, X, Sparkles, Ban } from "lucide-react";
const goodFit = ["New D2C brands ready to launch", "Shopify or WooCommerce platform", "Ready to invest ₹25k+", "Focused on long-term growth"];
const notFit = ["Budget below ₹25k", "Looking for cheap or quick websites", "No clarity on products or brand", "Expecting sales without marketing effort"];
export function FitSection() {
  return <section id="what-we-do" className="px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 mb-6 text-xs sm:text-sm font-medium bg-secondary text-foreground rounded-full border border-border">
            Who We Work With
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground">
            This is <span className="italic">not</span> for everyone.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Good Fit Card */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="group">
            <div className="relative h-full bg-card border border-green-200/60 p-6 sm:p-8 transition-all duration-300 hover:shadow-green-500/10 hover:border-green-300/80 overflow-hidden rounded-md shadow-sm">
              {/* Subtle gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 border border-green-200">
                    <Sparkles className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display text-foreground">Good Fit</h3>
                    <p className="text-sm text-green-600 font-medium">We'd love to work with you</p>
                  </div>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {goodFit.map((item, index) => <motion.li key={index} initial={{
                  opacity: 0,
                  x: -10
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.1
                }} className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </span>
                      <span className="text-base sm:text-lg text-foreground/80">{item}</span>
                    </motion.li>)}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Not a Fit Card */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="group">
            <div className="relative h-full bg-card border border-red-200/60 p-6 sm:p-8 transition-all duration-300 hover:shadow-red-500/10 hover:border-red-300/80 overflow-hidden rounded-md shadow-sm">
              {/* Subtle gradient background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100 border border-red-200">
                    <Ban className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display text-foreground">Not a Fit</h3>
                    <p className="text-sm text-red-600 font-medium">We're not the right choice</p>
                  </div>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {notFit.map((item, index) => <motion.li key={index} initial={{
                  opacity: 0,
                  x: -10
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1
                }} className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100">
                        <X className="h-4 w-4 text-red-600" />
                      </span>
                      <span className="text-base sm:text-lg text-foreground/80">{item}</span>
                    </motion.li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}