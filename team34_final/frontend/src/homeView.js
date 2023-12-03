import { useEffect, useState } from "react";
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
  // Use hook to refresh
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
          <h1 className="text-left text-white text-3xl">Project Manager</h1>
          <hr></hr>
          </div>  
          <h1 className="text-white p-2 text-3xl mt-4">Login</h1>
          <hr></hr>
          <div>
            <input
              className="bg-indigo-300 placeholder-stone-700 p-1 m-1 w-11/12 text-center rounded h-14 text-xl"
              id="username"
              onChange={handleUsernameChange}
              placeholder="Enter Username..."
            />
          </div>
          <div>
            <input
              className="bg-indigo-400 placeholder-stone-700  p-1 m-1 w-11/12 text-center rounded h-14 mt-2 text-xl"
              id="password"
              onChange={handlePasswordChange}
              type="password"
              placeholder="Enter Password..."
            />
          </div>
          <hr></hr>
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
          <div>
          <h1 className="text-white text-center text-2xl">
            ...To view projects, please sign in or sign up...
            <hr></hr>
            
          </h1>
          <h1 className="text-white text-center text-xl">
          <br></br>
            SE/ComS319 Construction of User Interfaces, Fall 2023, 12/3/23
            <br></br>
            Philip King, philipk@iastate.edu
            <br></br>
            Cole Boltjes, cboltjes@iastate.edu
            <br></br>
            Dr. Abraham N. Aldaco Gastelum
          </h1>
          </div>
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
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [num , setNum] = useState('');

  const handleProjectName = (event) => {
    setProjectName("");
    setProjectName(event.target.value);
  };

  function createProject(){
    fetch("http://localhost:8081/createProject", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: projectName,
        notes : 0,
        userName: user
      }),
    })
      .then((response) => response.json())
      .then((data) => {  getProjects();});
      getProjects();
      loadProjects();
  };

  const getProjects = () =>{
    fetch("http://localhost:8081/getProjects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: user
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let p = [];
        for(let i = 0; i<data.length;i++){
        var doc = {  
          "projectID": data[i]._id,
          "name": data[i].name,
          "notes": data[i].notes,
          "userName" : data[i].userName
        }
        p.push(doc);
        setProjects(p);
      }
      });
  };
  getProjects();
  const loadProjects = (event) => {
    getProjects();
    let str = num + " ";
    setNum(str);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(num.length < 10){
        loadProjects();
      }
      
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const projectTabs = projects.map((project) => (
    <Project
      key={project.projectID}
      project={project}
      refresh={refresh}
      setProject={() => setProject(project.projectID)}
      projects={projects}
      setProjects={(p) => setProjects(p)}
    />
  ));

  return projects.length ? 
    <div>
      <div id="background" className="h-screen bg-stone-900 p-10 pt-2 flex">
        <div
          id="login"
          className=" bg-stone-500/90 p-10 m-1 w-2/6 text-center rounded  border-2 border-white"
        >
          <h1 className="text-white p-2 text-3xl  mt-4 ">Hi, {user}!</h1>
          <hr></hr>
          <h1 className="text-white p-2 text-2xl ">choose a project to the right,</h1>
      
        </div>
        <div id="projects" className=" bg-stone-600/90 p-10 m-1 w-4/6 rounded  border-2 border-white">
        <button className="bg-indigo-400 w-2/12 rounded text-white text-2xl float-right text-center" onClick={loadProjects}>load</button>

          <h1 className="text-white text-2xl pb-5 text-center">Projects</h1> 
            <div>
            <button className="bg-indigo-400 w-1/12 rounded text-white text-2xl float-right text-center" onClick={createProject}>+</button>
            <input
              className="bg-indigo-300 placeholder-stone-700 w-6/12 mr-5 text-center rounded h-8 text-xl float-right"
              id="username"
              onChange={handleProjectName}
              placeholder="New Project Name..."
            />
          </div>
          
          <hr></hr>
         <div id="projectOutput">{projectTabs} {num}</div>
        </div>
      </div>
    </div>
  :  <div>
  <div id="background" className="h-screen bg-stone-900 p-10 pt-2 flex">
    <div
      id="login"
      className=" bg-stone-500/90 p-10 m-1 w-2/6 text-center rounded  border-2 border-white"
    >
      <h1 className="text-white p-2 text-3xl  mt-4 ">Hi, {user}!</h1>
      <hr></hr>
      <h1 className="text-white p-2 text-2xl ">choose a project to the right,</h1>
  
    </div>
    <div id="projects" className=" bg-stone-600/90 p-10 m-1 w-4/6 rounded  border-2 border-white">
    <button className="bg-indigo-400 w-2/12 rounded text-white text-2xl float-right text-center" onClick={loadProjects}>load</button>

      <h1 className="text-white text-2xl pb-5 text-center">Projects</h1> 
        <div>
        <button className="bg-indigo-400 w-1/12 rounded text-white text-2xl float-right text-center" onClick={createProject}>+</button>
        <input
          className="bg-indigo-300 placeholder-stone-700 w-6/12 mr-5 text-center rounded h-8 text-xl float-right"
          id="username"
          onChange={handleProjectName}
          placeholder="New Project Name..."
        />
      </div>
      
      <hr></hr>
     <div id="projectOutput" className="text-white text-2xl">loadin...</div>
    </div>
  </div>
</div>
    
}

// Returns an individual project
const Project = ({ project, refresh, setProject, projects, setProjects }) => {
  function remove() {
    deleteMethod();
  }

  function deleteMethod() {
    fetch('http://localhost:8081/deleteProject', {
        method: "DELETE",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
            {
                "id": project.projectID
            }
        )
    })
        .then(response => response.json())
        .then(() => {
            setProjects(projects.filter((p) => p.projectID !== project.projectID));
        })
        .catch((err) => console.log("" + err))
  }
  return (
    <div id="projectContainer">
      <div>
        <h2 className="text-white">{project.name}</h2>
        <h2 className="text-stone-400">{project.notes} notes</h2>
        <button className="bg-indigo-400 p-2 rounded mx-2 w-4/12"
          onClick={() => {
            setProject(project.projectID);
          }}
        >
          Enter
        </button>
        <button className="bg-indigo-500 p-2 rounded mx-2 w-4/12" onClick={remove}>Delete</button>
      </div>
      <hr className="mt-2"></hr>
    </div>
  );
};



export default Home;
