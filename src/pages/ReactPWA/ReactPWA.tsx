import { Meta } from '@/components/Meta';
import { PageContentWrapper } from '@/components/PageContentWrapper';
import { HeadingLevel, Typography } from '@/components/ui/typography';

import { TechCards } from './TechCards';

export function ReactPWA() {
  return (
    <PageContentWrapper className="flex flex-col justify-center text-center">
      <Meta title="Welcome" />
      <Typography className="mt-8" variant="heading">
        Build a modern web application
      </Typography>
      <Typography>Get started quickly using this template.</Typography>

      <section>
        <HeadingLevel>
          <Typography className="mt-8" variant="heading">
            Technologies used
          </Typography>
          <TechCards />
        </HeadingLevel>
      </section>
    </PageContentWrapper>
  );
}
