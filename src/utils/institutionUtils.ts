
export const getInstitutionType = (universityName: string): string => {
  const name = universityName.toLowerCase();
  if (name.includes("oxford") || name.includes("cambridge") || 
      name.includes("imperial") || name.includes("lse")) {
    return "Top-tier University";
  } else if (name.includes("university")) {
    return "University";
  } else if (name.includes("college")) {
    return "College";
  } else {
    return "Institution";
  }
};

export const getInstitutionColor = (universityName: string): string => {
  const name = universityName.toLowerCase();
  if (name.includes("oxford") || name.includes("cambridge") || 
      name.includes("imperial") || name.includes("lse")) {
    return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
  } else if (name.includes("university")) {
    return "bg-blue-50 text-blue-800 ring-blue-600/20";
  } else if (name.includes("college")) {
    return "bg-green-50 text-green-800 ring-green-600/20";
  } else {
    return "bg-slate-50 text-slate-800 ring-slate-600/20";
  }
};
