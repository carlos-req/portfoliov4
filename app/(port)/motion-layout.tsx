"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function MotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      className="flex-1 overflow-y-auto px-4 py-6 md:py-16 md:px-8 md:ml-64 transition-all duration-300"
      key={pathname}
      initial={{
        opacity: 0,
        scale: 0.98,
        y: 32,
        filter: "blur(6px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        y: 16,
        filter: "blur(4px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        delay: 0.1,
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
}
