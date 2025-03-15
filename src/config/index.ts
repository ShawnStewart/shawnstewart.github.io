import { Loading } from '@/components/Loading';
import type { LoaderDefaultOptions } from '@/utils/loader/types';

const title = 'Shawn Stewart';

const email = 's.stewart0220@gmail.com';

const linkedInUrl = 'https://www.linkedin.com/in/shawn-stewart/';

const githubUrl = 'https://github.com/ShawnStewart';
const repository = `${githubUrl}/website`;
const reactPwaRepository = `${githubUrl}/react-pwa`;

const messages = {
  404: 'Whatcha looking for?',
  app: {
    crash: {
      description: 'You can report the issue or restart the application.',
      options: {
        email: `Contact the author`,
        reset: 'Restart the application',
      },
      title: 'Oops! Something went wrong...',
    },
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
};

const dateFormat = 'MMMM DD, YYYY';

const loaderDefaultOptions = {
  // no more blinking in your app
  FallbackComponent: Loading,
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
} as const satisfies LoaderDefaultOptions;

const defaultMetaTags = {
  description: 'Starter kit for modern web applications',
  image: '/cover.png',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  dateFormat,
  defaultMetaTags,
  email,
  giphy404,
  githubUrl,
  linkedInUrl,
  loaderDefaultOptions,
  messages,
  reactPwaRepository,
  repository,
  title,
};
