import { Fragment, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)

  const saveProject = (project: Project) => {
    console.log(project);
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p; 
    });
    setProjects(updatedProjects);
  }

  return (
    <Fragment>
    <h1>Projects</h1>
    <ProjectList 
        projects={projects} 
        onSave={saveProject}/>
    </Fragment>
  )
}
