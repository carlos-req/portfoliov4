"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) =>
      formData.append(key, data[key as keyof ContactFormValues] as string)
    );
    formData.append("access_key", "b2555add-43be-4e14-ac40-31e54a71511b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "cjrequena11@gmail.com",
      href: "mailto:cjrequena11@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(727) 503-3570",
      href: "tel:+17275033570",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Tampa, FL",
      href: "https://maps.google.com/?q=Tampa+FL",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/carlos-req/", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/carlosjrequena/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://x.com/CarlosReq11", label: "Twitter" },
  ];

  return (
    <div className="space-y-12 max-w-6xl mx-auto mt-12 md:mt-0">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Have a project in mind or want to discuss a potential collaboration?
          Feel free to reach out!
        </p>
      </section>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Contact Info */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                {contactMethods.map((contact, i) => {
                  const Icon = contact.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-muted shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{contact.title}</h3>
                        <a
                          href={contact.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contact.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Connect with me</h2>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 rounded-full bg-muted hover:bg-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What is this regarding?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          className="min-h-[150px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "What is your typical response time?",
              answer:
                "I usually respond to all inquiries within 24-48 hours during business days.",
            },
            {
              question: "Do you work with clients internationally?",
              answer:
                "Yes, I work with clients globally and can accommodate different time zones for meetings and communication.",
            },
            {
              question: "What is your project process like?",
              answer:
                "My process typically includes discovery, planning, design, development, testing, and launch phases with regular client check-ins.",
            },
            {
              question: "Can you provide references or testimonials?",
              answer:
                "Yes, I can provide references from previous clients upon request. You can also check out the Clients page for testimonials.",
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
