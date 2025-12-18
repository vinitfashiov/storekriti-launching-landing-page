import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ArrowRight, Loader2, X } from "lucide-react";

export function ApplicationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    businessType: "",
    budget: "",
    timeline: "",
    reason: "",
  });

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("popupShown");
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("popupShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ✅ Map popup form fields to DB column names (same as page form)
      const payload = {
        name: formData.name.trim(),
        whatsapp: formData.whatsapp.trim(),
        business_type: formData.businessType.trim(),
        budget_range: formData.budget || null,
        start_timeline: formData.timeline || null,
        motivation: formData.reason.trim(),
        source: "popup",
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
        throw new Error(msg);
      }

      toast({
        title: "Application Submitted",
        description:
          "We'll review your application and get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        whatsapp: "",
        businessType: "",
        budget: "",
        timeline: "",
        reason: "",
      });

      // Close popup on success
      setIsOpen(false);
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Blurry Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="text-center mb-5">
                <span className="inline-block px-3 py-1.5 mb-3 text-xs font-medium bg-secondary text-foreground rounded-full border border-border">
                  Limited Slots Available
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-normal text-foreground mb-1">
                  Apply to <span className="italic">work with us</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Get your D2C store launched in just 7 days.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="popup-name"
                      className="text-xs font-medium text-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      id="popup-name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white text-black border border-gray-300 focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="popup-whatsapp"
                      className="text-xs font-medium text-foreground"
                    >
                      WhatsApp Number
                    </Label>
                    <Input
                      id="popup-whatsapp"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      required
                      className="bg-white text-black border border-gray-300 focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="popup-businessType"
                    className="text-xs font-medium text-foreground"
                  >
                    Business Type
                  </Label>
                  <Input
                    id="popup-businessType"
                    placeholder="e.g., Fashion, Beauty, Food, etc."
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({ ...formData, businessType: e.target.value })
                    }
                    required
                    className="bg-white text-black border border-gray-300 focus:border-black"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="popup-budget"
                      className="text-xs font-medium text-foreground"
                    >
                      Budget Range
                    </Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) =>
                        setFormData({ ...formData, budget: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-white text-black border border-gray-300 focus:border-black">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border rounded-xl z-[110]">
                        <SelectItem value="25k-40k">
                          ₹25,000 - ₹40,000
                        </SelectItem>
                        <SelectItem value="40k-60k">
                          ₹40,000 - ₹60,000
                        </SelectItem>
                        <SelectItem value="60k+">₹60,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="popup-timeline"
                      className="text-xs font-medium text-foreground"
                    >
                      When to start?
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        setFormData({ ...formData, timeline: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-white text-black border border-gray-300 focus:border-black">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border rounded-xl z-[110]">
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="1-2-weeks">
                          Within 1-2 weeks
                        </SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="popup-reason"
                    className="text-xs font-medium text-foreground"
                  >
                    Why do you want to build this store now?
                  </Label>
                  <Textarea
                    id="popup-reason"
                    placeholder="Tell us about your motivation and goals..."
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    required
                    className="bg-white text-black border border-gray-300 focus:border-black"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all duration-300 mt-1"
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

                <p className="text-center text-[10px] text-muted-foreground">
                  By submitting, you agree to be contacted via WhatsApp.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
