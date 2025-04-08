
export interface Subject {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const subjects: Subject[] = [
  // Sciences
  { 
    id: "biology", 
    name: "Biology", 
    category: "Sciences",
    description: "Study of living organisms and their interactions with each other and the environment."
  },
  { 
    id: "chemistry", 
    name: "Chemistry", 
    category: "Sciences",
    description: "Study of substances, their properties, structure, and the changes they undergo."
  },
  { 
    id: "physics", 
    name: "Physics", 
    category: "Sciences",
    description: "Study of matter, energy, and the interaction between them."
  },
  { 
    id: "environmental-science", 
    name: "Environmental Science", 
    category: "Sciences",
    description: "Study of environmental systems and human impacts on the natural world."
  },
  
  // Mathematics
  { 
    id: "mathematics", 
    name: "Mathematics", 
    category: "Mathematics",
    description: "Core mathematical concepts including algebra, calculus, trigonometry, and statistics."
  },
  { 
    id: "further-mathematics", 
    name: "Further Mathematics", 
    category: "Mathematics",
    description: "Advanced mathematical topics building on the A-Level Mathematics curriculum."
  },
  { 
    id: "statistics", 
    name: "Statistics", 
    category: "Mathematics",
    description: "Study of the collection, analysis, interpretation, and presentation of data."
  },
  { 
    id: "core-maths", 
    name: "Core Maths", 
    category: "Mathematics",
    description: "Practical mathematical skills for analysis, problem solving, and financial mathematics."
  },

  // Humanities
  { 
    id: "history", 
    name: "History", 
    category: "Humanities",
    description: "Study of past events, particularly human affairs."
  },
  { 
    id: "geography", 
    name: "Geography", 
    category: "Humanities",
    description: "Study of places and relationships between people and their environments."
  },
  { 
    id: "politics", 
    name: "Politics", 
    category: "Humanities",
    description: "Study of governance, political behavior, and systems of government."
  },
  { 
    id: "philosophy-ethics", 
    name: "Philosophy and Ethics", 
    category: "Humanities",
    description: "Study of fundamental questions about existence, knowledge, values, reason, mind, and language."
  },
  { 
    id: "theology", 
    name: "Theology", 
    category: "Humanities",
    description: "Study of religion, religious beliefs, behaviors, and institutions."
  },

  // Languages
  { 
    id: "english-language", 
    name: "English Language", 
    category: "Languages",
    description: "Study of the English language including linguistics, language development, and usage."
  },
  { 
    id: "english-literature", 
    name: "English Literature", 
    category: "Languages",
    description: "Analysis and study of literature, poetry, prose, and drama."
  },
  { 
    id: "english-combined", 
    name: "English Combined", 
    category: "Languages",
    description: "Combined study of English language and literature."
  },
  { 
    id: "french", 
    name: "French", 
    category: "Languages",
    description: "Study of the French language, literature and culture."
  },
  { 
    id: "german", 
    name: "German", 
    category: "Languages",
    description: "Study of the German language, literature and culture."
  },
  { 
    id: "spanish", 
    name: "Spanish", 
    category: "Languages",
    description: "Study of the Spanish language, literature and culture."
  },
  { 
    id: "latin", 
    name: "Latin", 
    category: "Languages",
    description: "Study of the Latin language, literature, and ancient Roman culture."
  },
  { 
    id: "ancient-greek", 
    name: "Ancient Greek", 
    category: "Languages",
    description: "Study of ancient Greek language, literature, and culture."
  },

  // Social Sciences
  { 
    id: "psychology", 
    name: "Psychology", 
    category: "Social Sciences",
    description: "Scientific study of the human mind and behavior."
  },
  { 
    id: "sociology", 
    name: "Sociology", 
    category: "Social Sciences",
    description: "Study of society, patterns of social relationships, and culture."
  },
  { 
    id: "economics", 
    name: "Economics", 
    category: "Social Sciences",
    description: "Study of production, distribution, and consumption of goods and services."
  },

  // Arts
  { 
    id: "fine-art", 
    name: "Fine Art", 
    category: "Arts",
    description: "Practice and study of visual art through various mediums."
  },
  { 
    id: "drama-theatre", 
    name: "Drama and Theatre Studies", 
    category: "Arts",
    description: "Study of performances, texts, and theatrical production."
  },
  { 
    id: "music", 
    name: "Music", 
    category: "Arts",
    description: "Study of musical composition, performance, and theory."
  },
  { 
    id: "dance", 
    name: "Dance", 
    category: "Arts",
    description: "Study and practice of various dance styles, choreography, and performance."
  },
  { 
    id: "textiles", 
    name: "Textiles", 
    category: "Arts",
    description: "Study of fabrics, fibers and design through creative textile practice."
  },
  { 
    id: "digital-photography", 
    name: "Digital Photography", 
    category: "Arts",
    description: "Study of photographic technique, composition, and digital image manipulation."
  },
  
  // Technology and Design
  { 
    id: "computer-science", 
    name: "Computer Science", 
    category: "Technology and Design",
    description: "Study of computers and computational systems, programming, and theory."
  },
  { 
    id: "design-technology", 
    name: "Design and Technology", 
    category: "Technology and Design",
    description: "Designing and making products with creativity and originality."
  },
  { 
    id: "graphics", 
    name: "Graphics", 
    category: "Technology and Design",
    description: "Study of visual communication through graphic design and digital media."
  },

  // Business and Law
  { 
    id: "business-studies", 
    name: "Business Studies", 
    category: "Business and Law",
    description: "Study of business operations, management, and strategy."
  },
  { 
    id: "accounting", 
    name: "Accounting", 
    category: "Business and Law",
    description: "Study of recording financial transactions and financial reporting."
  },
  { 
    id: "law", 
    name: "Law", 
    category: "Business and Law",
    description: "Study of legal systems, principles, and practices."
  },

  // Media and Creative Studies
  { 
    id: "film-studies", 
    name: "Film Studies", 
    category: "Media and Creative Studies",
    description: "Analysis and study of cinema, film-making techniques, and film theory."
  },
  { 
    id: "media-studies", 
    name: "Media Studies", 
    category: "Media and Creative Studies",
    description: "Analysis of media industries, texts, and audiences."
  }
];

export const subjectCategories = [
  "Sciences",
  "Mathematics",
  "Humanities",
  "Languages",
  "Social Sciences",
  "Arts", 
  "Technology and Design",
  "Business and Law",
  "Media and Creative Studies"
];

export default subjects;
