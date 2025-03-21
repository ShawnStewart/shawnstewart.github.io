import { logWelcomeMessage } from '@/utils/welcome';

// Root contains the main dependencies and providers of the base app
//  - React, ReactDom, HelmetProvider, ThemeProvider)
// App contains the main structure of the base app

// These are the two main chunks that are used to render the core structure of the app
// Importing them with Promise.all (by using HTTP/2 multiplexing) we can load them in parallel
// and achieve the best possible performance

Promise.all([import('@/Root'), import('@/App')])
  .then(([{ default: render }, { default: App }]) => {
    render(App);
  })
  .catch((e: unknown) => {
    console.error('Something went wrong!', e);
  });

// welcome message for users in the console
logWelcomeMessage();

// ts(1208)
export {};
