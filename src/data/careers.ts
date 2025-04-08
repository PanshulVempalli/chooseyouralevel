
export interface Course {
  id: string;
  name: string;
  subjects: string[];
  description: string;
  careerOpportunities?: string[]; // Added this property as optional
}

export interface Career {
  id: string;
  name: string;
  description: string;
  relatedSubjects: string[];
  commonCourses: string[];
  workEnvironment?: string; // Added this property as optional
  careerProgression?: string; // Added this property as optional
}

export const universityDegrees: Course[] = [
  {
    id: "medicine",
    name: "Medicine",
    subjects: ["biology", "chemistry", "mathematics", "physics"],
    description: "Medicine is the study and practice of the diagnosis, prognosis, treatment, and prevention of disease."
  },
  {
    id: "law",
    name: "Law",
    subjects: ["english-literature", "history", "politics", "philosophy"],
    description: "Law studies focus on legal systems, regulations, and preparing students for careers in legal practice."
  },
  {
    id: "engineering",
    name: "Engineering",
    subjects: ["mathematics", "physics", "further-mathematics", "computer-science", "chemistry"],
    description: "Engineering programs focus on applying scientific and mathematical principles to design and develop solutions to technical problems."
  },
  {
    id: "computer-science-degree",
    name: "Computer Science",
    subjects: ["mathematics", "physics", "further-mathematics", "computer-science"],
    description: "Computer Science programs cover programming, algorithms, data structures, artificial intelligence, and software development."
  },
  {
    id: "english-literature-degree",
    name: "English Literature",
    subjects: ["english-literature", "history", "philosophy", "religious-studies"],
    description: "English Literature degrees involve the study and analysis of texts from different periods and genres."
  },
  {
    id: "economics-degree",
    name: "Economics",
    subjects: ["economics", "mathematics", "further-mathematics", "politics"],
    description: "Economics degrees examine the production, distribution, and consumption of goods and services."
  },
  {
    id: "psychology-degree",
    name: "Psychology",
    subjects: ["psychology", "biology", "mathematics", "sociology"],
    description: "Psychology programs study human behavior and mental processes through scientific research and observation."
  },
  {
    id: "business-management",
    name: "Business Management",
    subjects: ["business-studies", "economics", "mathematics", "accounting"],
    description: "Business Management degrees focus on organizational leadership, strategy, marketing, and operations."
  },
  {
    id: "architecture",
    name: "Architecture",
    subjects: ["art", "mathematics", "physics", "design-technology"],
    description: "Architecture programs involve the study of designing buildings and other structures, combining art and science."
  },
  {
    id: "foreign-languages",
    name: "Modern Languages",
    subjects: ["french", "spanish", "german", "english-literature"],
    description: "Modern Languages degrees focus on language proficiency, literature, and cultural understanding."
  },
  {
    id: "history-degree",
    name: "History",
    subjects: ["history", "politics", "english-literature", "philosophy"],
    description: "History degrees involve studying past events and their significance to understand the present."
  },
  {
    id: "physics-degree",
    name: "Physics",
    subjects: ["physics", "mathematics", "further-mathematics", "chemistry"],
    description: "Physics degrees focus on understanding the fundamental laws that govern the universe."
  },
  {
    id: "chemistry-degree",
    name: "Chemistry",
    subjects: ["chemistry", "mathematics", "physics", "biology"],
    description: "Chemistry degrees study substances, their properties, and how they interact with each other."
  },
  {
    id: "biology-degree",
    name: "Biological Sciences",
    subjects: ["biology", "chemistry", "mathematics", "psychology"],
    description: "Biological Sciences programs cover all aspects of living organisms, from molecules to ecosystems."
  },
  {
    id: "geography-degree",
    name: "Geography",
    subjects: ["geography", "mathematics", "biology", "economics"],
    description: "Geography degrees examine the Earth's physical features, atmosphere, and human activity."
  }
];

export const careers: Career[] = [
  {
    id: "doctor",
    name: "Doctor/Medical Professional",
    description: "Diagnose and treat patients in various medical settings, specializing in specific areas of medicine.",
    relatedSubjects: ["biology", "chemistry", "mathematics", "physics"],
    commonCourses: ["medicine"]
  },
  {
    id: "lawyer",
    name: "Lawyer/Legal Professional",
    description: "Provide legal advice and representation to individuals, businesses, or organizations.",
    relatedSubjects: ["english-literature", "history", "politics"],
    commonCourses: ["law"]
  },
  {
    id: "engineer",
    name: "Engineer",
    description: "Design, develop, and maintain structures, machines, systems, and processes across various industries.",
    relatedSubjects: ["mathematics", "physics", "further-mathematics", "chemistry"],
    commonCourses: ["engineering"]
  },
  {
    id: "software-developer",
    name: "Software Developer",
    description: "Design, code, test, and maintain software applications and systems.",
    relatedSubjects: ["computer-science", "mathematics", "further-mathematics"],
    commonCourses: ["computer-science-degree"]
  },
  {
    id: "teacher",
    name: "Teacher/Educator",
    description: "Educate students at various levels, from primary school through university.",
    relatedSubjects: ["english-literature", "english-language", "mathematics", "biology", "chemistry", "physics", "history"],
    commonCourses: ["subject-specific education degrees"]
  },
  {
    id: "accountant",
    name: "Accountant/Financial Analyst",
    description: "Analyze financial information, prepare financial reports, and provide financial advice.",
    relatedSubjects: ["mathematics", "accounting", "economics", "business-studies"],
    commonCourses: ["accounting", "finance", "economics-degree"]
  },
  {
    id: "psychologist",
    name: "Psychologist",
    description: "Study human behavior and mental processes, and help people overcome challenges and disorders.",
    relatedSubjects: ["psychology", "biology", "sociology"],
    commonCourses: ["psychology-degree"]
  },
  {
    id: "business-manager",
    name: "Business Manager/Executive",
    description: "Plan, direct, and coordinate operational activities in organizations.",
    relatedSubjects: ["business-studies", "economics", "mathematics"],
    commonCourses: ["business-management"]
  },
  {
    id: "architect",
    name: "Architect",
    description: "Design buildings and structures, considering aesthetics, function, and safety.",
    relatedSubjects: ["mathematics", "physics", "art", "design-technology"],
    commonCourses: ["architecture"]
  },
  {
    id: "translator",
    name: "Translator/Interpreter",
    description: "Convert written or spoken content from one language to another.",
    relatedSubjects: ["french", "spanish", "german", "english-language"],
    commonCourses: ["foreign-languages"]
  }
];

export default { universityDegrees, careers };
