import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import { Heading } from './Heading';

function TypographyP({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn('mt-6 leading-7 first-of-type:mt-0', className)} {...props}>
      {children}
    </p>
  );
}

function TypographyBlockquote({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLQuoteElement>>) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props}>
      {children}
    </blockquote>
  );
}

function TypographyInlineCode({ children }: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      )}
    >
      {children}
    </code>
  );
}

function TypographyLead({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
}

interface TypographyProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  variant?: 'heading' | 'p' | 'blockquote' | 'inline-code' | 'lead';
}

export function Typography({ children, variant = 'p', ...props }: TypographyProps) {
  switch (variant) {
    case 'heading': {
      return <Heading {...props}>{children}</Heading>;
    }
    case 'p':
      return <TypographyP {...props}>{children}</TypographyP>;
    case 'blockquote':
      return <TypographyBlockquote {...props}>{children}</TypographyBlockquote>;
    case 'inline-code':
      return <TypographyInlineCode {...props}>{children}</TypographyInlineCode>;
    case 'lead':
      return <TypographyLead {...props}>{children}</TypographyLead>;
    default:
      return <TypographyP {...props}>{children}</TypographyP>;
  }
}
