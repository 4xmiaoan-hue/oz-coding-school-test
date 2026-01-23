import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Since class-variance-authority might not be installed (I only checked package.json for clsx and tailwind-merge), 
// I will implement a simplified version or just use clsx if cva is missing.
// Wait, I should check if cva is installed. The user said "use shadcn UI components" but didn't say cva is installed.
// Looking at package.json from previous step:
// "dependencies": { "clsx": "^2.1.1", "tailwind-merge": "^3.0.2", ... }
// "cva" (class-variance-authority) is NOT in the dependencies list.
// So I will manually implement the badge styles without cva to avoid errors.

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
  outline: "text-foreground",
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
