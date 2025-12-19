import { motion } from "framer-motion";
import { Check, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const comparisonData = [
  {
    feature: "Fixed timeline guarantee",
    storekriti: true,
    others: false,
    note: "7 days vs 2-4 weeks average",
  },
  {
    feature: "Conversion-focused design",
    storekriti: true,
    others: false,
    note: "Built for sales, not just aesthetics",
  },
  {
    feature: "Payment gateway integration",
    storekriti: true,
    others: "Extra",
    note: "Razorpay, PayU included in package",
  },
  {
    feature: "Shipping integration",
    storekriti: true,
    others: "Extra",
    note: "Shiprocket, Delhivery setup included",
  },
  {
    feature: "WhatsApp automation",
    storekriti: true,
    others: false,
    note: "Order confirmations & tracking",
  },
  {
    feature: "Speed optimization",
    storekriti: true,
    others: "Rarely",
    note: "Sub-3s load times guaranteed",
  },
  {
    feature: "SEO foundation",
    storekriti: true,
    others: "Basic",
    note: "Meta tags, schema markup, sitemap",
  },
  {
    feature: "Direct founder communication",
    storekriti: true,
    others: false,
    note: "WhatsApp access to project lead",
  },
  {
    feature: "Fixed pricing",
    storekriti: true,
    others: false,
    note: "No hourly billing or surprise costs",
  },
  {
    feature: "Post-launch support",
    storekriti: "7 days",
    others: "Extra cost",
    note: "Bug fixes and minor tweaks included",
  },
];

export default function Comparison() {
  const scrollToApply = () => {
    window.location.href = "/#apply";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link to="/" className="text-xl sm:text-2xl font-display text-foreground">
              Storekriti
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-secondary text-foreground rounded-full border border-border">
              Why Choose Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-normal text-foreground mb-6">
              Storekriti vs <span className="italic">Other Agencies</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              See exactly what makes us different from typical web agencies and freelancers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Desktop Table */}
            <div className="hidden md:block bg-card border border-border/60 rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10">
              {/* Header */}
              <div className="grid grid-cols-3 bg-secondary/50 border-b border-border/60">
                <div className="p-6 text-lg font-display text-foreground">What You Get</div>
                <div className="p-6 text-lg font-display text-foreground text-center bg-foreground/5">Storekriti</div>
                <div className="p-6 text-lg font-display text-muted-foreground text-center">Other Agencies</div>
              </div>

              {/* Rows */}
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 + 0.3 }}
                  className="grid grid-cols-3 border-b border-border/40 last:border-b-0 hover:bg-secondary/30 transition-colors"
                >
                  <div className="p-5">
                    <p className="text-base font-medium text-foreground">{row.feature}</p>
                    <p className="text-sm text-muted-foreground mt-1">{row.note}</p>
                  </div>
                  <div className="p-5 flex items-center justify-center bg-foreground/5">
                    {row.storekriti === true ? (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-foreground">{row.storekriti}</span>
                    )}
                  </div>
                  <div className="p-5 flex items-center justify-center">
                    {row.others === false ? (
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                    ) : row.others === true ? (
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">{row.others}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                  className="bg-card border border-border/60 rounded-2xl p-5 shadow-lg"
                >
                  <h3 className="text-base font-display text-foreground mb-2">{row.feature}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{row.note}</p>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 bg-foreground/5 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Storekriti</p>
                      {row.storekriti === true ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-foreground">{row.storekriti}</span>
                      )}
                    </div>
                    <div className="flex-1 bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-2">Others</p>
                      {row.others === false ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                      ) : row.others === true ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">{row.others}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              Ready to build a store that actually converts?
            </p>
            <Button
              onClick={scrollToApply}
              size="lg"
              className="group px-8 py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-foreground/20 hover:scale-[1.02]"
            >
              Apply for Launch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t border-border/60">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Storekriti • Premium D2C Website Development
          </p>
        </div>
      </footer>
    </div>
  );
}
