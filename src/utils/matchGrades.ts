
import { Course } from "../data/careers";
import { universityDegrees } from "../data/careers";

export type SubjectGrade = {
  subjectId: string;
  grade: string;
};

export type ExtraCurricular = {
  activityId: string;
  name: string;
  pointsValue: number;
};

// Function to convert grade to numerical value for comparison
const gradeToPoints = (grade: string): number => {
  switch (grade) {
    case "A*": return 6;
    case "A": return 5;
    case "B": return 4;
    case "C": return 3;
    case "D": return 2;
    case "E": return 1;
    default: return 0; // U or ungraded
  }
};

// Calculate UCAS points from A-level grades
const calculateGradeUcasPoints = (grades: SubjectGrade[]): number => {
  if (!grades || !Array.isArray(grades) || grades.length === 0) {
    return 0;
  }
  
  return grades.reduce((total, sg) => {
    return total + gradeToPoints(sg.grade) * 20; // Simplified UCAS points calculation
  }, 0);
};

// Calculate total UCAS points including extracurricular activities
const calculateTotalUcasPoints = (
  grades: SubjectGrade[], 
  extraActivities: ExtraCurricular[]
): number => {
  const gradePoints = calculateGradeUcasPoints(grades);
  const extraPoints = extraActivities.reduce((total, activity) => {
    return total + activity.pointsValue;
  }, 0);
  
  return gradePoints + extraPoints;
};

// Check if student has the required subjects with minimum grades
const hasRequiredSubjects = (course: Course, grades: SubjectGrade[]): boolean => {
  if (!course.requiredSubjects || course.requiredSubjects.length === 0) {
    return true; // No required subjects specified
  }
  
  // Check each required subject
  for (const requiredSubject of course.requiredSubjects) {
    const studentGrade = grades.find(sg => sg.subjectId === requiredSubject.id);
    
    // If student doesn't have the subject or grade is below minimum
    if (!studentGrade || gradeToPoints(studentGrade.grade) < gradeToPoints(requiredSubject.minGrade)) {
      return false;
    }
  }
  
  return true;
}

