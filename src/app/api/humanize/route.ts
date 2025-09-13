import { NextRequest, NextResponse } from 'next/server';

interface HumanizeRequest {
  text: string;
  mode?: string;
}

// Mock humanization patterns and transformations
const humanizationPatterns = [
  // AI pattern replacements
  { pattern: /\bIn conclusion,/gi, replacement: 'To wrap up,' },
  { pattern: /\bFurthermore,/gi, replacement: 'What\'s more,' },
  { pattern: /\bMoreover,/gi, replacement: 'Plus,' },
  { pattern: /\bHowever,/gi, replacement: 'But,' },
  { pattern: /\bNevertheless,/gi, replacement: 'Still,' },
  { pattern: /\bConsequently,/gi, replacement: 'As a result,' },
  { pattern: /\bTherefore,/gi, replacement: 'So,' },
  { pattern: /\bAdditionally,/gi, replacement: 'Also,' },
  { pattern: /\bSubsequently,/gi, replacement: 'After that,' },
  { pattern: /\bUltimately,/gi, replacement: 'In the end,' },
  
  // Sentence structure variations
  { pattern: /\bIt is important to note that/gi, replacement: 'Worth mentioning that' },
  { pattern: /\bIt should be noted that/gi, replacement: 'Keep in mind that' },
  { pattern: /\bIt is worth mentioning that/gi, replacement: 'I should point out that' },
  { pattern: /\bIt is crucial to understand that/gi, replacement: 'Here\'s the thing -' },
  { pattern: /\bIt is essential to recognize that/gi, replacement: 'What\'s key is that' },
  
  // Formal to casual transitions
  { pattern: /\bOne must consider/gi, replacement: 'You should think about' },
  { pattern: /\bOne should take into account/gi, replacement: 'Don\'t forget to consider' },
  { pattern: /\bIt is recommended that/gi, replacement: 'I\'d suggest' },
  { pattern: /\bIt is advisable to/gi, replacement: 'You might want to' },
  { pattern: /\bIt is beneficial to/gi, replacement: 'It helps to' },
];

const contractionsAndVariations = [
  { pattern: /\bdo not\b/gi, replacement: 'don\'t' },
  { pattern: /\bcannot\b/gi, replacement: 'can\'t' },
  { pattern: /\bwill not\b/gi, replacement: 'won\'t' },
  { pattern: /\bis not\b/gi, replacement: 'isn\'t' },
  { pattern: /\bare not\b/gi, replacement: 'aren\'t' },
  { pattern: /\bwas not\b/gi, replacement: 'wasn\'t' },
  { pattern: /\bwere not\b/gi, replacement: 'weren\'t' },
  { pattern: /\bhave not\b/gi, replacement: 'haven\'t' },
  { pattern: /\bhas not\b/gi, replacement: 'hasn\'t' },
  { pattern: /\bhad not\b/gi, replacement: 'hadn\'t' },
  { pattern: /\bwould not\b/gi, replacement: 'wouldn\'t' },
  { pattern: /\bshould not\b/gi, replacement: 'shouldn\'t' },
  { pattern: /\bcould not\b/gi, replacement: 'couldn\'t' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function addRandomVariations(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences.map(sentence => {
    // Randomly add filler words or phrases
    if (Math.random() < 0.3) {
      const fillers = [
        'Well, ',
        'Actually, ',
        'You know, ',
        'I mean, ',
        'Honestly, ',
        'To be fair, ',
        'Look, ',
        'Here\'s the thing - ',
      ];
      const randomFiller = fillers[Math.floor(Math.random() * fillers.length)];
      
      // Only add if sentence doesn't already start with a filler
      if (!sentence.match(/^(Well|Actually|You know|I mean|Honestly|To be fair|Look|Here's)/i)) {
        return randomFiller + sentence.charAt(0).toLowerCase() + sentence.slice(1);
      }
    }
    
    return sentence;
  }).join(' ');
}

function humanizeText(text: string): string {
  let humanizedText = text;
  
  // Apply humanization patterns
  const shuffledPatterns = shuffleArray([...humanizationPatterns, ...contractionsAndVariations]);
  
  shuffledPatterns.forEach(({ pattern, replacement }) => {
    if (Math.random() < 0.7) { // 70% chance to apply each pattern
      humanizedText = humanizedText.replace(pattern, replacement);
    }
  });
  
  // Add random variations and fillers
  humanizedText = addRandomVariations(humanizedText);
  
  // Fix any double spaces
  humanizedText = humanizedText.replace(/\s{2,}/g, ' ');
  
  // Ensure proper capitalization after sentence breaks
  humanizedText = humanizedText.replace(/([.!?])\s*([a-z])/g, (_, punctuation, letter) => {
    return punctuation + ' ' + letter.toUpperCase();
  });
  
  return humanizedText.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as HumanizeRequest;
    const { text, mode = 'standard' } = body;

    // Validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Text must be less than 5000 characters' },
        { status: 400 }
      );
    }

    if (text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text cannot be empty' },
        { status: 400 }
      );
    }

    // Simulate processing delay (1-3 seconds)
    const processingDelay = Math.random() * 2000 + 1000;
    await new Promise(resolve => setTimeout(resolve, processingDelay));

    // Humanize the text
    const humanizedText = humanizeText(text);

    // Calculate confidence score based on changes made
    const originalWords = text.split(/\s+/).length;
    const changedWords = text.split(/\s+/).filter((word, index) => {
      const humanizedWords = humanizedText.split(/\s+/);
      return humanizedWords[index] !== word;
    }).length;
    
    const confidence = Math.min(95, Math.max(75, 100 - (changedWords / originalWords) * 20));

    return NextResponse.json({
      humanizedText,
      originalLength: text.length,
      humanizedLength: humanizedText.length,
      confidence: Math.round(confidence),
      detectionBypass: confidence > 80 ? 'High' : confidence > 60 ? 'Medium' : 'Low',
      processingTime: Math.round(processingDelay),
    });

  } catch (error) {
    console.error('Error in humanize API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}