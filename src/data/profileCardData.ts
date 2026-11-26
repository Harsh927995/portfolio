export interface ProfileScrapbookData {
  aboutItems: string[];
  badgeTop: string;
  badgeYear: string;
  mantraQuote: string;
  stackItems: string[];
  likesItems: string[];
}

export const PROFILE_SCRAPBOOK_DATA: ProfileScrapbookData = {
  aboutItems: [
    'Harsh Kashyap',
    'B.Tech CSE • Chaibasa',
    'Frontend Architect',
    'React & GenAI Builder',
  ],
  badgeTop: 'B.Tech',
  badgeYear: '2027',
  mantraQuote: '“Build cleanly, ship fast, learn endlessly.”',
  stackItems: ['React.js & Vite', 'TypeScript', 'Tailwind CSS', 'Python & AI'],
  likesItems: ['Clean UI', 'Coffee', 'Hackathons', 'Open Source'],
};
