'use client'

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, HomeIcon, Users, ShoppingBag, PieChart, House, SproutIcon, Hammer, Ham, Soup } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";
import { useState } from "react";

// Define navigation types
type DropdownItem = {
  name: string;
  href: string;
  icon?: React.ElementType;
};

type NavigationItem = {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
  icon?: React.ElementType;
};

// Navigation data structure
const navigation: NavigationItem[] = [
  {
    name: "Use Cases",
    icon: Users,
    dropdown: [
      { name: "Real Estate Agents", href: "/listing-shorts", icon: House },
      // { name: "Chefs", href: "/use-cases/chefs", icon: Soup },
      { name: "Renovations", href: "/renovation", icon: Hammer },
    ]
  },
  {
    name: "Showcase",
    href: "/showcase"
  },
  { name: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  useInitCal();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-4 pointer-events-none">
      <nav className="flex items-center justify-between p-4 px-6 rounded-full border border-muted bg-background/80 backdrop-blur-sm shadow-lg w-[90%] max-w-6xl pointer-events-auto">
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
            <div key={item.name} className="relative group">
              {item.dropdown ? (
                // Dropdown menu item
                <>
                  <div className="flex items-center text-sm text-foreground hover:text-accent transition-all duration-300 cursor-pointer">
                    {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                    {item.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </div>

                  {/* Invisible area to prevent hover loss */}
                  <div className="absolute h-2 w-full -bottom-2 left-0"></div>

                  {/* Dropdown menu */}
                  <div className="absolute top-full left-0 pt-2 w-48 hidden group-hover:block">
                    <div className="py-1 rounded-md shadow-lg bg-background border border-muted z-50">
                      {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="px-4 py-2 flex flex-row text-sm text-foreground hover:bg-accent/20 hover:text-accent"
                          >
                          {dropdownItem.icon && <dropdownItem.icon className="w-4 h-4 mr-1"/>}
                          {dropdownItem.name}
                          </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // Regular menu item
                <Link
                  href={item.href || '#'}
                  className="flex items-center text-sm text-foreground hover:text-accent transition-all duration-300"
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                  {item.name}
                </Link>
              )}
            </div>
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
                  <div key={item.name} className="space-y-2">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-lg text-muted-foreground hover:text-accent transition-all duration-300"
                        >
                          <span className="flex items-center">
                            {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {activeDropdown === item.name && (
                          <div className="ml-4 space-y-2 border-l border-muted pl-4">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block text-base text-muted-foreground hover:text-accent"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href || '#'}
                        className="flex items-center text-lg text-muted-foreground hover:text-accent transition-all duration-300"
                      >
                        {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <CalendarButton className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
