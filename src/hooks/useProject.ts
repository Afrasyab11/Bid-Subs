import { useSession } from "@/sessionManager/SessionContext";
import { useNavigate } from "react-router-dom";
import { ROUTES_ENUM } from "@/constants/routes.constant";

export const useProject = () => {
  const { currentProject, setCurrentProject, projects } = useSession();
  const navigate = useNavigate();

  const selectProject = (projectId: string) => {
    const selectedProject = projects.find((p) => p.id === projectId);
    if (selectedProject) {
      setCurrentProject(selectedProject);
      navigate(ROUTES_ENUM.DASHBOARD);
    }
  };

  const navigateToProjects = () => {
    navigate(ROUTES_ENUM.PROJECTS);
  };

  const navigateToDashboard = () => {
    navigate(ROUTES_ENUM.DASHBOARD);
  };

  return {
    currentProject,
    projects,
    selectProject,
    navigateToProjects,
    navigateToDashboard,
  };
};
