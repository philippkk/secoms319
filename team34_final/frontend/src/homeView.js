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

  function get(){
    fetch('http://localhost:8081/hi')
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      var container = document.getElementById("output");
      container.innerHTML = `<h1>${data[0].userName} ${data[0].password}</h1>`;
    })
  }
  function signUp(name,pass){
    fetch('http://localhost:8081/addUser', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
          "userName": name,
          "password": pass
      })
  })
      .then(response => response.json())
      .then(data => {

      });
  }
  if (user === "")
    // Return login
    return (
      <div id="background" className="h-screen bg-brown p-10 flex">
        <div id="login" className=" bg-back-blue/90 p-10 m-1 w-2/6 text-center rounded ">
          <h1 class="text-white p-2 text-3xl ">Login</h1>
          <div>
          <input 
           className="bg-indigo-300 placeholder-stone-700 p-1 m-1 w-11/12 text-center rounded h-14 text-xl"
            id="username"
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          </div>
          <div>
          <input
          className="bg-indigo-400 placeholder-stone-700  p-1 m-1 w-11/12 text-center rounded h-14 mt-2 text-xl"
            id="password"
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
          </div>
          <div>
          <button class="text-white p-2 mt-5 text-2xl bg-indigo-300 rounded" id="submit" onClick={submit}>
            Submit
          </button>
          </div>
        </div>
        <div id="projects" className=" bg-back-blue/90 p-10 m-1 w-4/6 rounded flex justify-center items-center">
          <h1 class="text-white text-center text-2xl">...To view projects, please sign in or sign up...</h1>
        
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
      <div id="background" className="h-screen bg-brown p-10 flex">
        <div id="login" className=" bg-back-blue/90 p-10 m-1 w-2/6 text-center rounded ">
          <h1 class="text-white p-2 text-3xl ">Login</h1>
          <div>
          <input 
           className="bg-indigo-300 placeholder-stone-700 p-1 m-1 w-11/12 text-center rounded h-14 text-xl"
            id="username"
            placeholder="Username"
          />
          </div>
          <div>
          <input
          className="bg-indigo-400 placeholder-stone-700  p-1 m-1 w-11/12 text-center rounded h-14 mt-2 text-xl"
            id="password"
            type="password"
            placeholder="Password"
          />
          </div>
          <div>
          <button class="text-white p-2 mt-5 text-2xl bg-indigo-300 rounded" id="submit" >
            Submit
          </button>
          </div>
        </div>
        <div id="projects" className=" bg-back-blue/90 p-10 m-1 w-4/6 rounded">
          <h1 class="text-white">projects</h1>
          <h1>Select Project</h1>
          <div>{projectTabs}</div>
        </div>


      </div>
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
