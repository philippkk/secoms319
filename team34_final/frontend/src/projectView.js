import React from "react";
import n from "./Notes.json";
import { useState } from "react";
import NoteView from "./noteView";

const ProjectView = (projectID) => {
  const [draggedNote, setDraggedNote] = useState(null); // Used for note dragging
  const [view, setView] = useState(-1); // -1 means no note selected
  const notes = n; // Replace with notes from database //////////////////////////////////////////////////////

  function changeView(ID) {
    setView(ID);
  }

  let note = view === -1 ? null : notes.find((n) => n.noteID === view);
  return (
    <div>
      <SideBar notes={notes} changeView={changeView}  drag={{draggedNote, setDraggedNote}} />
      <ContentView notes={notes} note={note} changeView={changeView} drag={{draggedNote, setDraggedNote}} />
    </div>
  );
};

const ContentView = ({ notes, note, changeView, drag }) => {
  if (note) {
    return (
      <div>
        ---Content--- <br />
        <NoteView notes={notes} note={note} changeView={changeView} />
      </div>
    );
  }

  return <div></div>;
};

const SideBar = ({ notes, changeView, drag }) => {
  const [search, setSearch] = useState("");
  
  // Saves a note's location
  function save(note) {
    // Implement a DB save function here. Needed when shuffling folders //////////////////////////////////////////////////
  }

  // Used to update a whole branch file hierarchy
  function updateBranch(dNote, newParent) {
    if(dNote.parentID) {
      console.log("Parent:");
      let parent = notes.find((nt) => nt.noteID === dNote.parentID);
      console.log(parent);
      parent.content = parent.content.filter(id => id !== dNote.noteID);
      console.log(parent);
      save(parent);
    }
    if(newParent) {
      dNote.parentID = newParent.noteID;
      newParent.content.push(dNote.noteID);
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
        const nt = notes.find((note) => note.noteID === n.content[i]);
        if (nt) {
          updateRecursive(nt, newLevel + 1);
        }
      }
    }
    save(n);
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
      return note.level === 0;
    }
    return note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
  });

  const baseTabs = baseNotes.map((note, index) => (
    <SideTab key={index} notes={notes} note={note} changeView={changeView} drag={drag} update={updateBranch} />
  ));

  return (
    <div>
      <div>
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div onDragOver={handleDragOver} onDrop={e => handleDrop(e)}>
        ---Tabs---
        <br />
        {baseTabs}
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
    let parentID = note.noteID;// Prevents a note from being it's own descendent
    while(parentID) {
      if(n.ID === parentID) {
        drag.setDraggedNote(null);
        return;
      }
      parentID = notes.find((nt) => nt.noteID === parentID)?.parentID;
    }
    if(!note.content.includes(n.noteID))
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
        }
      }, 500);
    }
  }

  // Handles double click, and cancels single click
  function handleDblClick() {
    singleClick = false;
    changeView(note.noteID);
  }

  // Generates subNotes for current note (if note.content === folder)
  const subNotes = notes.filter((n) => {
    if (open || note.type !== "folder") {
      return false;
    }
    return note.content.includes(n.noteID);
  });
  const subTabs = subNotes.map((n, index) => (
    <SideTab key={index} notes={notes} note={n} changeView={changeView} drag={drag} />
  ));

  return (
    <div
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
