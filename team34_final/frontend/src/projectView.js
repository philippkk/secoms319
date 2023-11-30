import React from "react";
import n from "./Notes.json";
import { _idect, useState } from "react";
import NoteView from "./noteView";
import HomeView from "./homeView";
import Home from "./homeView";

const ProjectView = (projectID) => {
  const [draggedNote, setDraggedNote] = useState(null); // Used for note dragging
  const [view, setView] = useState(-1); // -1 means no note selected
  const [Home,setHome] = useState(false);
  const [num, setNum] = useState(0);
  const [notess, setNotes] = useState([]);
  let notes = notess; 
  fetch("http://localhost:8081/getNotes/"+projectID)
    .then((response) => response.json())
    .then((data) => {
      notes.length = 0;
      for (let i = 0; i < data.length; i++) {
        notes[i]=data[i];
        setNum(data._id)
      }  
    }).then(() => {
      setNotes(notes);
    });
    
  console.log("og notes");
  console.log(notes);
  console.log(notes.length)
  function changeView(ID) {
    setView(ID);
  }
  function createNote(){
    fetch("http://localhost:8081/createNote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "projectID": projectID,
        "level": 1,
        "parentID": 0,
        "title": "New Text Note",
        "tags": [
            "text"
        ],
        "type": "text",
        "content": ""
      }),
    })
      .then((response) => response.json())
      .then((data) => { });
  }

  function getNotes(){
    fetch("http://localhost:8081/getNotes/"+projectID)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        notes.push(data[i]);
      }
    });
  }

  let note = view === -1 ? null : notes.find((n) => n._id === view);

  // console.log("FIND THING: ")
  // console.log(notes.find((notes) => notes._id === view));
  // console.log(note);
  
  console.log("before return");
  return Home? (
    <HomeView/>
  ):(
    <div className="bg-stone-900 h-screen p-5 pt-2 flex w-screen overflow-x-scroll">
    <SideBar notes={notes} changeView={changeView}  drag={{draggedNote, setDraggedNote}} home={{Home,setHome}} createNote={createNote} getNotes={getNotes} projectID={projectID}/>
    <ContentView notes={notes} note={note} changeView={changeView} drag={{draggedNote, setDraggedNote}} />
  </div>
  );
};

const ContentView = ({ notes, note, changeView, drag }) => {
  if (note) {
    return (
      <div   className="bg-stone-600/90 p-1 m-1 w-11/12 rounded h-14 text-xl h-max border-2 border-white text-white">
        {note.title} Content<br />
        <NoteView notes={notes} note={note} changeView={changeView} />
      </div>
    );
  }else{
    return(  <div   className="bg-stone-600/90 p-1 m-1 w-11/12 rounded h-14 text-xl h-max border-2 border-white text-white">
       Double click a note to open it!<br />
    </div>
    );
  }

  return <div></div>;
};

const SideBar = ({ notes, changeView, drag,home,createNote,getNotes,projectID}) => {
  const [search, setSearch] = useState("");
  const [num, setNum] = useState(0);

  let notess = [];
  fetch("http://localhost:8081/getNotes/"+projectID)
  .then((response) => response.json())
  .then((data) => {
    notes.length = 0;
    for (let i = 0; i < data.length; i++) {
      notess.push(data[i]);
    }
  });
console.log("SIDEBAR notes length");
console.log(notess.length);


  // Saves a note's location
  function save(note) {
    // Implement a DB save function here. Needed when shuffling folders //////////////////////////////////////////////////
  }

  // Used to update a whole branch file hierarchy
  function updateBranch(dNote, newParent) {
    if(dNote.parentID) {
      console.log("Parent:");
      let parent = notes.find((nt) => nt._id ===  dNote.parentID);
      console.log(parent);
      parent.content = parent.content.filter(id => id !== dNote._id);
      console.log(parent);
      save(parent);
    }
    if(newParent) {
      dNote.parentID = newParent._id;
      newParent.content.push(dNote._id);
      updateRecursive(dNote, newParent.level + 1);
    }
    else {
      dNote.parentID = null;
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
  const baseNotes = notes;
  // const baseNotes = notes.filter((note) => {
  //   if (search === "") {
  //     return note.level == 0;
  //   }
  //   return note.title.toLowerCase().includes(search.toLowerCase()) ||
  //   note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
  // });
  console.log("baseNotes");
  console.log(notes);
  console.log(notes.length);
  console.log(notes[0]);

for(let i = 0; i < 3; i++){
  console.log(i);
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
        <button className="text-lg text-right m-2 border-2 bg-indigo-300 rounded-lg p-2 py-1 hover:bg-indigo-600 hover:border-indigo-400"
                    onClick={getNotes}

        >+folder</button>
          <button className="text-lg text-right m-2 border-2 bg-indigo-400 rounded-lg p-2 py-1 hover:bg-indigo-600 hover:border-indigo-400"
          onClick={createNote}
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
  console.log("sidetag note");
  console.log(note);


  // Functions to handle drag/drop
  const handleDragStart = (event, note) => {
    drag.setDraggedNote(note);
    console.log("Picked up:");
    console.log(note);
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
    let parentID = note._id;// Prevents a note from being it's own descendent
    while(parentID) {
      if(n.ID === parentID) {
        drag.setDraggedNote(null);
        return;
      }
      parentID = notes.find((nt) => nt._id === parentID)?.parentID;
    }
    if(!note.content.includes(n._id))
      update(n, note);
    drag.setDraggedNote(null);
    event.stopPropagation();
  };

  // Handles single click, i.e. show subfolders
  function handleClk() {
    if(note.type !== "folder")
      return;
    else {
      singleClick = true;
      // This delay waits to see if a double click occured or if single click should proceed
      setTimeout(() => {
        if (singleClick) {
          setOpen(!open);
          singleClick = false;
          if(open){
            let str = note.title;
            str = str.substring(2,str.length);
            note.title = "v " + str;
          }else{
            let str = note.title;
            str = str.substring(2,str.length);
            note.title = "> " + str;
          }
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
    <SideTab key={index} notes={notes} note={n} changeView={changeView} drag={drag} />
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
        {note.title}
        <hr></hr>
      </button>
      {subTabs}
    </div>
  );
};
/*
const DragAndDropExample = () => {

  const handleDragNoteStart = (event, note) => {
    setDraggedItemId(note);
    event.dataTransfer.setData(note); // Setting some data for the drag operation
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, note) => {
    event.preventDefault();
    console.log(note);
    setDraggedNote(null);
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={(event) => handleDrop(event, 'target')}
      >
      </div>
      <div
          draggable
          onDragStart={(event) => handleDragStart(event, 'item1')}
        >
      </div>
    </div>
  );
};*/

export default ProjectView;
