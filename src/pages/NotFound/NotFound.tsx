import { PageContentWrapper } from '@/components/PageContentWrapper';
import { Separator } from '@/components/ui/separator';
import { HeadingLevel, Typography } from '@/components/ui/typography';
import { giphy404, messages } from '@/config';

export function NotFound() {
  return (
    <PageContentWrapper className="flex max-w-sm flex-col items-center justify-center">
      <iframe allowFullScreen className="aspect-square size-full" src={giphy404} />
      <Typography className="mt-2" color="error" variant="heading">
        404 Not Found
      </Typography>
      <Separator className="my-3" />
      <HeadingLevel>
        <Typography className="text-center" variant="heading">
          {messages[404]}
        </Typography>
      </HeadingLevel>
    </PageContentWrapper>
  );
}
