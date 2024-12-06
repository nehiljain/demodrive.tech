import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Pricing", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Schedule demo", href: "#" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-4 px-6 rounded-full border border-muted bg-background/80 backdrop-blur-sm shadow-lg w-[90%] max-w-6xl">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-primary text-primary-foreground hover:bg-[hsl(var(--ring))]">
            Start →
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="w-full bg-primary text-primary-foreground hover:bg-[hsl(var(--ring))]">
                  Start →
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Ship faster with AI that
            <br />
            understands your entire codebase.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Review PRs, diagnose bugs, build custom dev tools.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button variant="outline" className="h-12 px-6">
              Schedule Demo
            </Button>
            <Button className="h-12 px-6 bg-primary hover:bg-[hsl(var(--ring))]">
              Start Now →
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              "AI Code Review",
              "Codebase Chat",
              "Bug Diagnosis",
              "Custom Dev Tools",
            ].map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="bg-card text-white px-4 py-2 text-sm rounded-full border border-muted"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Code Preview Card */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Card className="relative overflow-hidden rounded-lg border border-muted bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <Image
              src="/placeholder.svg"
              alt="Code Preview"
              width={1200}
              height={600}
              className="relative rounded-lg"
            />
          </Card>
        </div>

        {/* Logo Cloud */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-3 gap-8 md:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src="/placeholder.svg"
                  alt={`Client ${i + 1}`}
                  width={120}
                  height={40}
                  className="h-8 object-contain opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Over 1000 companies use our tools to better their business.{" "}
            <Link href="#" className="text-primary hover:underline">
              Read our customer stories →
            </Link>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center">
            AI Code Review Bot
          </h2>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-start items-center">
            <div>
              <p className="text-sm text-primary font-medium mb-4">
                PR Summaries
              </p>
              <h3 className="text-2xl font-bold mb-4">
                Natural-language summary of changes
              </h3>
              <p className="text-muted-foreground">
                Get a summary of every PR in natural language to understand the
                context of the changes.
              </p>
            </div>
            <Card className="bg-card border-muted">
              <Image
                src="/placeholder.svg"
                alt="PR Summary"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
