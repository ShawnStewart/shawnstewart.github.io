import { Helmet } from 'react-helmet-async';

import { defaultMetaTags, title as appTitle } from '@/config';

import type { MetaProps } from './types';

export function Meta({
  description = defaultMetaTags.description,
  meta = [],
  title,
  image = defaultMetaTags.image,
}: MetaProps) {
  const pageTitle = `${appTitle}${title ? ' | ' + title : ''}`;

  return (
    <Helmet
      meta={[
        {
          content: description,
          name: 'description',
        },
        {
          content: pageTitle,
          property: 'og:title',
        },
        {
          content: description,
          property: 'og:description',
        },
        {
          content: 'website',
          property: 'og:type',
        },
        {
          content: image,
          property: 'og:image',
        },
        {
          content: 'summary',
          name: 'twitter:card',
        },
        {
          content: pageTitle,
          name: 'twitter:title',
        },
        {
          content: description,
          name: 'twitter:description',
        },
      ].concat(meta)}
      title={pageTitle}
    />
  );
}
