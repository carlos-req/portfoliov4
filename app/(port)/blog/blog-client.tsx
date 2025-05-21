"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { formatDate } from "@/lib/cmsFormats";
import Image from "next/image";

const categories = [
  { id: "all", label: "All Posts" },
  { id: "development", label: "Development" },
  { id: "career", label: "Career" },
  { id: "health", label: "Health" },
];

export interface Post {
  id: string;
  title: string;
  content: any;
  tag: string;
  thumbnail?: { url: string };
  createdAt: string;
}

interface Props {
  initialPosts: Post[];
}

export default function BlogClient({ initialPosts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.tag === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content?.root?.children?.[0]?.children?.[0]?.text || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 max-w-5xl mx-auto mt-12 md:mt-0">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Thoughts, tutorials, and insights about web development, design, and
          technology.
        </p>
      </section>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full h-auto">
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

      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              {post.thumbnail && (
                <div className="relative aspect-video">
                  <Image
                    src={post.thumbnail.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Badge className="capitalize">{post.tag}</Badge>
                  <div className="space-y-2">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                    </Link>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.content?.root?.children?.[0]?.children?.[0]?.text ||
                        ""}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <Button variant="ghost" className="px-2" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
          <h3 className="text-xl font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground max-w-sm">
            No blog posts match your current filters. Try adjusting your search
            or category selection.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
