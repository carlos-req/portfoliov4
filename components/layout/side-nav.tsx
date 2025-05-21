"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Briefcase,
  Users,
  FileText,
  User,
  Menu,
  X,
  Github,
  Linkedin,
  Youtube,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavLinkProps {
  item: NavItem;
  isCollapsed: boolean;
}

interface SocialLinkProps {
  item: NavItem;
}

const SideNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close sidebar when screen is resized to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "About", href: "/about", icon: User },
  ];

  const socialLinks: NavItem[] = [
    { name: "GitHub", href: "https://github.com/carlos-req", icon: Github },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/carlosjrequena",
      icon: Linkedin,
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@dragocodesyt",
      icon: Youtube,
    },
  ];

  const NavLink: React.FC<NavLinkProps> = ({ item, isCollapsed }) => {
    const isActive = pathname === item.href;

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent/80",
                isActive
                  ? "bg-accent text-accent-background"
                  : "text-muted-foreground hover:text-foreground",
                isCollapsed && "justify-center px-0"
              )}
            >
              <item.icon size={18} />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">{item.name}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  const SocialLink: React.FC<SocialLinkProps> = ({ item }) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={item.name}
          >
            <item.icon size={18} />
          </a>
        </TooltipTrigger>
        <TooltipContent side={isCollapsed ? "right" : "bottom"}>
          {item.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Desktop collapse toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 z-50 hidden md:flex hover:bg-accent"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeftOpen size={20} />
        ) : (
          <PanelLeftClose size={20} />
        )}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r bg-card transition-all duration-300 ease-in-out md:translate-x-0",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-8">
            {/* Logo and Profile */}
            <div
              className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "space-x-2 px-2"
              )}
            >
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <Image
                        src="/images/prof_pic.jpeg"
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">Carlos Requena</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              {!isCollapsed && (
                <>
                  <span className="text-2xl font-bold">Carlos R.</span>
                  <ModeToggle />
                </>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <Separator />
            <div
              className={cn(
                "flex",
                isCollapsed
                  ? "flex-col items-center space-y-4"
                  : "justify-around"
              )}
            >
              {socialLinks.map((item) => (
                <SocialLink key={item.name} item={item} />
              ))}
            </div>
            {!isCollapsed && (
              <p className="text-xs text-center text-muted-foreground">
                © {new Date().getFullYear()} Portfolio
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
