
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b shadow-sm sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="container flex justify-between items-center h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap size={28} className="text-education-primary" />
          <span className="font-bold text-xl text-education-primary">A-Level Pathfinder</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="font-medium hover:text-education-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-education-primary transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center">
          <Button variant="default" className="bg-education-primary hover:bg-education-primary/90">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
