import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";

export interface GradientOutlineButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

const GradientOutlineButton = React.forwardRef<
  HTMLButtonElement,
  GradientOutlineButtonProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "relative w-64 h-14 rounded-full bg-transparent overflow-hidden",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-blue-600 opacity-75 hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute inset-[2px] bg-background rounded-full" />
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {props.children}
      </span>
    </Comp>
  );
});
GradientOutlineButton.displayName = "GradientOutlineButton";

export { GradientOutlineButton };