// Check if the student meets the minimum grade requirements for a course
const meetsGradeRequirements = (course: Course, grades: SubjectGrade[]): boolean => {
  if (!course || !grades || !Array.isArray(grades) || grades.length === 0) {
    return false;
  }
  
  // First check if student has all required subjects with minimum grades
  if (!hasRequiredSubjects(course, grades)) {
    return false;
  }
  
  // For courses with specific grade requirements
  if (course.entryRequirements) {
    const entryReq = course.entryRequirements.toLowerCase();
    
    // Count grades by level
    const gradeCount = {
      astar: grades.filter(sg => sg.grade === "A*").length,
      a: grades.filter(sg => sg.grade === "A").length,
      b: grades.filter(sg => sg.grade === "B").length,
      c: grades.filter(sg => sg.grade === "C").length,
      d: grades.filter(sg => sg.grade === "D").length,
      e: grades.filter(sg => sg.grade === "E").length
    };
    
    const totalPoints = calculateGradeUcasPoints(grades);
    
    // More strict checks for universities with high requirements
    
    // Check for Oxford, Cambridge, etc. requiring A*A*A* or A*A*A
    if (entryReq.includes("a*a*a*")) {
      return gradeCount.astar >= 3;
    }
    else if (entryReq.includes("a*a*a")) {
      return gradeCount.astar >= 2 && (gradeCount.astar + gradeCount.a) >= 3;
    }
    // Check for AAA requirements
    else if (entryReq.includes("aaa") && !entryReq.includes("aab")) {
      return (gradeCount.a + gradeCount.astar) >= 3;
    }
    // Check for AAB requirements
    else if (entryReq.includes("aab")) {
      return (gradeCount.a + gradeCount.astar) >= 2 && 
             (gradeCount.a + gradeCount.astar + gradeCount.b) >= 3;
    }
    // Check for ABB requirements
    else if (entryReq.includes("abb")) {
      return (gradeCount.a + gradeCount.astar) >= 1 && 
             (gradeCount.a + gradeCount.astar + gradeCount.b) >= 3 &&
             gradeCount.b >= 1;
    }
    // Check for BBB requirements
    else if (entryReq.includes("bbb")) {
      return gradeCount.b >= 3 || 
            ((gradeCount.b + gradeCount.a + gradeCount.astar) >= 3 && 
             (gradeCount.a + gradeCount.astar + gradeCount.b) >= gradeCount.c);
    }
    // Check for BBC requirements
    else if (entryReq.includes("bbc")) {
      return gradeCount.b >= 2 && 
             (gradeCount.b + gradeCount.c + gradeCount.a + gradeCount.astar) >= 3;
    }
    // Check for CCC requirements
    else if (entryReq.includes("ccc")) {
      return gradeCount.c >= 3 || 
            ((gradeCount.c + gradeCount.b + gradeCount.a + gradeCount.astar) >= 3 && 
             (gradeCount.b + gradeCount.a + gradeCount.astar) >= 1);
    }
    // Check for CCD requirements
    else if (entryReq.includes("ccd")) {
      return gradeCount.c >= 2 && 
             (gradeCount.c + gradeCount.d + gradeCount.b + gradeCount.a + gradeCount.astar) >= 3;
    }
    // For entry requirements with just minimum UCAS points
    else if (entryReq.includes("ucas") || entryReq.includes("points")) {
      // Extract the required points if available
      const pointsMatch = entryReq.match(/(\d+)\s*(?:points|ucas)/i);
      if (pointsMatch && pointsMatch[1]) {
        const requiredPoints = parseInt(pointsMatch[1], 10);
        return totalPoints >= requiredPoints;
      }
    }
    
    // If no specific grade pattern matched, check average grade point
    const avgGradePoints = grades.reduce((sum, sg) => sum + gradeToPoints(sg.grade), 0) / grades.length;
    
    // Check for recommended subjects if specified (now separate from required)
    if (course.recommendedSubjects && Array.isArray(course.recommendedSubjects) && course.recommendedSubjects.length > 0) {
      const matchedSubjects = course.recommendedSubjects.filter(subject => 
        grades.some(sg => sg.subjectId === subject)
      ).length;
      
      // For higher demanding courses, prefer more subject matches
      if (entryReq.includes("a*") || entryReq.includes("aaa")) {
        if (avgGradePoints < 5 || matchedSubjects < Math.ceil(course.recommendedSubjects.length * 0.5)) {
          return false;
        }
      } 
      // For average courses, be more lenient with subject matching
      else if (entryReq.includes("bbb") || entryReq.includes("bbc")) {
        if (avgGradePoints < 4 || matchedSubjects < Math.ceil(course.recommendedSubjects.length * 0.3)) {
          return false;
        }
      }
    }
    
    // If it's a high requirement course, ensure average grade is sufficient
    if (entryReq.includes("a*") || entryReq.includes("aaa")) {
      return avgGradePoints >= 5;
    } 
    // For mid-tier requirements
    else if (entryReq.includes("bbb") || entryReq.includes("abb")) {
      return avgGradePoints >= 4;
    }
    
    return avgGradePoints >= 3;
  }
  
  // For courses without specific requirements, be more inclusive
  const avgGradePoints = grades.reduce((sum, sg) => sum + gradeToPoints(sg.grade), 0) / grades.length;
  
  // Match courses based on average grade points
  // Lower-tier courses accept average grades of C (3 points) and above
  if (avgGradePoints >= 3) {
    // More lenient subject matching for average grades
    if (!course.recommendedSubjects || course.recommendedSubjects.length === 0) return true;
    
    const subjectMatchCount = course.recommendedSubjects.filter(subject => 
      grades.some(sg => sg.subjectId === subject)
    ).length;
    
    // Student needs to have at least some of the recommended subjects
    return subjectMatchCount >= Math.min(1, course.recommendedSubjects.length);
  }
  
  return false;
};

// Determine the region of a university
const getUniversityRegion = (universityName: string): string => {
  const name = universityName ? universityName.toLowerCase() : "";
  
  // UK regions
  if (name.includes("london") || name.includes("imperial") || name.includes("ucl") || name.includes("kings college") || name.includes("lse")) {
    return "London, UK";
  } else if (name.includes("oxford") || name.includes("cambridge")) {
    return "Oxbridge, UK";
  } else if (name.includes("edinburgh") || name.includes("glasgow") || name.includes("st andrews")) {
    return "Scotland, UK";
  } else if (name.includes("cardiff") || name.includes("swansea")) {
    return "Wales, UK";
  } else if (name.includes("belfast") || name.includes("ulster")) {
    return "Northern Ireland, UK";
  } else if (name.includes("manchester") || name.includes("liverpool") || name.includes("leeds") || name.includes("sheffield") || name.includes("newcastle")) {
    return "Northern England, UK";
  } else if (name.includes("birmingham") || name.includes("nottingham") || name.includes("leicester") || name.includes("warwick")) {
    return "Midlands, UK";
  } else if (name.includes("bristol") || name.includes("exeter") || name.includes("bath") || name.includes("southampton")) {
    return "Southern England, UK";
  } 
  // International regions
  else if (name.includes("harvard") || name.includes("princeton") || name.includes("yale") || name.includes("stanford") || name.includes("mit")) {
    return "USA - Ivy League/Top Tier";
  } else if (name.includes("sorbonne") || name.includes("heidelberg") || name.includes("bologna")) {
    return "Continental Europe";
  } else if (name.includes("toronto") || name.includes("mcgill") || name.includes("ubc")) {
    return "Canada";
  } else if (name.includes("sydney") || name.includes("melbourne") || name.includes("auckland")) {
    return "Australia/New Zealand";
  } else if (name.includes("singapore") || name.includes("hong kong") || name.includes("tokyo")) {
    return "East Asia";
  }
  
  // Default for UK universities
  if (name.includes("university") && !name.includes("college") && !name.includes("school")) {
    return "UK";
  }
  
  return "Other";
};

