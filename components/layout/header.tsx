"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownAZ, ArrowDownAZIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Solutions",
    href: "#",
    submenu: [
      { label: "Residential Solar", href: "/residential" },
      { label: "Commercial Solar", href: "/commercial" },
      { label: "Solar Subsidy", href: "/subsidy" },
    ],
  },
  { label: "Solar Calculator", href: "/solar-calculator" },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "#",
    submenu: [
      { label: "Careers", href: "/careers" },
      { label: "Solar Pro", href: "/solar-pro" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(pathName);
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50  transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="text-xl font-bold flex items-center">
            <Image src={"/nigaran-logo.png"} alt={""} width={50} height={50} />
            <span
              className={cn(
                "ml-2 ",
                !isScrolled && pathName === "/" ? "text-white" : ""
              )}
            >
              Nigaran Solar
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              <Link
                href={item.href}
                className={cn(
                  "text-foreground/80  hover:text-primary transition-colors font-medium",
                  !isScrolled && pathName === "/" ? "text-white" : ""
                )}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="absolute top-full  left-0 mt-2 w-48 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4   py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button
              onClick={() => router.push("/consultation")}
              className="hidden md:inline-flex"
            >
              Get Free Quote
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu
                  className={cn(
                    "h-5 w-5",
                    !isScrolled && pathName === "/" ? "text-white" : ""
                  )}
                />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground py-2 px-4 rounded-md transition-colors block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-8 mt-2 space-y-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="text-foreground/70 hover:text-foreground py-1 px-4 rounded-md transition-colors block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              className="mt-2"
              onClick={() => router.push("/consultation")}
            >
              Get Free Quote
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
