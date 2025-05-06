
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileMenuProps {
  onLinkClick: () => void;
}

const MobileMenu = ({ onLinkClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleLinkClick = () => {
    setIsOpen(false);
    onLinkClick();
  };

  return (
    <div className="md:hidden">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={24} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh] pt-0 bg-background">
          <div className="px-4 py-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-xl gradient-text">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X size={24} />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link 
                to="/subject-selector" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Subject Selector
              </Link>
              <Link 
                to="/career-to-subjects" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Career to Subjects
              </Link>
              <Link 
                to="/grade-calculator" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Grade Calculator
              </Link>
              <Link 
                to="/subjects" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Subjects
              </Link>
              <Link 
                to="/guidance" 
                className="text-xl font-medium hover:text-education-primary transition-colors"
                onClick={handleLinkClick}
              >
                Guidance
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
