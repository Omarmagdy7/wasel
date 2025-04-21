// Simple bullying detection based on keywords
const BULLYING_KEYWORDS = [
  'stupid',
  'idiot',
  'dumb',
  'loser',
  'ugly',
  'fat',
  'hate',
  // Add more keywords as needed
];

export async function checkForBullying(content: string): Promise<{ hasBullying: boolean; reason?: string }> {
  const lowercaseContent = content.toLowerCase();
  
  for (const keyword of BULLYING_KEYWORDS) {
    if (lowercaseContent.includes(keyword)) {
      return {
        hasBullying: true,
        reason: `Content contains inappropriate language: "${keyword}"`
      };
    }
  }
  
  return { hasBullying: false };
}