import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import FeaturedProjects from "@/components/home/featured-projects";
import { techStack } from "@/data/index.js";
import Image from "next/image";
import LatestPosts from "@/components/home/latest-posts";

export default function Home() {
  return (
    <div className="space-y-16 max-w-5xl mx-auto mt-4 md:mt-0">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row md:items-center justify-between py-8 md:py-20 gap-8">
        <div className="space-y-4 md:w-2/3">
          <Badge variant="outline" className="px-3 py-1">
            Full Stack Developer
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Crafting digital <span className="text-primary">experiences</span>{" "}
            with code
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
            I build modern, responsive websites and web applications with a
            focus on clean design and optimal user experience.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="./images/resume.pdf" target="_blank">
                Download Resume <Download className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:w-1/3 aspect-square bg-muted rounded-2xl overflow-hidden border shadow-md bg-gradient-to-br from-background to-muted">
          <div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground">
            <Image
              src="/images/prof_pic.jpeg"
              alt="Profile Picture"
              width={400}
              height={400}
              className=" object-cover"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1">
            Skills & Expertise
          </Badge>
          <h2 className="text-3xl font-bold">My Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I&apos;ve worked with and mastered over the
            years to create exceptional digital experiences.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech: string) => (
            <Badge
              key={tech}
              className="px-4 py-2 text-sm bg-primary dark:bg-secondary hover:bg-primary/90 cursor-default transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <FeaturedProjects />
      </section>

      {/* Latest Blog Posts */}
      <LatestPosts />
    </div>
  );
}
