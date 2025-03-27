import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowDown, BellDot, Brain, Mail, Rocket, Sparkles, Terminal, User } from 'lucide-react';
import type { HTMLProps } from 'react';
import { Link } from 'react-router-dom';

import { Meta } from '@/components/Meta';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading, HeadingLevel, Typography } from '@/components/ui/typography';
import { email, githubUrl, linkedInUrl } from '@/config';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { getRandomJoke } from '@/sections/Header/utils';

import bloomTechLogo from '../Portfolio/logos/bloom_tech_logo.png';
import dominosLogo from '../Portfolio/logos/dominos_logo.svg';
import eventbriteLogo from '../Portfolio/logos/eventbrite_logo.svg';
import quarkworksLogo from '../Portfolio/logos/quarkworks_logo.svg';
import saasGridLogo from '../Portfolio/logos/saasgrid_logo.svg';
import tryNowLogo from '../Portfolio/logos/trynow_logo.svg';

const fadeInUp = {
  animate: { opacity: 1, transition: { delay: 0.3, duration: 0.3 }, y: 0 },
  initial: { opacity: 0, y: 20 },
} satisfies Variants;

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.6,
    },
  },
} satisfies Variants;

function EmailMeLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      className={cn(
        buttonVariants({
          className:
            'group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl',
        }),
      )}
      to={`mailto:${email}`}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-transform duration-300 group-hover:translate-x-0" />
    </Link>
  );
}

export function NewPortfolio() {
  const { toast } = useToast();

  function tellJoke() {
    toast(getRandomJoke());
  }

  return (
    <>
      <Meta title="Hey 👋" />

      <HeroSection />

      <HeadingLevel>
        <SkillsSection />

        <WorkHistorySection />

        <ContactSection />
      </HeadingLevel>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Button className="text-white hover:text-gray-300" onClick={tellJoke} variant="ghost">
              © 2025 Shawn Stewart
            </Button>
            <div className="flex gap-4">
              <Link
                className="flex items-center gap-2 text-white transition-colors hover:text-gray-300"
                target="_blank"
                to={githubUrl}
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </Link>
              <Separator className="bg-gray-400" orientation="vertical" />
              <Link
                className="flex items-center gap-2 text-white transition-colors hover:text-gray-300"
                target="_blank"
                to={linkedInUrl}
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh_-_3.75rem)] overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="bg-grid-pattern absolute inset-0 opacity-5" />
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/10" />
      </div>

      <div className="container relative flex min-h-[calc(100vh_-_3.75rem)] flex-col items-center justify-center text-center">
        <motion.div
          animate="animate"
          className="space-y-6"
          initial="initial"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Heading className="text-6xl font-bold leading-tight text-gray-900 lg:text-6xl dark:text-white">
              <span>Hey 👋, I&apos;m</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl text-transparent md:text-6xl">
                Shawn Stewart
              </span>
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <User className="mx-auto my-4 size-20 rounded-full border-4 border-black md:size-40 md:border-8 dark:border-white" />
              </motion.div>
              <span className="block text-4xl text-gray-700 dark:text-gray-300">
                Software Engineer at{' '}
                <span className="bg-gradient-to-br from-gray-700 via-[#0B648F] to-[#E21737] bg-clip-text px-1 text-transparent dark:from-gray-300 dark:via-[#0B648F] dark:to-[#E21737]">
                  Domino&apos;s
                </span>
              </span>
            </Heading>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeInUp}>
            <EmailMeLink>
              <span className="relative mr-2">
                <BellDot className="absolute animate-ping stroke-white outline-white delay-1000 group-hover:hidden" />
                <BellDot className="relative stroke-white outline-white" />
              </span>
              Open to work
            </EmailMeLink>
            <Link
              className={cn(
                buttonVariants({
                  className: 'group rounded-full border-2 hover:bg-gray-100 dark:hover:bg-gray-800',
                  variant: 'outline',
                }),
              )}
              target="_blank"
              to={githubUrl}
            >
              <GitHubLogoIcon className="mr-2 transition-transform group-hover:scale-110" />
              View Projects
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="bg-white py-20 dark:bg-gray-900">
      <div className="container">
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          initial="initial"
          variants={staggerContainer}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <motion.div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800" variants={fadeInUp}>
            <Terminal className="mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
            <Typography className="mb-2" variant="heading">
              Full Stack Development
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300">
              Building scalable applications with modern technologies and best practices
            </Typography>
          </motion.div>

          <motion.div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800" variants={fadeInUp}>
            <Rocket className="mb-4 h-12 w-12 text-purple-600 dark:text-purple-400" />
            <Typography className="mb-2" variant="heading">
              Performance Optimization
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300">
              Creating fast, efficient, and responsive applications that users love
            </Typography>
          </motion.div>

          <motion.div className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800" variants={fadeInUp}>
            <Brain className="mb-4 h-12 w-12 text-pink-600 dark:text-pink-400" />
            <Typography className="mb-2" variant="heading">
              Problem Solving
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300">
              Tackling complex challenges with innovative solutions and clean code
            </Typography>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const logos: HTMLProps<HTMLImageElement>[] = [
  { alt: "Domino's Pizza", className: 'max-w-20 px-2', src: dominosLogo },
  { alt: 'SaaSGrid', className: 'max-w-20', src: saasGridLogo },
  { alt: 'TryNow', className: 'max-w-20', src: tryNowLogo },
  { alt: 'Eventbrite', className: 'max-w-20', src: eventbriteLogo },
  { alt: 'QuarkWorks', className: 'max-w-20', src: quarkworksLogo },
  { alt: 'BloomTech', className: 'max-w-20', src: bloomTechLogo },
];

function WorkHistorySection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container">
        <motion.div
          className="text-center"
          initial="initial"
          variants={staggerContainer}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <motion.div className="mb-4" variants={fadeInUp}>
            <Typography className="flex items-center justify-center gap-2" variant="heading">
              <Sparkles className="inline h-8 w-8 text-yellow-500" />
              Work History
            </Typography>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-900/80"
            variants={fadeInUp}
          >
            <motion.div
              // animate={{
              //   x: [0, '-50%'],
              // }}
              className="flex items-center gap-12"
              transition={{
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {logos.map(({ alt, className, ...props }) => (
                <img
                  key={`first-${alt}`}
                  {...props}
                  alt={alt}
                  className={cn('w-20 max-w-20', className)}
                />
              ))}
              {logos.map(({ alt, className, ...props }) => (
                <img
                  key={`second-${alt}`}
                  {...props}
                  alt={alt}
                  className={cn('w-20 max-w-20', className)}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-white py-20 dark:bg-gray-900">
      <div className="container text-center">
        <motion.div
          className="space-y-8"
          initial="initial"
          variants={staggerContainer}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <motion.div variants={fadeInUp}>
            <Typography className="text-4xl font-bold text-gray-900 dark:text-white">
              Let&apos;s Build Something Amazing Together
            </Typography>
            <Typography className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Have a project in mind? I&apos;d love to hear about it!
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <EmailMeLink>
              <Mail className="mr-2" /> Get in Touch
            </EmailMeLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
