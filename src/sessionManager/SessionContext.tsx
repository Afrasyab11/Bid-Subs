import React, { createContext, useContext, useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: string;
  status: "active" | "completed" | "pending";
  progress: number;
  teamSize: number;
  description: string;
  trades: string[];
  totalBids: number;
  lastUpdated: string;
}

interface SessionContextType {
  toggleTheme: () => void;
  theme: string;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  projects: Project[];
}

const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState("dark");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Mock projects data - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: "1",
      name: "Downtown Office Complex",
      client: "Metro Development Corp",
      location: "New York, NY",
      startDate: "2024-01-15",
      endDate: "2024-12-20",
      budget: "$15,200,000",
      status: "active",
      progress: 65,
      teamSize: 8,
      description: "Modern 15-story office building with retail space and parking garage",
      trades: ["Electrical", "Plumbing", "HVAC", "Structural"],
      totalBids: 24,
      lastUpdated: "2024-01-20"
    },
    {
      id: "2",
      name: "Riverside Residential Tower",
      client: "Harbor View Properties",
      location: "Miami, FL",
      startDate: "2024-02-01",
      endDate: "2025-03-15",
      budget: "$8,750,000",
      status: "pending",
      progress: 25,
      teamSize: 5,
      description: "Luxury residential tower with 120 units and amenities",
      trades: ["Electrical", "Plumbing", "HVAC", "Interior"],
      totalBids: 18,
      lastUpdated: "2024-01-18"
    },
    {
      id: "3",
      name: "Tech Campus Building A",
      client: "Innovation Tech Inc",
      location: "Austin, TX",
      startDate: "2023-11-10",
      endDate: "2024-08-30",
      budget: "$12,500,000",
      status: "active",
      progress: 80,
      teamSize: 12,
      description: "State-of-the-art office building for tech company headquarters",
      trades: ["Electrical", "Plumbing", "HVAC", "IT Infrastructure"],
      totalBids: 32,
      lastUpdated: "2024-01-22"
    },
    {
      id: "4",
      name: "Shopping Center Renovation",
      client: "Retail Partners LLC",
      location: "Chicago, IL",
      startDate: "2024-03-01",
      endDate: "2024-09-30",
      budget: "$5,200,000",
      status: "pending",
      progress: 10,
      teamSize: 6,
      description: "Complete renovation of existing shopping center",
      trades: ["Electrical", "Plumbing", "HVAC", "Interior", "Roofing"],
      totalBids: 15,
      lastUpdated: "2024-01-19"
    },
    {
      id: "5",
      name: "Hospital Wing Extension",
      client: "City Medical Center",
      location: "Boston, MA",
      startDate: "2023-09-15",
      endDate: "2024-11-30",
      budget: "$22,800,000",
      status: "active",
      progress: 45,
      teamSize: 15,
      description: "New emergency wing with 50 beds and surgical suites",
      trades: ["Electrical", "Plumbing", "HVAC", "Medical Gas", "Structural"],
      totalBids: 28,
      lastUpdated: "2024-01-21"
    },
    {
      id: "6",
      name: "University Library",
      client: "State University",
      location: "Seattle, WA",
      startDate: "2024-01-01",
      endDate: "2025-02-28",
      budget: "$18,500,000",
      status: "pending",
      progress: 15,
      teamSize: 10,
      description: "Modern library facility with study spaces and digital archives",
      trades: ["Electrical", "Plumbing", "HVAC", "IT Infrastructure", "Interior"],
      totalBids: 22,
      lastUpdated: "2024-01-17"
    }
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
    
    // Set default project if none is selected
    if (!currentProject && projects.length > 0) {
      setCurrentProject(projects[0]);
    }
  }, []); // Remove theme from dependency array to prevent infinite loop

  // Separate effect to handle theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  console.log("theme", theme);
  return (
    <SessionContext.Provider value={{ 
      toggleTheme, 
      theme, 
      currentProject, 
      setCurrentProject,
      projects 
    }}>
      {children}
    </SessionContext.Provider>
  );
};
