export interface Course {
  id: string;
  name: string;
  subjects: string[];
  description: string;
  university?: string;
  entryRequirements?: string;
  duration?: string;
  careerOpportunities?: string[];
}

export interface Career {
  id: string;
  name: string;
  description: string;
  relatedSubjects: string[];
  commonCourses: string[];
  workEnvironment?: string;
  careerProgression?: string;
}

export const universityDegrees: Course[] = [
  {
    id: "medicine-oxford",
    name: "Medicine",
    university: "University of Oxford",
    subjects: ["biology", "chemistry", "mathematics", "physics"],
    description: "The Medicine course at Oxford provides a well-rounded intellectual training with particular emphasis on the basic science research that underpins medicine.",
    entryRequirements: "A*AA at A Level, including Chemistry and at least one of Biology, Physics, or Mathematics",
    duration: "6 years (including clinical years)",
    careerOpportunities: ["General Practice", "Hospital Medicine", "Medical Research", "Public Health"]
  },
  {
    id: "medicine-cambridge",
    name: "Medicine",
    university: "University of Cambridge",
    subjects: ["biology", "chemistry", "mathematics", "physics"],
    description: "Cambridge's medical course emphasizes the scientific basis of medicine with integrated clinical training from the outset.",
    entryRequirements: "A*A*A at A Level, including Chemistry and two of Biology, Physics, or Mathematics",
    duration: "6 years",
    careerOpportunities: ["Medical Practice", "Academic Medicine", "Clinical Research", "Healthcare Management"]
  },
  {
    id: "computer-science-imperial",
    name: "Computer Science",
    university: "Imperial College London",
    subjects: ["mathematics", "further-mathematics", "computer-science", "physics"],
    description: "Imperial's Computer Science program combines theoretical study with practical skills in software engineering, artificial intelligence, and data science.",
    entryRequirements: "A*A*A at A Level, including Mathematics and Further Mathematics",
    duration: "3-4 years (MEng option available)",
    careerOpportunities: ["Software Engineering", "Data Science", "Cybersecurity", "AI Research"]
  },
  {
    id: "engineering-manchester",
    name: "Mechanical Engineering",
    university: "University of Manchester",
    subjects: ["mathematics", "physics", "further-mathematics", "design-technology"],
    description: "Manchester's Mechanical Engineering program focuses on sustainable engineering solutions with strong industry connections.",
    entryRequirements: "AAA at A Level, including Mathematics and Physics",
    duration: "3-4 years (MEng option available)",
    careerOpportunities: ["Mechanical Engineer", "Energy Sector", "Aerospace", "Automotive Industry"]
  },
  {
    id: "english-durham",
    name: "English Literature",
    university: "Durham University",
    subjects: ["english-literature", "history", "philosophy", "religious-studies"],
    description: "Durham's English Literature degree explores texts across historical periods with opportunities for creative writing and interdisciplinary study.",
    entryRequirements: "A*AA at A Level, including English Literature",
    duration: "3 years",
    careerOpportunities: ["Publishing", "Media", "Teaching", "Marketing and Communications"]
  },
  {
    id: "law-lse",
    name: "Law",
    university: "London School of Economics",
    subjects: ["english-literature", "history", "politics", "philosophy"],
    description: "LSE's Law program provides a rigorous understanding of legal principles within their social, political, and economic contexts.",
    entryRequirements: "A*AA at A Level",
    duration: "3 years",
    careerOpportunities: ["Legal Practice", "Corporate Law", "Public Sector", "International Organizations"]
  },
  {
    id: "economics-ucl",
    name: "Economics",
    university: "University College London",
    subjects: ["economics", "mathematics", "further-mathematics", "politics"],
    description: "UCL's Economics program provides theoretical frameworks and practical tools to analyze complex economic problems.",
    entryRequirements: "A*AA at A Level, including Mathematics",
    duration: "3 years",
    careerOpportunities: ["Economic Consulting", "Banking", "Public Policy", "Data Analysis"]
  },
  {
    id: "psychology-edinburgh",
    name: "Psychology",
    university: "University of Edinburgh",
    subjects: ["psychology", "biology", "mathematics", "sociology"],
    description: "Edinburgh's Psychology program combines scientific study with practical applications of psychological theory.",
    entryRequirements: "AAA at A Level",
    duration: "4 years (Scottish degree system)",
    careerOpportunities: ["Clinical Psychology", "Research", "Human Resources", "Marketing"]
  },
  {
    id: "business-warwick",
    name: "Business Management",
    university: "University of Warwick",
    subjects: ["business-studies", "economics", "mathematics", "accounting"],
    description: "Warwick Business School's Management program combines theoretical frameworks with practical business application.",
    entryRequirements: "AAA at A Level",
    duration: "3 years",
    careerOpportunities: ["Business Consulting", "Financial Services", "Marketing", "Entrepreneurship"]
  },
  {
    id: "architecture-bath",
    name: "Architecture",
    university: "University of Bath",
    subjects: ["art", "mathematics", "physics", "design-technology"],
    description: "Bath's Architecture program focuses on sustainable design with strong industry connections.",
    entryRequirements: "AAA at A Level, including Mathematics or Physics",
    duration: "3 years (Part 1 of architectural qualification)",
    careerOpportunities: ["Architectural Practice", "Urban Planning", "Interior Design", "Construction Management"]
  },
  {
    id: "languages-bristol",
    name: "Modern Languages",
    university: "University of Bristol",
    subjects: ["french", "spanish", "german", "english-literature"],
    description: "Bristol's Modern Languages program includes year abroad opportunities and cultural studies alongside language acquisition.",
    entryRequirements: "AAB at A Level, including at least one modern language",
    duration: "4 years (including year abroad)",
    careerOpportunities: ["Translation", "International Business", "Diplomacy", "Tourism and Hospitality"]
  },
  {
    id: "history-kings",
    name: "History",
    university: "King's College London",
    subjects: ["history", "politics", "english-literature", "philosophy"],
    description: "King's History program emphasizes global perspectives and interdisciplinary approaches to historical study.",
    entryRequirements: "AAA at A Level, including History",
    duration: "3 years",
    careerOpportunities: ["Heritage Sector", "Civil Service", "Journalism", "Education"]
  },
  {
    id: "physics-birmingham",
    name: "Physics with Astrophysics",
    university: "University of Birmingham",
    subjects: ["physics", "mathematics", "further-mathematics", "computer-science"],
    description: "Birmingham's Physics with Astrophysics program combines theoretical physics with observational astronomy.",
    entryRequirements: "A*AA at A Level, including Mathematics and Physics",
    duration: "3-4 years (MSci option available)",
    careerOpportunities: ["Research Scientist", "Data Analysis", "Space Industry", "Scientific Computing"]
  },
  {
    id: "chemistry-york",
    name: "Chemistry with Industrial Experience",
    university: "University of York",
    subjects: ["chemistry", "mathematics", "physics", "biology"],
    description: "York's Chemistry program includes a year in industry with state-of-the-art laboratory facilities.",
    entryRequirements: "AAB at A Level, including Chemistry and Mathematics or Physics",
    duration: "4 years (including placement year)",
    careerOpportunities: ["Chemical Industry", "Pharmaceuticals", "Materials Science", "Environmental Science"]
  },
  {
    id: "biology-sheffield",
    name: "Biological Sciences with Placement Year",
    university: "University of Sheffield",
    subjects: ["biology", "chemistry", "mathematics", "environmental-science"],
    description: "Sheffield's Biological Sciences program offers specialization options and practical research experience.",
    entryRequirements: "AAB at A Level, including Biology and Chemistry",
    duration: "4 years (including placement year)",
    careerOpportunities: ["Biotechnology", "Healthcare", "Conservation", "Scientific Research"]
  },
  {
    id: "geography-nottingham",
    name: "Geography",
    university: "University of Nottingham",
    subjects: ["geography", "biology", "mathematics", "environmental-science"],
    description: "Nottingham's Geography program includes field courses and research projects on environmental and social challenges.",
    entryRequirements: "AAB at A Level, including Geography",
    duration: "3 years",
    careerOpportunities: ["Environmental Management", "Urban Planning", "GIS Specialist", "Conservation"]
  }
];

export const careers = [
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
