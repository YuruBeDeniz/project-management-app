import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  const saveProject = (project: Project) => {
    console.log(project);
  }

  return (
    <>
    <h1>Projects</h1>
    <ProjectList 
        projects={MOCK_PROJECTS} 
        onSave={saveProject}/>
    </>
  )
}
