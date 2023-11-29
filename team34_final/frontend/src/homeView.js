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
  var usernames = [];

  function setProject(ID) {
    setProjectID(ID);
  }
  // Used to component to refresh
  function handleRefresh() {
    setRefresh((prevRefresh) => !prevRefresh);
  }
  // Changes values from input
  const handleUsernameChange = (event) => {
    setUsername("");
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword("");
    setPassword(event.target.value);
  };

  // When attempting to set user, compare to database
  function submit() {
    fetch("http://localhost:8081/checkPass", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userName: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // debug
        // console.log("current DATYA " +  username+ " " +password);
        // console.log("user DATYA " + data[0].userName + " " + data[0].password);
        if (data[0] != null) {
          if (data[0].password == password) {
            console.log("login good!");
            setUser(username);
          } else {
            var container = document.getElementById("output");
            container.innerHTML = `<h1>wrong user or pass</h1>`;
          }
        } else {
          var container = document.getElementById("output");
          container.innerHTML = `<h1>wrong user or pass</h1>`;
        }
      });
  }
  /**
   * gets all users from the user database collection in mongodb
   * it then sets an array = to all the usernames to be used for calcs
   */
  function getUsers() {
    console.log("getting");
    fetch("http://localhost:8081/getUsers")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          usernames.push(data[i].userName);
        }
      });
  }
  getUsers();

  /**
   * adds new user to the database
   * usernames are unique
   */
  function signUp() {
    console.log("signing up");
    for (let i = 0; i < usernames.length; i++) {
      if (usernames[i] == username) {
        var container = document.getElementById("output");
        container.innerHTML = `<h1>user already created!</h1>`;
        console.log("user already created, returning");
        return;
      }
    }
    if(username.length < 1 || password.length < 1){
      var container = document.getElementById("output");
      container.innerHTML = `<h1>invalid user or pass!</h1>`;
      return;
    }
    console.log("new user made");
    usernames.push(username);
    var container = document.getElementById("output");
    container.innerHTML = `<h1>new user created!</h1>`;
    fetch("http://localhost:8081/addUser", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
      getUsers();
  }

  if (user === "")
    // Return login
    return (
      <div id="background" className="h-screen bg-stone-900 p-10 pt-2 flex">
        <div
          id="login"
          className=" bg-stone-500/90 p-10 m-1 w-2/6 text-center rounded  border-2 border-white "
        > 
          <div>
          <h1 className="text-left">TITLE</h1>
          </div>  
          <h1 className="text-white p-2 text-3xl mt-4">Login</h1>
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
            <button
              className="text-white p-2 mt-5 text-2xl bg-indigo-300 rounded mr-2 "
              id="submit"
              onClick={signUp}
            >
              Sign up
            </button>
            <button
              className="text-white p-2 mt-5 text-2xl bg-indigo-300 rounded"
              id="submit"
              onClick={submit}
            >
              Login
            </button>
            <div id="output"></div>
          </div>
        </div>
        <div
          id="projects"
          className=" bg-stone-600/90 p-10 m-1 w-4/6 rounded flex justify-center items-center  border-2 border-white"
        >
          <h1 className="text-white text-center text-2xl">
            ...To view projects, please sign in or sign up...
          </h1>
        </div>
      </div>
    );
  // Return Projects
  else if (projectID === -1)
    return (
      <Projects user={user} refresh={handleRefresh} setProject={setProject} />
    );
  else return <ProjectView projectID={projectID} />;
};

// Returns several project based on the user
const Projects = ({ user, refresh, setProject }) => {
  let projects; // Should be an array of projects
  projects = p; // Replace with project retrieval ////////////////////////////////////////////////////

  const projectTabs = projects.map((project) => (
    <Project
      key={project.projectID}
      project={project}
      refresh={refresh}
      setProject={() => setProject(project.projectID)}
    />
  ));

  return (
    <div>
      <div id="background" className="h-screen bg-stone-900 p-10 flex">
        <div
          id="login"
          className=" bg-stone-500/90 p-10 m-1 w-2/6 text-center rounded  border-2 border-white"
        >
          <h1 className="text-white p-2 text-3xl  mt-4 ">Hi, {user}!</h1>
          <h1 className="text-white p-2 text-2xl ">choose a project to the right,</h1>
      
        </div>
        <div id="projects" className=" bg-stone-600/90 p-10 m-1 w-4/6 rounded  border-2 border-white">
          <h1 className="text-white text-xl pb-5">projects</h1>
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
        <button
          onClick={() => {
            setProject(project.projectID);
          }}
        >
          Enter
        </button>
        <button onClick={remove}>Delete</button>
      </div>
    </div>
  );
};

export default Home;
