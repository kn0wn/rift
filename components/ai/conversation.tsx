'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ComponentProps } from 'react';

export type ConversationProps = ComponentProps<'div'>;

/**
 * Scroll container for chat messages.
 * Accepts a ref to enable stick-to-bottom behavior.
 * Uses overflow-anchor to help browser maintain scroll position.
 */
export const Conversation = forwardRef<HTMLDivElement, ConversationProps>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative h-full w-full flex-1 min-h-0 min-w-0 max-w-[100vw] overflow-y-auto',
        className
      )}
      style={{
        scrollbarGutter: 'stable both-edges',
        // Disable overflow anchor on container - we'll use explicit anchor
        overflowAnchor: 'none',
        ...style,
      }}
      role="log"
      {...props}
    />
  )
);
Conversation.displayName = 'Conversation';

export type ConversationContentProps = ComponentProps<'div'> & {
  /** Whether to include the scroll anchor at the bottom */
  withScrollAnchor?: boolean;
};

/**
 * Content container for chat messages.
 * Accepts a ref to enable ResizeObserver for stick-to-bottom.
 * Includes an optional scroll anchor for browser-native scroll position maintenance.
 */
export const ConversationContent = forwardRef<HTMLDivElement, ConversationContentProps>(
  ({ className, children, withScrollAnchor = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'p-4 w-full min-w-0 max-w-[100vw] overflow-x-hidden',
        className
      )}
      {...props}
    >
      {children}
      {/* Scroll anchor - browser uses this to maintain scroll position when content above grows */}
      {withScrollAnchor && (
        <div 
          aria-hidden="true"
          style={{ 
            height: 1, 
            overflowAnchor: 'auto',
            // Ensure it's always the anchor point
            contain: 'strict',
          }} 
        />
      )}
    </div>
  )
);
ConversationContent.displayName = 'ConversationContent';
