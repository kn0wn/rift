import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@rift/utils"

const inputVariants = cva(
  "block w-full min-w-0 border text-content-emphasis transition-colors placeholder:text-content-muted focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 file:h-6 file:text-sm file:font-medium file:text-content-emphasis file:inline-flex file:border-0 file:bg-transparent sm:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-border-default bg-transparent focus-visible:border-content-subtle focus-visible:ring-3 focus-visible:ring-content-subtle/50 aria-invalid:border-content-error aria-invalid:ring-3 aria-invalid:ring-content-error/20",
        alt:
          "rounded-xl bg-white/10 border-black/10 dark:border-white/10 text-black dark:text-white transition-all duration-200 hover:bg-white/20 dark:hover:bg-black/30 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-black/40 dark:placeholder:text-white/40 aria-invalid:border-red-500 dark:aria-invalid:border-red-400 aria-invalid:bg-red-50/50 dark:aria-invalid:bg-red-900/20",
      },
      inputSize: {
        default:
          "h-9 rounded-md px-3 py-2",
        large:
          "h-12 rounded-xl px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({
  className,
  type,
  variant = "default",
  inputSize = "default",
  ...props
}: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-size={inputSize}
      data-variant={variant}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
