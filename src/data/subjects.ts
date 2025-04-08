
export interface Subject {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const subjects: Subject[] = [
  // Science
  { 
    id: "mathematics", 
    name: "Mathematics", 
    category: "Science & Mathematics",
    description: "Core mathematical concepts including algebra, calculus, trigonometry, and statistics."
  },
  { 
    id: "further-mathematics", 
    name: "Further Mathematics", 
    category: "Science & Mathematics",
    description: "Advanced mathematical topics building on the A-Level Mathematics curriculum."
  },
  { 
    id: "physics", 
    name: "Physics", 
    category: "Science & Mathematics",
    description: "Study of matter, energy, and the interaction between them."
  },
  { 
    id: "chemistry", 
    name: "Chemistry", 
    category: "Science & Mathematics",
    description: "Study of substances, their properties, structure, and the changes they undergo."
  },
  { 
    id: "biology", 
    name: "Biology", 
    category: "Science & Mathematics",
    description: "Study of living organisms and their interactions with each other and the environment."
  },
  { 
    id: "computer-science", 
    name: "Computer Science", 
    category: "Science & Mathematics",
    description: "Study of computers and computational systems, programming, and theory."
  },

  // Humanities & Social Sciences
  { 
    id: "english-literature", 
    name: "English Literature", 
    category: "Humanities & Social Sciences",
    description: "Analysis and study of literature, poetry, prose, and drama."
  },
  { 
    id: "english-language", 
    name: "English Language", 
    category: "Humanities & Social Sciences",
    description: "Study of the English language including linguistics, language development, and usage."
  },
  { 
    id: "history", 
    name: "History", 
    category: "Humanities & Social Sciences",
    description: "Study of past events, particularly human affairs."
  },
  { 
    id: "geography", 
    name: "Geography", 
    category: "Humanities & Social Sciences",
    description: "Study of places and relationships between people and their environments."
  },
  { 
    id: "psychology", 
    name: "Psychology", 
    category: "Humanities & Social Sciences",
    description: "Scientific study of the human mind and behavior."
  },
  { 
    id: "sociology", 
    name: "Sociology", 
    category: "Humanities & Social Sciences",
    description: "Study of society, patterns of social relationships, and culture."
  },
  { 
    id: "politics", 
    name: "Politics", 
    category: "Humanities & Social Sciences",
    description: "Study of governance, political behavior, and systems of government."
  },
  { 
    id: "religious-studies", 
    name: "Religious Studies", 
    category: "Humanities & Social Sciences",
    description: "Study of religious beliefs, behaviors, and institutions."
  },
  { 
    id: "philosophy", 
    name: "Philosophy", 
    category: "Humanities & Social Sciences",
    description: "Study of fundamental questions about existence, knowledge, values, reason, mind, and language."
  },

  // Languages
  { 
    id: "french", 
    name: "French", 
    category: "Languages",
    description: "Study of the French language, literature and culture."
  },
  { 
    id: "spanish", 
    name: "Spanish", 
    category: "Languages",
    description: "Study of the Spanish language, literature and culture."
  },
  { 
    id: "german", 
    name: "German", 
    category: "Languages",
    description: "Study of the German language, literature and culture."
  },
  { 
    id: "latin", 
    name: "Latin", 
    category: "Languages",
    description: "Study of the Latin language, literature, and ancient Roman culture."
  },
  
  // Creative & Practical
  { 
    id: "art", 
    name: "Art & Design", 
    category: "Creative & Practical",
    description: "Visual expression, techniques, and art history across various mediums."
  },
  { 
    id: "drama", 
    name: "Drama & Theatre Studies", 
    category: "Creative & Practical",
    description: "Study of performances, texts, and theatrical production."
  },
  { 
    id: "music", 
    name: "Music", 
    category: "Creative & Practical",
    description: "Study of musical composition, performance, and theory."
  },
  { 
    id: "media-studies", 
    name: "Media Studies", 
    category: "Creative & Practical",
    description: "Analysis of media industries, texts, and audiences."
  },
  { 
    id: "design-technology", 
    name: "Design & Technology", 
    category: "Creative & Practical",
    description: "Designing and making products with creativity and originality."
  },
  
  // Business & Economics
  { 
    id: "economics", 
    name: "Economics", 
    category: "Business & Economics",
    description: "Study of production, distribution, and consumption of goods and services."
  },
  { 
    id: "business-studies", 
    name: "Business Studies", 
    category: "Business & Economics",
    description: "Study of business operations, management, and strategy."
  },
  { 
    id: "accounting", 
    name: "Accounting", 
    category: "Business & Economics",
    description: "Study of recording financial transactions and financial reporting."
  }
];

export const subjectCategories = [
  "Science & Mathematics",
  "Humanities & Social Sciences",
  "Languages",
  "Creative & Practical",
  "Business & Economics"
];

export default subjects;
