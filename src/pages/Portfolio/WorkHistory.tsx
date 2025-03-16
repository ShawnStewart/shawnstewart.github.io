import type { HTMLProps } from 'react';

import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import bloomTechLogo from './logos/bloom_tech_logo.png';
import dominosLogo from './logos/dominos_logo.svg';
import eventbriteLogo from './logos/eventbrite_logo.svg';
import quarkworksLogo from './logos/quarkworks_logo.svg';
import saasGridLogo from './logos/saasgrid_logo.svg';
import tryNowLogo from './logos/trynow_logo.svg';

const logos: HTMLProps<HTMLImageElement>[] = [
  { alt: "Domino's Pizza", className: 'h-20', src: dominosLogo },
  { alt: 'SaaSGrid', className: 'h-12', src: saasGridLogo },
  { alt: 'TryNow', className: 'h-12', src: tryNowLogo },
  { alt: 'Eventbrite', className: '-my-12 h-40', src: eventbriteLogo },
  { alt: 'QuarkWorks', className: 'h-12', src: quarkworksLogo },
  { alt: 'BloomTech', className: 'h-12', src: bloomTechLogo },
];

export function WorkHistory() {
  return (
    <section className="container z-[8] -mt-6 rounded-b-3xl bg-background bg-white pb-12 pt-16 text-center dark:text-black">
      <Typography variant="heading">Work history</Typography>
      <div className="relative overflow-y-hidden overflow-x-scroll px-4 py-4 md:flex md:justify-center">
        <div className="relative flex w-max items-center gap-x-12">
          {logos.map(({ alt, className, ...props }) => (
            <img
              {...props}
              alt={alt}
              className={cn('animate-wiggle grayscale hover:grayscale-0', className)}
              key={alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
