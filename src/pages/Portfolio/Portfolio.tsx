import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { BellDot, Mail } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Meta } from '@/components/Meta';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeadingLevel, Typography } from '@/components/ui/typography';
import { email, githubUrl, linkedInUrl } from '@/config';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { getRandomJoke } from '@/sections/Header/utils';

import { WorkHistory } from './WorkHistory';

function EmailMeLink({ children }: PropsWithChildren) {
  return (
    <Link className={cn(buttonVariants({ className: 'rounded-full' }))} to={`mailto:${email}`}>
      {children}
    </Link>
  );
}

export function Portfolio() {
  const { toast } = useToast();

  function tellJoke() {
    toast(getRandomJoke());
  }

  return (
    <>
      <Meta title="Hello! | Shawn Stewart" />

      <section className="z-[9] rounded-b-3xl bg-stone-200 py-6 text-center dark:bg-gray-700">
        <div className="container">
          <Typography className="mb-4" variant="heading">
            <span className="block">{"Hi, I'm Shawn Stewart!"}</span>
            <span className="block">{"I'm a Software Engineer at Domino's."}</span>
          </Typography>

          <EmailMeLink>
            <span className="relative">
              <BellDot className="absolute animate-ping stroke-green-600 outline-green-600 delay-1000" />
              <BellDot className="relative stroke-green-600 outline-green-600" />
            </span>
            Open to work
          </EmailMeLink>
        </div>
      </section>

      <HeadingLevel>
        <WorkHistory />

        <section className="z-[7] -mt-6 flex flex-grow flex-col justify-between bg-stone-200 pt-16 text-center dark:bg-gray-700">
          <div className="mb-16">
            <Typography className="mb-4" variant="heading">
              Tell me about your next project
            </Typography>

            <EmailMeLink>
              <Mail /> Email Me
            </EmailMeLink>
          </div>

          <footer className="container bg-stone-200 text-xs dark:bg-gray-700">
            <div className="flex justify-between py-6">
              <Button onClick={tellJoke} variant="ghost">
                © 2025 Shawn Stewart
              </Button>

              <div className="flex items-center gap-x-2">
                <Link className="flex gap-x-1" target="_blank" to={githubUrl}>
                  <GitHubLogoIcon />
                  GitHub
                </Link>
                <Separator className="bg-gray-400" orientation="vertical" />
                <Link className="flex gap-x-1" target="_blank" to={linkedInUrl}>
                  <LinkedInLogoIcon />
                  LinkedIn
                </Link>
              </div>
            </div>
          </footer>
        </section>
      </HeadingLevel>
    </>
  );
}
