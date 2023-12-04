import React from "react";
import { _idect, useState } from "react";
import NoteView from "./noteView";
import HomeView from "./homeView";
import Home from "./homeView";

const ProjectView = ({projectID}) => {
  const [draggedNote, setDraggedNote] = useState(null); // Used for note dragging
  const [view, setView] = useState(-1); // -1 means no note selected
  const [Home,setHome] = useState(false);
  const [notes, setNotes] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  if(!fetched) {
  fetch("http://localhost:8081/getNotes/"+projectID)
    .then((response) => response.json())
    .then((data) => {
      setNotes(() => {
        const projectNotes = data.filter((n) => n.projectID === projectID);
        // Remove folder content references to nonexistent notes
        for (var x = 0; x < projectNotes.length; x++) {
          if(projectNotes[x].type !== "folder")
            continue;
          projectNotes[x].content = projectNotes[x].content.filter((contentId) => {
            return projectNotes.find((note) => contentId === note._id);
          });
        }
        setFetched(true);
        return projectNotes;
      });
    });
  }

  // Used to component to refresh
  function handleRefresh() {
    setRefresh((prevRefresh) => !prevRefresh);
  }
  
  function changeView(ID) {
    setView(ID);
  }
  function createNote(type){
    let newNote;
    if(type === "folder") {
      newNote = {
        "projectID": projectID,
        "level": 0,
        "parentID": 0,
        "title": "New Folder",
        "tags": [
            "folder"
        ],
        "type": "folder",
        "content": []
      }
    }
    else if (type === "text"){
      newNote = {
        "projectID": projectID,
        "level": 0,
        "parentID": 0,
        "title": "New Text Note",
        "tags": [
            "text"
        ],
        "type": "text",
        "content": ""
      }
    }
    else {
      console.log('Type "' + type + '" Not Valid');
    }

    setNotes([...notes, newNote]);
    fetch("http://localhost:8081/createNote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => { newNote._id = data.insertedId;});
  }

  let note = view === -1 ? null : notes.find((n) => n._id === view);
  
  return Home? (
    <HomeView/>
  ):(
    <div className="bg-stone-900 h-screen p-5 pt-2 flex w-screen overflow-x-scroll">
    <SideBar notes={notes} changeView={changeView}  drag={{draggedNote, setDraggedNote}} home={{Home,setHome}} createNote={createNote} refresh={handleRefresh} search={search} setSearch={setSearch}/>
    <ContentView notes={notes} setNotes={setNotes} note={note} changeView={changeView} drag={{draggedNote, setDraggedNote}} refresh={() => handleRefresh()} setSearch={setSearch}/>
  </div>
  );
};

const ContentView = ({ notes, setNotes, note, changeView, refresh, setSearch }) => {
  if (note) {
    return (
      <div   className="bg-stone-600/90 p-1 m-1 w-11/12 rounded h-14 text-xl h-max border-2 border-white text-white">
        {note.title} Content<br />
        <NoteView notes={notes} setNotes={setNotes} note={note} changeView={changeView} refresh={refresh} setSearch={setSearch} />
      </div>
    );
  }else{
    return(  <div   className="bg-stone-600/90 p-1 m-1 w-11/12 rounded h-14 text-xl h-max border-2 border-white text-white">
       Double click a note to open it!<br />
    </div>
    );
  }
};

const SideBar = ({ notes, changeView, drag,home,createNote, refresh, search, setSearch}) => {
  // Saves a note's location
  function save(note) {
    // Implement a DB save function here. Needed when shuffling folders //////////////////////////////////////////////////
    fetch("http://localhost:8081/updateNoteLocation/"+note._id, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "parentID": note.parentID,
        "level": note.level,
        "content": note.content,
      }),
    })
    .then((response) => response.json())
    .then(() => { refresh(); });
  }

  // Used to update a whole branch file hierarchy
  function updateBranch(dNote, newParent) {
    if(dNote.parentID) {
      let parent = notes.find((nt) => nt._id === dNote.parentID);
      parent.content = parent.content.filter(id => id !== dNote._id);
      save(parent);
    }
    if(newParent) {
      dNote.parentID = newParent._id;
      newParent.content.push(dNote._id);
      updateRecursive(dNote, newParent.level + 1);
      save(newParent);
    }
    else {
      dNote.parentID = 0;
      updateRecursive(dNote, 0);
    }
  }
  function updateRecursive(n, newLevel) {
    n.level = newLevel;
    if (n.type === "folder") {
      for (var i = 0; i < n.content.length; i++) {
        const nt = notes.find((note) => note._id === n.content[i]);
        if (nt) {
          updateRecursive(nt, newLevel + 1);
        }
      }
    }
    save(n);
  }  

  function goHome(){
    home.setHome(true);
  }
  const handleDragOver = (event) => {
    event.preventDefault();
  }
  const handleDrop = (event) => {
    event.preventDefault();
    updateBranch(drag.draggedNote, null);
    drag.setDraggedNote(null);
    event.stopPropagation();
  };
  const baseNotes = notes.filter((note) => {
    if (search === "") {
            return note.level == 0;
    }
    return note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
  });

