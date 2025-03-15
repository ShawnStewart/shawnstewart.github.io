import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

function getDisplayName(WrappedComponent: FC) {
  return WrappedComponent.displayName ?? (WrappedComponent.name || 'Component');
}

export function withErrorHandler<P extends object>(Component: FC<P>, Fallback: FC<FallbackProps>) {
  function ComponentWithErrorHandling(props: P) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
    Component as FC<unknown>,
  )}`;

  return ComponentWithErrorHandling;
}
