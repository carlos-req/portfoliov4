import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { jobExperience, educations, certificates } from "@/data/index.js";

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto mt-12 md:mt-0">
      {/* Bio Section */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg">
              Hi, I&apos;m Carlos Requena, a front end developer with 3+ years
              of experience creating engaging web experiences. I specialize in
              building modern, responsive websites and applications using the
              latest technologies and best practices.
            </p>
            <p>
              My journey in web development began during the pandemic, where I
              discovered my passion for creating stunning websites. Since then,
              I&apos;ve worked with small businesses, agencies, and established
              companies to deliver high quality solutions.
            </p>
            <p>
              Beyond development, I enjoy working out, playing MTG and creating
              content that can provide some value to others.
            </p>
            <div className="flex gap-4 pt-4 justify-between md:justify-normal">
              <Button asChild className="w-full md:w-auto">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button variant="outline" asChild className="w-full md:w-auto">
                <Link href="./images/resume.pdf" target="_blank">
                  <FileText className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Image
                  src="/images/prof_pic.jpeg"
                  alt="Profile Picture"
                  width={500}
                  height={500}
                  className=" object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="">cjrequena11@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(727) 503-3570</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Tampa, FL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> Professional Experience
        </h2>
        <div className="space-y-6">
          {jobExperience.map((job, i) => (
            <div
              key={i}
              className="relative pl-6 border-l-2 border-muted pb-6 last:border-0 last:pb-0"
            >
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <Badge variant="outline" className="w-fit">
                    {job.period}
                  </Badge>
                </div>
                <p className="text-primary font-medium">{job.company}</p>
                <p className="text-muted-foreground">{job.description}</p>
                <ul className="space-y-1 mt-2">
                  {job.achievements.map((achievement, j) => (
                    <li key={j} className="text-sm">
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" /> Education
        </h2>
        <div className="space-y-6">
          {educations.map((edu, i) => (
            <div
              key={i}
              className="relative pl-6 border-l-2 border-muted pb-6 last:border-0 last:pb-0"
            >
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2" />
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <Badge variant="outline" className="w-fit">
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-primary font-medium">{edu.school}</p>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-5 w-5" /> Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-start gap-4">
                <Award className="h-10 w-10 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Let's work together section */}
      <div className="rounded-lg bg-accent  p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Let&apos;s work together</h2>
        <p className="text-accent-foreground max-w-xl mx-auto">
          I&apos;m currently available for freelance projects and permanent
          positions. If you&apos;re looking for a frontend developer who can
          bring your ideas to life, let&apos;s connect!
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            Get in touch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
