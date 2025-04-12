
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExportResultsButtonProps {
  selectedGrades: any[];
  matchedCourses: any[];
  ucasPoints: number;
  regionPreference?: string;
}

const ExportResultsButton = ({ 
  selectedGrades, 
  matchedCourses, 
  ucasPoints, 
  regionPreference 
}: ExportResultsButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const exportResults = async () => {
    setIsExporting(true);
    
    try {
      // Create a downloadable text/html content
      let content = `
        <html>
        <head>
          <title>UCAS Course Matches - ${formatDate()}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1, h2 { color: #1f2937; }
            h1 { border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
            .header { margin-bottom: 30px; }
            .summary { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .summary-item { margin: 10px 0; }
            .course { margin: 25px 0; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
            .course h3 { margin-bottom: 5px; }
            .university { color: #4b5563; margin-bottom: 15px; }
            .requirements { background-color: #f3f4f6; padding: 10px; border-radius: 5px; margin-top: 10px; }
            .footer { margin-top: 30px; color: #6b7280; font-size: 0.9em; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your UCAS Course Matches</h1>
            <p>Generated on ${formatDate()}</p>
          </div>

          <div class="summary">
            <h2>Your Results Summary</h2>
            <div class="summary-item">
              <strong>A-Level Grades:</strong> ${selectedGrades.map(g => 
                `${g.subjectId}: ${g.grade}`).join(", ")}
            </div>
            <div class="summary-item">
              <strong>Total UCAS Points:</strong> ${ucasPoints}
            </div>
            ${regionPreference ? `<div class="summary-item"><strong>Region Preference:</strong> ${regionPreference}</div>` : ''}
            <div class="summary-item">
              <strong>Matching Courses:</strong> ${matchedCourses.length}
            </div>
          </div>

          <h2>Matching Courses</h2>
          ${matchedCourses.map(course => `
            <div class="course">
              <h3>${course.name}</h3>
              <div class="university">${course.university || 'University Degree'}</div>
              <p>${course.description || ''}</p>
              <div class="requirements">
                <strong>Entry Requirements:</strong> ${course.entryRequirements || 'Not specified'}
                ${course.duration ? `<br><strong>Duration:</strong> ${course.duration}` : ''}
              </div>
            </div>
          `).join('')}

          <div class="footer">
            <p>This report was generated using the University Grade Calculator.</p>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `UCAS_Results_${formatDate().replace(/\s/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Results exported successfully",
        description: "Your course matches have been downloaded as an HTML file.",
      });
    } catch (error) {
      console.error("Error exporting results:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportResults} 
      disabled={isExporting || matchedCourses.length === 0}
      className="flex items-center gap-2" 
      variant="outline"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export Results
        </>
      )}
    </Button>
  );
};

export default ExportResultsButton;
