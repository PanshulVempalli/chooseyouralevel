
import { Course } from "../data/careers";
import { universityDegrees } from "../data/careers";

export type SubjectGrade = {
  subjectId: string;
  grade: string;
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

// Calculate UCAS points (simplified version)
const calculateUcasPoints = (grades: SubjectGrade[]): number => {
  if (!grades || !Array.isArray(grades) || grades.length === 0) {
    return 0;
  }
  
  return grades.reduce((total, sg) => {
    return total + gradeToPoints(sg.grade) * 20; // Simplified UCAS points calculation
  }, 0);
};

// Check if the student meets the minimum grade requirements for a course
const meetsGradeRequirements = (course: Course, grades: SubjectGrade[]): boolean => {
  if (!course || !grades || !Array.isArray(grades) || grades.length === 0) {
    return false;
  }
  
  // For courses with specific grade requirements
  if (course.entryRequirements) {
    const entryReq = course.entryRequirements.toLowerCase();
    
    // Check for required subjects and minimum grades
    let hasRequiredGrades = true;
    
    // Example requirements parsing (simplified)
    // Check for top grades like "AAA" or "A*AA"
    if (entryReq.includes("a*a*a*") || entryReq.includes("a*a*a")) {
      // Count how many A* and A grades the student has
      const topGrades = grades.filter(sg => sg.grade === "A*" || sg.grade === "A").length;
      if (topGrades < 3) return false;
    }
    else if (entryReq.includes("aaa") || entryReq.includes("aab")) {
      // Count how many A and B grades the student has
      const goodGrades = grades.filter(sg => sg.grade === "A*" || sg.grade === "A" || sg.grade === "B").length;
      if (goodGrades < 3) return false;
    }
    else if (entryReq.includes("bbb") || entryReq.includes("bbc")) {
      // Count how many B and C grades the student has
      const moderateGrades = grades.filter(sg => 
        sg.grade === "A*" || sg.grade === "A" || sg.grade === "B" || sg.grade === "C").length;
      if (moderateGrades < 3) return false;
    }
    
    // Check for subject-specific requirements
    // This is simplified; a real implementation would parse requirements more thoroughly
    if (course.subjects && Array.isArray(course.subjects)) {
      course.subjects.forEach(subjectId => {
        const subjectGrade = grades.find(sg => sg.subjectId === subjectId);
        if (!subjectGrade) {
          // Required subject not taken
          hasRequiredGrades = false;
        }
      });
    }
    
    return hasRequiredGrades;
  }
  
  // For courses without specific requirements, check if they have the required subjects
  const courseSubjects = course.subjects && Array.isArray(course.subjects) ? course.subjects : [];
  
  const subjectMatchCount = courseSubjects.filter(subjectId => 
    grades.some(sg => sg.subjectId === subjectId)
  ).length;
  
  // Student needs to have at least some of the recommended subjects
  return subjectMatchCount >= Math.min(2, courseSubjects.length);
};

export const matchGradesToCourses = (
  grades: SubjectGrade[]
): { courses: Course[], ucasPoints: number } => {
  if (!grades || !Array.isArray(grades) || grades.length === 0) {
    return { courses: [], ucasPoints: 0 };
  }

  // Calculate UCAS points
  const ucasPoints = calculateUcasPoints(grades);
  
  // Ensure universityDegrees is an array
  const degreesToMatch = Array.isArray(universityDegrees) ? universityDegrees : [];
  
  // Match courses based on subjects taken and grades achieved
  const matchedCourses = degreesToMatch.filter(course => 
    course && meetsGradeRequirements(course, grades)
  );

  // Sort courses by university reputation (simplified for demo)
  const sortedCourses = [...matchedCourses].sort((a, b) => {
    // Prioritize better-known universities (simplified example)
    const aUniversity = a.university?.toLowerCase() || "";
    const bUniversity = b.university?.toLowerCase() || "";
    
    // Sort by university name as a proxy for reputation (just for demo purposes)
    if (aUniversity.includes("oxford") || aUniversity.includes("cambridge")) return -1;
    if (bUniversity.includes("oxford") || bUniversity.includes("cambridge")) return 1;
    if (aUniversity.includes("imperial") || aUniversity.includes("lse")) return -1;
    if (bUniversity.includes("imperial") || bUniversity.includes("lse")) return 1;
    
    return 0;
  });

  return {
    courses: sortedCourses,
    ucasPoints: ucasPoints
  };
};

export default matchGradesToCourses;
