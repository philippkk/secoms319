import { useEffect, useState } from "react";
import p from "./Projects.json"; // Delete when DB's incorporated
import ProjectView from "./projectView";

const Home = () => {
  // Hook, if user is blank, will display login, else can be used to quiery projects
  const [user, setUser] = useState("");
  const [projectID, setProjectID] = useState(-1);
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function setProject(ID) {
    setProjectID(ID);
  }
  // Used to component to refresh
  function handleRefresh() {
    setRefresh((prevRefresh) => !prevRefresh);
  }
  // Changes values from input
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // When attempting to set user, compare to database
  function submit() {
    // Implement username/password checking here /////////////////////////////////////////////////////////////
    setUser(username);
  }

  if (user === "")
    // Return login
    return (
      <div id="background">
        <div id="login">
          <h1>Login</h1>
          <input
            id="username"
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          <input
            id="password"
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
          <button id="submit" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    );
  // Return Projects
  else if(projectID === -1)
    return <Projects user={user} refresh={handleRefresh} setProject={setProject}/>;
  else
    return <ProjectView projectID={projectID}/>
};



// Returns several project based on the user
const Projects = ({ user, refresh, setProject}) => {
  let projects; // Should be an array of projects
  projects = p; // Replace with project retrieval ////////////////////////////////////////////////////

  const projectTabs = projects.map((project) => (
    <Project key={project.projectID} project={project} refresh={refresh} setProject={() => setProject(project.projectID)} />
  ));

  return (
    <div>
      <h1>Select Project</h1>
      <div>{projectTabs}</div>
    </div>
  );
};

// Returns an individual project
const Project = ({ project, refresh, setProject }) => {
  function remove() {
    //Handle project deletion here /////////////////////////////////////////
    // Use proj.projectID
    refresh();
  }

  return (
    <div id="projectContainer">
      <div>
        <h2>{project.name}</h2>
        <h2>{project.notes} notes</h2>
        <button onClick={() => {setProject(project.projectID)}}>Enter</button>
        <button onClick={remove}>Delete</button>
      </div>
    </div>
  );
};

export default Home;
