import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@rift/utils"

const badgeVariants = cva(
  "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-border-emphasis focus-visible:ring-border-emphasis/50 focus-visible:ring-[3px] aria-invalid:ring-content-error/20 aria-invalid:border-content-error overflow-hidden group/badge",
  {
    variants: {
      variant: {
        default: "bg-accent-default text-white [a]:hover:bg-accent-default/80",
        secondary: "bg-bg-muted text-content-muted [a]:hover:bg-bg-muted/80",
        destructive: "bg-bg-error/10 [a]:hover:bg-bg-error/20 focus-visible:ring-content-error/20 text-content-error dark:bg-bg-error/20",
        outline: "border-border-default text-content-default [a]:hover:bg-bg-muted [a]:hover:text-content-muted",
        ghost: "hover:bg-bg-muted hover:text-content-muted dark:hover:bg-bg-muted/50",
        link: "text-accent-default underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
