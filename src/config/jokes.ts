interface Joke {
  title: string;
  description: string;
}

export const jokes: Joke[] = [
  {
    description: 'Because the light attracts bugs!',
    title: 'Why do programmers prefer dark mode?',
  },
  { description: 'Because he used up all his cache.', title: 'Why did the developer go broke?' },
  { description: 'The Foo Bar.', title: "What's a programmer's favorite hangout place?" },
  { description: "Because they don't C#.", title: 'Why do Java developers wear glasses?' },
  { description: 'It has too many bugs.', title: "Why don't programmers like nature?" },
  { description: 'You console it.', title: 'How do you comfort a JavaScript bug?' },
  { description: 'Inheritance.', title: "What's the object-oriented way to become wealthy?" },
  {
    description: "Those who understand binary and those who don't.",
    title: 'There are 10 types of people in this world. ',
  },
];

export const jokeEmojis = ['😂', '🤣', '😆', '🤭', '💀', '🥁'] as const;
