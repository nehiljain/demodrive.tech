import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, Bot, Users, FileCheck, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Grid } from "@/components/ui/grid";

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
              className="text-sm text-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button variant="accent">
            Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
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
                <Button variant="accent" className="w-full">
                  Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-12 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Make your docs
            <br />
            Error Proof
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            AI find bugs and generates usability report for your
            documentation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button variant="accent" className="h-12 px-6">
              Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Feature Pills */}
          {/* <div className="mt-12 flex flex-wrap justify-center gap-4">
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
          </div> */}
        </div>

        {/* Code Preview Card */}
        <div className="mx-auto max-w-6xl px-6 lg:py-6 sm:py-2">
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
          <div className="flex flex-col items-center">
            <div className="flex justify-center gap-8 mb-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex justify-center w-[120px]">
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
            <div className="text-sm text-muted-foreground">
              Trusted by teams leading AI DevTool companies.
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center">
            Documentation Quality Report
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-xl font-bold">
            Detailed review of your docs for correctness and usability.{" "}
            <Link href="#" className="text-accent hover:underline font-bold inline-flex items-center">
              See a sample report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </p>

          {/* First Feature */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-start items-center mb-24">
            <div className="px-12">
              <p className="text-sm text-accent font-bold mb-4">
                Error Stacktraces
              </p>
              <h3 className="text-2xl font-bold mb-4">
                Developer friendly summary of bugs
              </h3>
              <p className="text-muted-foreground">
                AI agents scan your docs as a technical user would. They
                replicate all the code guides and tutorials. You get a detailed
                report of whats not working.
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

          {/* Second Feature */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-start items-center mb-24">
            <div className="lg:order-2 px-12">
              <p className="text-sm text-accent font-bold mb-4">
                Broken Links
              </p>
              <h3 className="text-2xl font-bold mb-4">
                List of all the invalid links and references
              </h3>
              <p className="text-muted-foreground">
                Our AI performs comprehensive testing of code samples in your documentation,
                ensuring they compile and run as expected. Catch issues before your users do.
              </p>
            </div>
            <Card className="bg-card border-muted lg:order-1">
              <Image
                src="/placeholder.svg"
                alt="Code Analysis"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </Card>
          </div>

          {/* Third Feature */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-start items-center">
            <div className="px-12">
              <p className="text-sm text-accent mb-4 font-bold">
                Usability Recommendations
              </p>
              <h3 className="text-3xl font-bold mb-4">
                Improve the DX of your docs
              </h3>
              <p className="text-lg text-muted-foreground">
                Get insights on documentation clarity, completeness, searchability, LLM and Human Friendliness.
                Our AI evaluates your docs on multiple standards that matter to your users.
              </p>
            </div>
            <Card className="bg-card border-muted">
              <Image
                src="/placeholder.svg"
                alt="UX Assessment"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </Card>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="py-20 lg:py-24 sm:py-12 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Here is how it works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-6 relative">
            {[
              {
                icon: Phone,
                title: "Onboarding Call",
                description: "We schedule a call to understand your project and help you configure our AI agents.",
              },
              {
                icon: Bot,
                title: "Weekly AI automated reports",
                description: "Based on your configuration, AI agents look at your public facing documentation and generate a report.",
              },
              {
                icon: Users,
                title: "Human in the loop",
                description: "Our AI is not perfect yet. We review and correct the generated report. OSS projects are our ideal users.",
              },
              {
                icon: FileCheck,
                title: "Better Docs",
                description: "You get a detailed report of whats not working. You fix it and the cycle continues.",
              },
            ].map((feature, index) => (
              <div key={feature.title} className="relative flex items-stretch h-full">
                <div className="bg-card p-6 rounded-lg border border-muted shadow-sm hover:border-muted-foreground/20 transition-colors flex-1 flex flex-col">
                  <feature.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-foreground text-sm flex-1">
                    {feature.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10 px-4">
                    <ChevronRight className="w-6 h-6 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Ready to improve
              <br />
              your documentation?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Schedule a demo with us. We promise you will be amazed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button variant="accent" className="h-12 px-6">
                Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
