import { motion } from "framer-motion";
import { Phone } from "lucide-react";
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
  duration = 40,
}: {
  images: string[];
  duration?: number;
}) => {
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
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
  const scrollToApply = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* CENTERED HEADER (Mobile + Desktop) */}
        <div className="mb-12 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-background text-foreground rounded-full border border-foreground">
            A Glimpse Of Our Work
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-normal text-foreground mb-4 leading-tight">
            A few successful stores <br />
            <span className="font-display font-normal text-foreground">
              developed by Storekriti
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl">
            Join 600+ brands that trust Jhango for their eCommerce success.
            From innovative design to seamless performance.
          </p>
        </div>
      </div>

      {/* Scrolling Images */}
      <div className="mt-8">
        <MovingRow images={storeImages} duration={35} />
      </div>

      {/* CTA Button BELOW images */}
      <div className="mt-12 flex justify-center px-4">
        <Button
          onClick={scrollToApply}
          className="
            h-12 sm:h-[50px]
            min-w-[260px] sm:min-w-[300px]
            px-8
            rounded-xl
            bg-[#2b2b2b]
            text-white
            border border-[#1f1f1f]
            hover:bg-[#2b2b2b]
            font-semibold
            text-[16px]
            flex items-center justify-center gap-3
            whitespace-nowrap
          "
        >
          <Phone className="h-5 w-5 text-white" />
          Book a Call
        </Button>
      </div>
    </section>
  );
}
