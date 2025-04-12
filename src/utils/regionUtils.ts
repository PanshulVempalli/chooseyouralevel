
export const regions = [
  { value: "none", label: "No preference" },
  { value: "UK", label: "United Kingdom (all)" },
  { value: "London, UK", label: "London" },
  { value: "Oxbridge, UK", label: "Oxford & Cambridge" },
  { value: "Scotland, UK", label: "Scotland" },
  { value: "Northern England, UK", label: "Northern England" },
  { value: "Midlands, UK", label: "Midlands" },
  { value: "Southern England, UK", label: "Southern England" },
  { value: "Wales, UK", label: "Wales" },
  { value: "Northern Ireland, UK", label: "Northern Ireland" },
  { value: "USA", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Continental Europe", label: "Europe" },
  { value: "Australia/New Zealand", label: "Australia/New Zealand" },
  { value: "East Asia", label: "East Asia" },
  { value: "Other", label: "Other international" },
];

// Determine the region of a university
export const getUniversityRegion = (universityName: string): string => {
  if (!universityName) return "Other";
  
  const name = universityName.toLowerCase();
  
  if (name.includes("london") || name.includes("imperial") || name.includes("ucl") || 
      name.includes("kings college") || name.includes("lse") || name.includes("queen mary") ||
      name.includes("royal holloway") || name.includes("goldsmiths")) {
    return "London, UK";
  } else if (name.includes("oxford") || name.includes("cambridge")) {
    return "Oxbridge, UK";
  } else if (name.includes("edinburgh") || name.includes("glasgow") || 
             name.includes("st andrews") || name.includes("aberdeen") || 
             name.includes("strathclyde") || name.includes("dundee")) {
    return "Scotland, UK";
  } else if (name.includes("cardiff") || name.includes("swansea") || 
             name.includes("aberystwyth") || name.includes("bangor")) {
    return "Wales, UK";
  } else if (name.includes("belfast") || name.includes("ulster")) {
    return "Northern Ireland, UK";
  } else if (name.includes("manchester") || name.includes("liverpool") || 
             name.includes("leeds") || name.includes("sheffield") || 
             name.includes("newcastle") || name.includes("durham") ||
             name.includes("york") || name.includes("lancaster")) {
    return "Northern England, UK";
  } else if (name.includes("birmingham") || name.includes("nottingham") || 
             name.includes("leicester") || name.includes("warwick") ||
             name.includes("loughborough") || name.includes("keele") ||
             name.includes("coventry")) {
    return "Midlands, UK";
  } else if (name.includes("bristol") || name.includes("exeter") || 
             name.includes("bath") || name.includes("southampton") ||
             name.includes("sussex") || name.includes("reading") ||
             name.includes("surrey") || name.includes("portsmouth") ||
             name.includes("brighton") || name.includes("plymouth")) {
    return "Southern England, UK";
  } 
  else if (name.includes("harvard") || name.includes("princeton") || 
           name.includes("yale") || name.includes("stanford") || 
           name.includes("mit") || name.includes("american") ||
           name.includes("new york")) {
    return "USA";
  } else if (name.includes("sorbonne") || name.includes("heidelberg") || 
             name.includes("bologna") || name.includes("barcelona") ||
             name.includes("madrid") || name.includes("amsterdam") ||
             name.includes("berlin")) {
    return "Continental Europe";
  } else if (name.includes("toronto") || name.includes("mcgill") || 
             name.includes("ubc") || name.includes("montreal") ||
             name.includes("alberta")) {
    return "Canada";
  } else if (name.includes("sydney") || name.includes("melbourne") || 
             name.includes("auckland") || name.includes("queensland") ||
             name.includes("monash")) {
    return "Australia/New Zealand";
  } else if (name.includes("singapore") || name.includes("hong kong") || 
             name.includes("tokyo") || name.includes("beijing") ||
             name.includes("shanghai") || name.includes("seoul")) {
    return "East Asia";
  }
  
  if (name.includes("university") && name.includes("uk") || 
      name.includes("uni") && name.includes("uk") || 
      /\b(uk)\b/.test(name)) {
    return "UK";
  }
  
  return "Other";
};