for(let i = 0; i <notes.length; i++){
  <SideTab key={i} notes={notes} note={baseNotes[i]} changeView={changeView} drag={drag} update={updateBranch} />
}
  const baseTabs = baseNotes.map((note, index) => (
    <SideTab key={index} notes={notes} note={note} changeView={changeView} drag={drag} update={updateBranch} />
  ));

  return (
    <div className="bg-stone-500/90 p-1 m-1 w-max text-center rounded h-14 text-xl h-max border-2 border-white">
      <div>
        <input className="rounded-lg text-center m-2 hover:border-indigo-400 border-2 hover:placeholder-indigo-600"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div className="text-white text-2xl"
      onDragOver={handleDragOver} onDrop={e => handleDrop(e)}>
        Files
        <hr></hr>
        <div >
        {<button className="text-lg text-right m-2 border-2 bg-indigo-300 rounded-lg p-2 py-1 hover:bg-indigo-600 hover:border-indigo-400"
                    onClick={() => createNote("folder")}
        >+folder</button>}
          <button className="text-lg text-right m-2 border-2 bg-indigo-400 rounded-lg p-2 py-1 hover:bg-indigo-600 hover:border-indigo-400"
          onClick={() => createNote("text")}
          >+note</button>
        </div>
        <hr></hr>
        {baseTabs}
        <button className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600 hover:border-indigo-400"
        onClick={goHome}>Log out</button>
      </div>
    </div>
  );
};

// Used to create the tabs on the side. note.level is the depth of the note
const SideTab = ({notes, note, changeView, drag, update }) => {
  const [open, setOpen] = useState(true);
  let singleClick = false;

  // Functions to handle drag/drop
  const handleDragStart = (event, note) => {
    drag.setDraggedNote(note);
    event.dataTransfer.setData('text/plain', ''); // Setting some data for the drag operation
    event.stopPropagation();

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const n = drag.draggedNote;
    if(note.type !== "folder")
      return;
    let parentID = note.parentID;// Prevents a note from being it's own descendent
    while(parentID) {
      if(n._id === parentID) {
        drag.setDraggedNote(null);
        return;
      }
      parentID = notes.find((nt) => nt._id === parentID)?.parentID;
    }
      
    if(!note.content.includes(n._id)) {
      update(n, note);
    }
    drag.setDraggedNote(null);
    event.stopPropagation();
  };

  // Handles single click, i.e. show subfolders
  function handleClk() {
    console.log(note);
    if(note.type !== "folder")
      return;
    else {
      singleClick = true;
      // This delay waits to see if a double click occured or if single click should proceed
      setTimeout(() => {
        if (singleClick) {
          setOpen(!open);
          singleClick = false;
        }
      }, 250);
    }
  }

  // Handles double click, and cancels single click
  function handleDblClick() {
    singleClick = false;
    changeView(note._id);

  }

  // Generates subNotes for current note (if note.content === folder)
  const subNotes = notes.filter((n) => {
    if (open || note.type !== "folder") {
      return false;
    }
    return note.content.includes(n._id);
  });
  const subTabs = subNotes.map((n, index) => (
    <SideTab key={index} notes={notes} note={n} update={update} changeView={changeView} drag={drag} />
  ));

  return (
    <div className="text-left ml-4 hover:text-gray-300"
      draggable
      onDragStart={(event) => handleDragStart(event, note)}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event)}
    >
      <button
        onClick={() => handleClk()}
        onDoubleClick={() => handleDblClick()}
      >
        {(note.type==="folder"? (open? "> ": "v "): "") + note.title}
        <hr></hr>
      </button>
      {subTabs}
    </div>
  );
};

export default ProjectView;
