import { Children, createContext, useState } from "react";

import SelectedProject from "../components/SelectedProject.jsx";
import NewProject from "../components/NewProject.jsx";
import NoProjectSelected from "../components/NoProjectSelected";

export const ProjectContext = createContext({
   tasks: [],
   projects: [],
   onAdd: () => {},
   onDelete: () => {},
   onStartAddProject: () => {},
   onSelectProject: () => {},
   selectedProjectId: undefined,
});

export default function ProjectContextProvider({ children }) {
   const [projectsState, setProjectsState] = useState({
      selectedProjectId: undefined,
      projects: [],
      tasks: [],
   });
   // console.log(projectsState.tasks);

   function handleAddTask(text) {
      setProjectsState(prevState => {
         const taskId = Math.random();
         const newTask = {
            text: text, // text: text,
            projectId: prevState.selectedProjectId,
            id: taskId,
         };

         return {
            ...prevState,
            tasks: [newTask, ...prevState.tasks],
         };
      });
   }

   function handleDeleteTask(id) {
      setProjectsState(prevState => {
         return {
            ...prevState,
            tasks: prevState.tasks.filter(task => task.id !== id),
         };
      });
   }

   function handleSelectProject(id) {
      setProjectsState(prevState => {
         return {
            ...prevState,
            selectedProjectId: id,
         };
      });
   }

   function handleStartAddProject() {
      setProjectsState(prevState => {
         return {
            ...prevState,
            selectedProjectId: null,
         };
      });
   }

   function handleCancelAddProject() {
      setProjectsState(prevState => {
         return {
            ...prevState,
            selectedProjectId: undefined,
         };
      });
   }

   function handleAddProject(projectData) {
      setProjectsState(prevState => {
         const projectId = Math.random();
         const newProject = {
            ...projectData,
            id: projectId,
         };

         return {
            ...prevState,
            selectedProjectId: undefined,
            projects: [...prevState.projects, newProject],
         };
      });
   }

   function handleDeleteProject() {
      setProjectsState(prevState => {
         return {
            ...prevState,
            selectedProjectId: undefined,
            projects: prevState.projects.filter(
               project => project.id !== prevState.selectedProjectId
            ),
         };
      });
   }

   // console.log(projectsState);

   const selectedProject = projectsState.projects.find(
      project => project.id === projectsState.selectedProjectId
   );

   let content = (
      <SelectedProject
         project={selectedProject}
         onDelete={handleDeleteProject}
      />
   );

   if (projectsState.selectedProjectId === null) {
      content = (
         <NewProject
            onAdd={handleAddProject}
            onCancel={handleCancelAddProject}
         />
      );
   } else if (projectsState.selectedProjectId === undefined) {
      content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
   }

   const projectCtx = {
      tasks: projectsState.tasks,
      onAdd: handleAddTask,
      onDelete: handleDeleteTask,
      onStartAddProject: handleStartAddProject,
      onSelectProject: handleSelectProject,
      selectedProjectId: projectsState.selectedProjectId,
      projects: projectsState.projects,
   };

   return (
      <ProjectContext.Provider value={projectCtx}>
         <main className="h-screen my-8 flex gap-8">
            {children}
            {content}
         </main>
      </ProjectContext.Provider>
   );
}
