import { useState } from "react";
import { Instagram, Linkedin, Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const footerLinks = {
  services: {
    title: "Our Services",
    links: [
      { label: "Website Lunch", href: "#" },
      { label: "Website Designing", href: "#" },
      { label: "Digital Branding", href: "#" },
      { label: "Ads Management", href: "#" },
    ],
  },
  products: {
    title: "Our Policies",
    links: [
      { label: "About US", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  portfolio: {
    title: "Portfolio",
    links: [
      { label: "Shopify Stores", href: "#portfolio" },
      { label: "WooCommerce Stores", href: "#portfolio" },
    ],
  },
  policies: {
    title: "Our Products",
    links: [
      { label: "Shopify Themes", href: "#" },
      { label: "Custom Templates", href: "#" },
      
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "Linkedin" },
  { icon: Mail, href: "#", label: "Instagram 3" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "You'll receive updates about new products and freebies.",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.services.title}</h3>
            <ul className="space-y-3">
              {footerLinks.services.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.products.title}</h3>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.portfolio.title}</h3>
            <ul className="space-y-3">
              {footerLinks.portfolio.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{footerLinks.policies.title}</h3>
            <ul className="space-y-3">
              {footerLinks.policies.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className="col-span-2 md:col-span-1 flex md:justify-end">
            <span className="text-4xl md:text-5xl lg:text-6xl font-display font-normal">
              Storekriti
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8 md:my-10" />

        {/* Newsletter & Social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-3">
            <Input
              type="email"
              placeholder="mailbox@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-48 md:w-56 bg-transparent border-background/30 text-background placeholder:text-background/40 rounded-lg h-10"
            />
            <Button
              type="submit"
              className="bg-background text-foreground hover:bg-background/90 rounded-lg px-6 h-10"
            >
              Subscribe
            </Button>
            <p className="hidden lg:block text-sm text-background/60 max-w-xs">
              No spam, notifications only about new products, updates and freebies. You can always unsubscribe.
            </p>
          </form>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-background/30 hover:bg-background hover:text-foreground flex items-center justify-center transition-all duration-300"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Newsletter Description */}
        <p className="lg:hidden text-sm text-background/60 mt-4">
          No spam, notifications only about new products, updates and freebies. You can always unsubscribe.
        </p>

        {/* Divider */}
        <div className="border-t border-background/20 my-8 md:my-10" />

        {/* Copyright */}
        <p className="text-sm text-background/60">
          © Copyright {new Date().getFullYear()} Storekriti – Premium D2C Website Developers
        </p>
      </div>
    </footer>
  );
}
