import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { featuredProjects } from "@/data/index.js";

export default function FeaturedProjects() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project, i) => (
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
          <CardContent className="p-6 ">
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
              <div className="flex gap-2 pt-2 flex-wrap items-center  ">
                <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 " asChild>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
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
  );
}
