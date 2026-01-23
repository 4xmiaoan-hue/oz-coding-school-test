import * as React from "react"
import { Check, Circle } from "lucide-react"
import { cn } from "../../lib/utils"

interface Step {
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep?: number
  className?: string
}

export function Stepper({ steps, currentStep = steps.length, className }: StepperProps) {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isLast = index === steps.length - 1

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted || isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="absolute top-12 w-32 text-center">
                  <p className={cn("text-xs font-bold mb-0.5", isCurrent ? "text-primary" : "text-foreground")}>
                    {step.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2 bg-muted relative -top-6">
                  <div 
                    className="absolute inset-0 bg-primary transition-all duration-500"
                    style={{ width: index < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
