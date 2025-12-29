'use client';

import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type ConversationProps = ComponentProps<'div'>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <div
    className={cn(
      'relative h-full w-full flex-1 min-h-0 min-w-0 max-w-[100vw] overflow-y-auto',
      className
    )}
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<'div'>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <div
    className={cn(
      'p-4 w-full min-w-0 max-w-[100vw] overflow-x-hidden',
      className
    )}
    {...props}
  />
);