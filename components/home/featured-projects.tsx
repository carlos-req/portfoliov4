import Image from "next/image";
import { featuredProjects } from "@/data/index.js";
import Link from "next/link";

export default function FeaturedProjects() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
      {featuredProjects.map((project, i) => (
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
  );
}
