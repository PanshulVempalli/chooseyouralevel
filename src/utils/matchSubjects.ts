
import { Subject } from "../data/subjects";
import { Course, Career } from "../data/careers";
import { universityDegrees, careers } from "../data/careers";

export interface MatchResult {
  courses: Course[];
  careers: Career[];
}

export const matchSubjectsToPathways = (selectedSubjects: string[]): MatchResult => {
  if (!selectedSubjects || selectedSubjects.length === 0) {
    return { courses: [], careers: [] };
  }

  // Match courses that have at least 2 of the selected subjects
  const matchedCourses = universityDegrees.filter(course => {
    const matchCount = course.subjects.filter(subject => 
      selectedSubjects.includes(subject)
    ).length;
    
    // Return courses where at least 2 of the selected subjects match
    // or all subjects match if the user selected less than 3
    return matchCount >= Math.min(2, selectedSubjects.length);
  });

  // Sort courses by relevance (number of matching subjects)
  const sortedCourses = [...matchedCourses].sort((a, b) => {
    const aMatchCount = a.subjects.filter(subject => selectedSubjects.includes(subject)).length;
    const bMatchCount = b.subjects.filter(subject => selectedSubjects.includes(subject)).length;
    return bMatchCount - aMatchCount;
  });

  // Match careers that have at least 2 of the selected subjects (updated from 1 to 2)
  const matchedCareers = careers.filter(career => {
    const matchCount = career.relatedSubjects.filter(subject => 
      selectedSubjects.includes(subject)
    ).length;
    
    return matchCount >= Math.min(2, selectedSubjects.length); // Changed from 1 to match the same logic as courses
  });

  // Sort careers by relevance (number of matching subjects)
  const sortedCareers = [...matchedCareers].sort((a, b) => {
    const aMatchCount = a.relatedSubjects.filter(subject => selectedSubjects.includes(subject)).length;
    const bMatchCount = b.relatedSubjects.filter(subject => selectedSubjects.includes(subject)).length;
    return bMatchCount - aMatchCount;
  });

  return {
    courses: sortedCourses,
    careers: sortedCareers
  };
};

export default matchSubjectsToPathways;
