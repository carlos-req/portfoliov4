import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { projects } from "@/data/index.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Download } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  return {
    title: project.title,
    description: project.description?.slice(0, 160) || "Check out this project",
    openGraph: {
      title: project.title,
      description:
        project.description?.slice(0, 160) || "Check out this project",
      authors: ["Carlos Requena"],
      images: project.image ? [project.image] : ["https://carlos-req.com/"], // Default image if none is provided
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description:
        project.description?.slice(0, 160) || "Check out this project",
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectOverview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="max-w-3xl mx-auto my-8 md:my-0 font-mono">
      {project.image && (
        <div className="relative w-full aspect-video overflow-hidden mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="space-y-4">
        <section className="tracking-tight  uppercase ">
          <h1 className="text-xl font-bold">{project.title}</h1>
          <p className="text-sm text-muted-foreground">{project.type}</p>
          <Badge className=" text-xs mt-4">{project.category}</Badge>
        </section>

        <section className="text-sm space-y-2">
          <h2 className="font-bold uppercase">Tools</h2>
          {project.tags.map((tag) => (
            <p key={tag} className="text-muted-foreground text-xs">
              - {tag}
            </p>
          ))}
        </section>

        <section className="text-sm  space-y-4">
          <h2 className="font-bold uppercase">Description</h2>
          <p className="text-muted-foreground">{project.description}</p>
        </section>

        <div className="flex flex-wrap gap-4 pt-4 ">
          <Button size="lg" asChild>
            <Link href={project.demoUrl} target="_blank">
              {project.demoUrl} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={project.repoUrl} target="_blank">
              Github <Github className=" ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
