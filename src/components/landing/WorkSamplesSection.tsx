import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

import store1 from "@/assets/portfolio/store-1.png";
import store2 from "@/assets/portfolio/store-2.png";
import store3 from "@/assets/portfolio/store-3.png";
import store4 from "@/assets/portfolio/store-4.png";
import store5 from "@/assets/portfolio/store-5.png";
import store6 from "@/assets/portfolio/store-6.png";
import store7 from "@/assets/portfolio/store-7.png";
import store8 from "@/assets/portfolio/store-8.png";
import store9 from "@/assets/portfolio/store-9.png";
import store10 from "@/assets/portfolio/store-10.png";

const storeImages = [
  store1, store2, store3, store4, store5,
  store6, store7, store8, store9, store10,
];

const MovingRow = ({ 
  images, 
  duration = 40 
}: { 
  images: string[]; 
  duration?: number;
}) => {
  const duplicatedImages = [...images, ...images, ...images];
  
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-[215px] h-[382px] rounded-lg overflow-hidden shadow-sm"
          >
            <img 
              src={img} 
              alt={`Store ${(index % 10) + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export function WorkSamplesSection() {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile Header */}
        <div className="md:hidden mb-8">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-background text-foreground rounded-full border border-foreground">
            A Glimpse Of Our Work
          </span>
          <h2 className="text-3xl font-display font-normal text-foreground mb-4 leading-tight">
            A few sucessful stores<br />
            <span className="italic">developed by us</span>
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 gap-2 text-sm">
              View Full Portfolio <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-10 w-10">
              <Briefcase className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Join 600+ brands that trust Jhango for their eCommerce success. From innovative design to seamless performance, we deliver results that elevate businesses in today's competitive market.
          </p>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex md:items-start md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-background text-foreground rounded-full border border-foreground">
              A Glimpse Of Our Work
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-display font-normal text-foreground mb-4 leading-tight">
              A few sucessful stores<br />
              <span className="italic">developed by us</span>
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl">
              Join 600+ brands that trust Jhango for their eCommerce success. From innovative design to seamless performance, we deliver results that elevate businesses in today's competitive market.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 gap-2">
              View Full Portfolio <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-10 w-10">
              <Briefcase className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Single Scrolling Row */}
      <div className="mt-8">
        <MovingRow images={storeImages} duration={35} />
      </div>
    </section>
  );
}
