import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isOpen?: boolean; onToggle?: () => void }
>(({ className, children, isOpen, onToggle, ...props }, ref) => (
  <div className="flex">
    <button
      ref={ref}
      onClick={onToggle}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  </div>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      isOpen ? "block" : "hidden"
    )}
    data-state={isOpen ? "open" : "closed"}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

// Helper component to manage state simply for the user
interface SimpleAccordionProps {
  items: { value: string; trigger: React.ReactNode; content: React.ReactNode }[]
  className?: string
}

export function SimpleAccordion({ items, className }: SimpleAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  const handleToggle = (value: string) => {
    setOpenItem(openItem === value ? null : value)
  }

  return (
    <Accordion className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value}>
          <AccordionTrigger
            isOpen={openItem === item.value}
            onToggle={() => handleToggle(item.value)}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent isOpen={openItem === item.value}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
