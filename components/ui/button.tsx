"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        accent:
          "border-2 border-accent bg-accent/40 text-foreground hover:bg-accent/90 shadow-sm font-medium",
        accent_no_transparent:
          "border-4 border-accent/90 bg-accent/90 text-foreground hover:border-accent shadow-sm font-medium",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-accent text-accent-foreground font-semibold shadow-md hover:bg-accent/90 transition-all duration-200",
        warm: "bg-accent text-accent-foreground font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px] border border-accent/20 backdrop-blur-sm transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent/80 before:to-accent before:opacity-100 before:z-0 hover:before:opacity-90",
        golden: "text-[#0F172A] font-medium shadow-md hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#F8E2BD] before:via-[#DFCA9C] before:to-[#B69259] before:opacity-100 before:z-0 hover:before:brightness-105 before:transition-all",
      },
      size: {
        default: "h-9 rounded-full px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
        xl: "h-16 rounded-full px-12 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === 'warm' || variant === 'golden' ? (
          <>
            <span className="relative z-10">{props.children}</span>
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
