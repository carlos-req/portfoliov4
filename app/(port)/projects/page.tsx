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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <Card
              key={i}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full "
                />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 " />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      asChild
                    >
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 "
                      asChild
                    >
                      <Link href={`/projects/${project.slug}`}>
                        Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
