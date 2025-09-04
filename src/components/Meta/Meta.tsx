import { defaultMetaTags, title as appTitle } from '@/config';

import type { MetaProps } from './types';

export function Meta({
  description = defaultMetaTags.description,
  meta = [],
  title,
  image = defaultMetaTags.image,
}: MetaProps) {
  const pageTitle = `${appTitle}${title ? ` | ${title}` : ''}`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta content={description} name="description" />
      <meta content={pageTitle} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={image} property="og:image" />
      <meta content="summary" name="twitter:card" />
      <meta content={pageTitle} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}
    </>
  );
}
