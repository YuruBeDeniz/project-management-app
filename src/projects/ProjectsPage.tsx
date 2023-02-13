import { Fragment, useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProjects () {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError('');
        if(currentPage === 1) {
          setProjects(data);
        } else {
          setProjects([...projects, ...data])
        }
      } 
      catch (e) {
        if(e instanceof Error) {
          setError(e.message);
        }
      }
      finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

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
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}


      <ProjectList 
          projects={projects} 
          onSave={saveProject}
      />

      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <button onClick={handleMoreClick} className="button-group fluid">More...</button>
          </div>
        </div>
      )}


      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  )
}
