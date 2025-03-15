import { Link } from 'react-router-dom';

import { Meta } from '@/components/Meta';
import { PageContentWrapper } from '@/components/PageContentWrapper';
import { buttonVariants } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

interface Props {
  pageNumber?: number;
  show404?: boolean;
}

export function BlankPage({ pageNumber, show404 }: Props) {
  return (
    <PageContentWrapper className="flex items-center justify-center">
      <Meta title="page 4" />
      <section className="flex-col">
        <Typography className="text-center" variant="heading">
          {pageNumber ? `Page ${pageNumber}` : 'A Blank Page'}
        </Typography>
        {show404 && (
          <Link
            className={buttonVariants({ className: 'my-8', size: 'sm', variant: 'outline' })}
            to={`/${Math.random().toString()}`}
          >
            Want to check 404?
          </Link>
        )}
      </section>
    </PageContentWrapper>
  );
}
