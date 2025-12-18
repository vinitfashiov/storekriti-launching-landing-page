import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const leftFeatures = [
  {
    title: "High Converting Branded Store",
    description: "We create a custom-branded, conversion-optimized store designed for maximum sales and engagement."
  },
  {
    title: "Free Paid Premium Themes",
    description: "Get access to premium Shopify themes at no extra cost, ensuring a sleek, high-converting design."
  },
  {
    title: "End-to-End Store Development",
    description: "We handle everything from store setup, design, and customization to ensure a fully functional Shopify store."
  }
];

const rightFeatures = [
  {
    title: "50 Product Listings",
    description: "We list up to 50 products with optimized descriptions, images, and SEO-friendly content for better discoverability."
  },
  {
    title: "Conversion-Focused Store Setup",
    description: "Implement strategies like upsells, abandoned cart recovery, and trust badges to boost conversions."
  },
  {
    title: "Ongoing Support & Consultation",
    description: "Get free e-commerce consultation and expert support for seamless store management."
  },
  {
    title: "Advanced Marketing Automation",
    description: "Implement email automation, retargeting ads, and conversion tracking for long-term sales growth."
  },
  {
    title: "3 Months Free Shopify Basic Plan",
    description: "Launch your store with a free Shopify Basic plan for 3 months, saving costs while you grow."
  }
];

export function PricingSection() {
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="px-4 sm:px-6 py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-xs sm:text-sm font-medium bg-foreground text-background rounded-full">
            Find The Best Shopify Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-3 md:mb-4">
            Simple Pricing, <span className="font-semibold">Maximum Value</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">
            Get everything you need in one simple, all-inclusive plan—no extra fees, no surprises.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-8"
          >
            <div className="space-y-6">
              {leftFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-foreground/30 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Options */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium border border-border rounded-full mb-3">
                    Shopify Store
                  </span>
                  <p className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
                    ₹24,999
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Delivery within 2 weeks
                  </p>
                </div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 text-xs font-medium border border-border rounded-full mb-3">
                    A+ Listing
                  </span>
                  <p className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
                    ₹4,999
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Delivery in 3 days per A+ listing
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <p className="mt-8 text-xs sm:text-sm text-muted-foreground">
              We are a team of experienced professionals dedicated to helping businesses grow their online presence
            </p>
          </motion.div>

          {/* Right Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 sm:space-y-8">
              {rightFeatures.map((feature, index) => (
                <div key={index}>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-border">
              <Button
                onClick={() => window.open("https://wa.me/your-number", "_blank")}
                variant="outline"
                className="rounded-full px-6 py-6 text-sm border-border hover:bg-secondary flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Get Help on Whatsapp
              </Button>
              <Button
                onClick={scrollToApply}
                className="rounded-full px-6 py-6 text-sm bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
              >
                Book a Call
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
