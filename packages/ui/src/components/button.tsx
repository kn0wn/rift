"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@rift/utils"

const buttonVariants = cva(
  "focus-visible:border-border-emphasis focus-visible:ring-border-emphasis/50 aria-invalid:ring-content-error/20 dark:aria-invalid:ring-content-error/40 aria-invalid:border-content-error dark:aria-invalid:border-content-error/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none hover:bg-bg-inverted/5 active:bg-bg-inverted/10",
  {
    variants: {
      variant: {
        default:
          "bg-accent-default text-white hover:bg-accent-default/70 active:bg-accent-default/50",
        ghost:
          "bg-transparent text-content-default",
        danger:
        "border-red-500 bg-red-500 text-white hover:bg-red-600/70 active:bg-red-600/50",
        dangerLight:
        "text-content-error hover:bg-content-error/10 hover:text-content-error/80",
        sidebarIcon:
          "focus-visible:ring-2 focus-visible:ring-border-emphasis/50 data-[active=true]:bg-bg-default data-[active=true]:hover:bg-bg-default data-[active=true]:active:bg-bg-default",
        sidebarNavItem:
          "flex h-8 w-full items-center justify-between rounded-lg p-2 text-sm leading-normal font-normal text-content-default outline-none transition-[background-color,color,font-weight] duration-0 active:duration-75 focus-visible:ring-2 focus-visible:ring-border-emphasis hover:bg-bg-inverted/5 active:bg-bg-inverted/10 data-[active=true]:bg-bg-info/25 data-[active=true]:font-medium data-[active=true]:text-content-info data-[active=true]:hover:bg-bg-info/45 data-[active=true]:active:bg-bg-info/75",
        outline:
          "border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm text-black dark:text-white hover:bg-white/70 dark:hover:bg-black/30",
        primaryAlt:
          "bg-accent-default text-white hover:bg-accent-default/70 active:bg-accent-default/50 shadow-lg hover:shadow-xl",
        link:
          "bg-transparent border-0 shadow-none text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:bg-transparent active:bg-transparent whitespace-nowrap",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        large:
          "h-10 px-4.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        big:
          "h-12 w-full rounded-2xl gap-2.5 transition-all duration-200",
        icon:
          "aspect-square h-10 w-10 rounded-lg",
        iconSmall: 
          "aspect-square h-5 w-5",
        iconSidebar:
          "size-11 rounded-lg transition-colors duration-150 [&_svg:not([class*='size-'])]:size-5",
        sidebarNavItem:
         "min-h-8 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const variantClasses = buttonVariants({ variant, size })

  if (asChild) {
    const { children, ...rest } = props
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string
      [key: string]: unknown
    }>
    const merged = {
      className: cn(variantClasses, child.props?.className, className),
      "data-slot": "button",
      ...rest,
    }
    return React.cloneElement(child, merged)
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(variantClasses, className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
