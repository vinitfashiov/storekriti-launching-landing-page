import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, Clock, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const formBenefits = [
  { icon: Clock, text: "Response within 24 hours" },
  { icon: MessageCircle, text: "Direct founder communication" },
];

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    businessType: "",
    budget: "",
    timeline: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        whatsapp: formData.whatsapp.trim(),
        business_type: formData.businessType.trim(),
        budget_range: formData.budget || null,
        start_timeline: formData.timeline || null,
        motivation: formData.reason.trim(),
        source: "page",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          (data && (data.message || data.error)) ||
          "Failed to submit. Please try again.";
        trackEvent("lead_submit_failed", { source: "page", message: msg });
        throw new Error(msg);
      }

      toast({
        title: "Application Submitted",
        description:
          "We'll review your application and get back to you within 24 hours.",
      });

      trackEvent("lead_submit_success", {
        source: "page",
        budget_range: payload.budget_range,
        start_timeline: payload.start_timeline,
      });

      setFormData({
        name: "",
        whatsapp: "",
        businessType: "",
        budget: "",
        timeline: "",
        reason: "",
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message || "Something went wrong. Please try again.",
      });

      trackEvent("lead_submit_failed", {
        source: "page",
        message: err?.message || "unknown",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className="px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 md:mb-6 text-xs sm:text-sm font-medium bg-secondary text-foreground rounded-full border border-border">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-3 md:mb-4">
            Let’s build your Website
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Fill this form. We’ll contact you within 24 hours.
          </p>
        </motion.div>

        {/* Form Benefits (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 md:mb-8"
        >
          {formBenefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <benefit.icon className="h-4 w-4 text-foreground/60" />
              <span>{benefit.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-border/50 via-border/20 to-transparent rounded-3xl blur-sm" />

          <div className="relative space-y-4 sm:space-y-5 bg-card border border-border/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-foreground/5">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-[15px] sm:text-base font-medium">
                  Your Name
                </Label>
                <Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="
                    bg-background border-border/60 rounded-xl
                    h-11 sm:h-12
                    text-[15px] sm:text-base
                    placeholder:text-sm
                  "
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label className="text-[15px] sm:text-base font-medium">
                  WhatsApp Number
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  required
                  className="
                    bg-background border-border/60 rounded-xl
                    h-11 sm:h-12
                    text-[15px] sm:text-base
                    placeholder:text-sm
                  "
                />
              </div>
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label className="text-[15px] sm:text-base font-medium">
                Business Type
              </Label>
              <Input
                placeholder="e.g., Fashion, Beauty, Food, etc."
                value={formData.businessType}
                onChange={(e) =>
                  setFormData({ ...formData, businessType: e.target.value })
                }
                required
                className="
                  bg-background border-border/60 rounded-xl
                  h-11 sm:h-12
                  text-[15px] sm:text-base
                  placeholder:text-sm
                "
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Budget */}
              <div className="space-y-2">
                <Label className="text-[15px] sm:text-base font-medium">
                  Budget Range
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) =>
                    setFormData({ ...formData, budget: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border/60 rounded-xl h-11 sm:h-12 text-[15px] sm:text-base">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25k-40k">₹25,000 - ₹40,000</SelectItem>
                    <SelectItem value="40k-60k">₹40,000 - ₹60,000</SelectItem>
                    <SelectItem value="60k+">₹60,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <Label className="text-[15px] sm:text-base font-medium">
                  When to start?
                </Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeline: value })
                  }
                >
                  <SelectTrigger className="bg-background border-border/60 rounded-xl h-11 sm:h-12 text-[15px] sm:text-base">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="1-2-weeks">Within 1-2 weeks</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label className="text-[15px] sm:text-base font-medium">
                Why do you want to build this store now?
              </Label>
              <Textarea
                placeholder="Tell us about your motivation and goals..."
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                required
                className="
                  bg-background border-border/60 rounded-xl
                  min-h-[100px] sm:min-h-[120px]
                  text-[15px] sm:text-base
                  placeholder:text-sm
                  resize-none
                "
              />
            </div>

            {/* ✅ RECTANGULAR SUBMIT BUTTON */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full h-11
                    text-[14px] sm:text-[15px]
                    font-semibold
                    bg-foreground text-background hover:bg-foreground/90
                    rounded-xl
                    mt-1
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

            {/* Note */}
            <p className="text-center text-[13px] sm:text-sm text-muted-foreground pt-2">
              By submitting, you agree to be contacted via WhatsApp.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