// Function to get university tier based on entry requirements
const getUniversityTier = (course: Course): number => {
  if (!course || !course.entryRequirements) return 3; // Default to mid-tier
  
  const entryReq = course.entryRequirements.toLowerCase();
  
  // Top tier universities (Russell Group/Oxbridge equivalent)
  if (entryReq.includes("a*a*a") || 
      (course.university && 
       (course.university.toLowerCase().includes("oxford") || 
        course.university.toLowerCase().includes("cambridge") || 
        course.university.toLowerCase().includes("imperial") || 
        course.university.toLowerCase().includes("lse")))) {
    return 1;
  }
  
  // Upper-mid tier (Good universities with strong requirements)
  if (entryReq.includes("aaa") || entryReq.includes("aab") || 
      (course.university && course.university.toLowerCase().includes("russell"))) {
    return 2;
  }
  
  // Mid-tier (Solid universities with moderate requirements)
  if (entryReq.includes("abb") || entryReq.includes("bbb") || entryReq.includes("bbc")) {
    return 3;
  }
  
  // Lower-mid tier (Universities with more accessible requirements)
  if (entryReq.includes("bcc") || entryReq.includes("ccc")) {
    return 4;
  }
  
  // Lower tier (Most accessible higher education options)
  return 5;
};

export const matchGradesToCourses = (
  grades: SubjectGrade[],
  extraActivities: ExtraCurricular[] = [],
  regionPreference?: string
): { courses: Course[], ucasPoints: number } => {
  if (!grades || !Array.isArray(grades) || grades.length === 0) {
    return { courses: [], ucasPoints: 0 };
  }

  // Calculate total UCAS points including extracurricular activities
  const ucasPoints = calculateTotalUcasPoints(grades, extraActivities);
  
  // Ensure universityDegrees is an array
  const degreesToMatch = Array.isArray(universityDegrees) ? universityDegrees : [];
  
  // Match courses based on subjects taken and grades achieved
  const matchedCourses = degreesToMatch.filter(course => 
    course && meetsGradeRequirements(course, grades)
  );

  // Sort courses by relevance to student's grades and region preference
  const sortedCourses = [...matchedCourses].sort((a, b) => {
    // Calculate average grade value for student
    const avgGradePoints = grades.reduce((sum, sg) => sum + gradeToPoints(sg.grade), 0) / grades.length;
    
    // Get university tiers
    const aTier = getUniversityTier(a);
    const bTier = getUniversityTier(b);
    
    // Get university regions
    const aRegion = getUniversityRegion(a.university || "");
    const bRegion = getUniversityRegion(b.university || "");
    
    // If there's a region preference, prioritize courses in that region
    if (regionPreference) {
      if (aRegion.includes(regionPreference) && !bRegion.includes(regionPreference)) return -1;
      if (!aRegion.includes(regionPreference) && bRegion.includes(regionPreference)) return 1;
    }
    
    // For high achieving students (A*/A average)
    if (avgGradePoints >= 5) {
      // Prioritize top-tier universities
      if (aTier < bTier) return -1;
      if (aTier > bTier) return 1;
    }
    // For good students (B average)
    else if (avgGradePoints >= 4) {
      // Prioritize mid-to-upper-tier universities
      if (aTier === 2 || aTier === 3) return -1;
      if (bTier === 2 || bTier === 3) return 1;
    }
    // For average students (C average)
    else if (avgGradePoints >= 3) {
      // Prioritize mid-to-lower-tier universities
      if (aTier === 3 || aTier === 4) return -1;
      if (bTier === 3 || bTier === 4) return 1;
    }
    // For lower achieving students
    else {
      // Prioritize lower-tier universities
      if (aTier > bTier) return -1;
      if (aTier < bTier) return 1;
    }
    
    return 0;
  });

  return {
    courses: sortedCourses,
    ucasPoints: ucasPoints
  };
};

export default matchGradesToCourses;
