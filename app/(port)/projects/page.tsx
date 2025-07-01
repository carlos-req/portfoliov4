"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/index.js";

const categories = [
  { id: "all", label: "All" },
  { id: "client", label: "Client" },
  { id: "personal", label: "Personal" },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesCategory;
  });

  return (
    <div className="space-y-10 max-w-5xl mx-auto mt-12 md:mt-0">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of my work, side projects, and experiments. Each project
          is built with a focus on code quality, design, and user experience.
        </p>
      </section>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {filteredProjects.map((project, i) => (
            <Link key={i} href={`/projects/${project.slug}`}>
              <div className="flex flex-col items-start gap-2 ">
                <div className=" flex flex-col items-center justify-center text-muted-foreground">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full aspect-video hover:brightness-75 transition-all duration-300 ease-in-out"
                  />
                </div>
                <section className="text-xs tracking-tight">
                  <h2 className=" pb-1 uppercase">{project.title}</h2>
                  <p className="text-xs uppercase text-muted-foreground">
                    {project.type}
                  </p>
                </section>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
        </div>
      )}
    </div>
  );
}
