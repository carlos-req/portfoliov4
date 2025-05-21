import { initPayload } from "@/lib/payload";
import BlogClient, { Post } from "./blog-client";

export default async function BlogPage() {
  const payload = await initPayload();
  const posts = await payload.find({
    collection: "posts",
    depth: 1,
  });

  return <BlogClient initialPosts={posts.docs as Post[]} />;
}
