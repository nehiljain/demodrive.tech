'use client'

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";

const navigation = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "FAQ", href: "/#faq" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "https://blog.demodrive.tech/" },
];

export default function Navigation() {
  useInitCal();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-4 px-6 rounded-full border border-muted bg-background/80 backdrop-blur-sm shadow-lg w-[90%] max-w-6xl">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="font-semibold text-lg">DemoDrive</span>
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
        <CalendarButton />
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
              <CalendarButton className="w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
