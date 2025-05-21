import { notFound } from "next/navigation";
import { initPayload } from "@/lib/payload";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { formatDate } from "@/lib/cmsFormats";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const payload = await initPayload();

  // Find the post that matches the slug
  const posts = await payload.find({
    collection: "posts",
    where: {
      id: {
        equals: slug,
      },
    },
    depth: 1,
  });

  const post = posts.docs[0];
  console.log(post);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      {post.thumbnail && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <Badge>{post.tag}</Badge>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          {formatDate(post.createdAt)}
        </p>
        <RichText data={post.content} />
      </div>
    </article>
  );
}
