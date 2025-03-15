import { jokeEmojis, jokes } from '@/config/jokes';

let jokeIteration = 0;

export function getRandomJoke() {
  const randomJoke = jokes[jokeIteration % jokes.length];
  const randomEmoji = jokeEmojis[jokeIteration % jokeEmojis.length];
  jokeIteration++;

  return {
    ...randomJoke,
    description: `${randomJoke.description} ${randomEmoji} `,
  };
}
