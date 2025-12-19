import { motion } from "framer-motion";

const steps = [
  { 
    day: "Day 1", 
    title: "Brand & Goals Discovery", 
    description: "Deep dive into your brand vision, target audience, and business objectives. Understanding what makes your brand unique." 
  },
  { 
    day: "Day 2", 
    title: "UI/UX Structure", 
    description: "Wireframes and visual design that converts. Layout planning, user flow optimization, and conversion-focused structure." 
  },
  { 
    day: "Day 3", 
    title: "Store Development", 
    description: "Building your store with clean, fast code. Shopify or WooCommerce setup, theme customization, and core functionality." 
  },
  { 
    day: "Day 4", 
    title: "Payments & Shipping", 
    description: "Razorpay, Shiprocket, and other integrations. Payment gateway setup, shipping rules, and checkout optimization." 
  },
  { 
    day: "Day 5", 
    title: "WhatsApp & Automation", 
    description: "Order notifications and customer communication. Automated order confirmations, tracking updates, and support flows." 
  },
  { 
    day: "Day 6", 
    title: "Testing & Optimization", 
    description: "Speed optimization and cross-device testing. Performance tuning, mobile responsiveness, and bug fixes." 
  },
  { 
    day: "Day 7", 
    title: "Launch", 
    description: "Your store goes live and starts selling. Final review, DNS setup, and launch support." 
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="px-4 sm:px-6 py-20 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
            The 7-Day Launch System
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            A proven framework refined across 50+ D2C builds. Here's exactly what happens each day.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 sm:pl-10 pb-10 sm:pb-12 last:pb-0"
            >
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[7px] sm:left-[9px] top-5 bottom-0 w-[2px] bg-border" />
              )}
              
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-foreground" />
              
              {/* Content */}
              <div>
                <p className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  {step.day}
                </p>
                <h3 className="text-lg sm:text-xl font-medium text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm text-muted-foreground text-center mt-10 sm:mt-12"
        >
          <span className="font-medium">Note:</span> Timeline may vary slightly based on project complexity and revisions.
        </motion.p>
      </div>
    </section>
  );
}
