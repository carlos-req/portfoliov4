import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { initPayload } from "@/lib/payload";
import { getPlainTextFromRichText } from "@/lib/cmsFormats";

export default async function LatestPosts() {
  const payload = await initPayload();
  const posts = await payload.find({
    collection: "posts",
    limit: 2,
    depth: 1,
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Latest Posts</h2>
        <Button variant="ghost" asChild>
          <Link href="/blog">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.docs.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <div className="aspect-video bg-muted relative">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <CardContent className="p-6">
              <Badge className="mb-2 capitalize">{post.tag}</Badge>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">
                {getPlainTextFromRichText(post.content).slice(0, 75)}...
              </p>
              <Button variant="ghost" className="px-2" asChild>
                <Link href={`/blog/${post.id}`}>
                  Read more <ArrowRight className="ml-2 h-4 w-4 " />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
