import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

import ProjectContextProvider from "./store/project-context.jsx";

function App() {
   return (
      <ProjectContextProvider>
         <ProjectsSidebar />
      </ProjectContextProvider>
   );
}

export default App;
