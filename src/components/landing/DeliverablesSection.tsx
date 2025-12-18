import { motion } from "framer-motion";
import { Package, CreditCard, Truck, MessageCircle, Zap, Headphones } from "lucide-react";

const deliverables = [
  { icon: Package, title: "Premium homepage & product pages", description: "Custom designed for your brand" },
  { icon: CreditCard, title: "Ready-to-collect payments", description: "Razorpay, PayU, or your preferred gateway" },
  { icon: Truck, title: "Pan-India delivery ready", description: "Shiprocket, Delhivery & more" },
  { icon: MessageCircle, title: "Direct customer communication", description: "Automated WhatsApp order confirmations" },
  { icon: Zap, title: "Fast, scalable storefront", description: "Speed optimized, search-ready store" },
  { icon: Headphones, title: "7-day post-launch support", description: "Bug fixes and minor tweaks included" },
];

export function DeliverablesSection() {
  return (
    <section className="px-4 sm:px-6 py-20 md:py-28 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 mb-5 md:mb-6 text-sm font-medium bg-background text-foreground rounded-full border border-border">
            Deliverables
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal text-foreground">
            What <span className="italic">you get</span>
          </h2>
        </motion.div>

        {/* 2x3 Grid matching problem section style */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-10 md:mb-12">
          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full bg-card border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  {/* Icon Box */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg font-display text-foreground mb-1 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plus line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm sm:text-base text-muted-foreground"
        >
          <span className="font-medium text-foreground">Plus:</span> Analytics dashboard setup, basic SEO, and mobile-first responsive design.
        </motion.p>
      </div>
    </section>
  );
}
