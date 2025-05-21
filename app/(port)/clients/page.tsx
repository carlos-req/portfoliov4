"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Quote, Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { clientLogos, testimonials } from "@/data/index.js";
import Image from "next/image";

export default function ClientsPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 fill-primary text-primary"
        />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto mt-12 md:mt-0">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Clients</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          I&apos;ve had the pleasure of working with amazing clients across
          various industries. Here&apos;s what they have to say about our
          collaboration.
        </p>
      </section>

      {/* Client Logos */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Companies I&apos;ve Worked With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className="aspect-square bg-card rounded-xl flex items-center justify-center p-4 border transition-all hover:shadow-md"
            >
              <div className="text-lg font-medium text-center text-muted-foreground">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Client Testimonials</h2>

        <div className="relative">
          <Card className="overflow-hidden border border-border bg-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center md:items-start space-y-4">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary opacity-20" />
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                      />
                      <AvatarFallback className="text-lg">
                        {testimonials[activeTestimonial].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold">
                      {testimonials[activeTestimonial].name}
                    </h3>
                    <p className="text-muted-foreground">
                      {testimonials[activeTestimonial].position}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>

                  <div className="flex space-x-1">
                    {renderStars(testimonials[activeTestimonial].rating)}
                  </div>

                  <p className="text-sm font-medium">
                    Project: {testimonials[activeTestimonial].project}
                  </p>
                </div>

                <div className="md:w-2/3 flex flex-col justify-between">
                  <blockquote className="text-lg italic leading-relaxed">
                    &quot;{testimonials[activeTestimonial].comment}&quot;
                  </blockquote>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-muted-foreground">
                      {activeTestimonial + 1} of {testimonials.length}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevTestimonial}
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextTestimonial}
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent rounded-xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to work together?</h2>
        <p className="text-accent-foreground max-w-xl mx-auto">
          I&apos;m currently available for freelance projects and
          collaborations. Let&apos;s create something amazing together.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </section>
    </div>
  );
}
