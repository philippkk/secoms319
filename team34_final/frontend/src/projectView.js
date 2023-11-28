import React from "react";
import n from "./Notes.json";
import { useState } from "react";

const ProjectView = (projectID) => {
  const [view, setView] = useState(-1); // -1 means no note selected
  const notes = n; // Replace with notes from database //////////////////////////////////////////////////////
  return (
    <div>
      <SideBar notes={notes} setView={setView} />
    </div>
  );
};

const SideBar = ({ notes, setView }) => {
  const baseNotes = notes.filter((note) => note.level === 0);
  const baseTabs = baseNotes.map((note) => {
    <SideTab note={note} setView={setView} />;
  });
  return (
    <div>
      <div>
        <input id="search" onChange={null} placeholder="Search" />
      </div>
      <div>
        {baseTabs}
      </div>
    </div>
  );
};

const SideTab = ({ note, setView }) => {
  return <button onClick={setView(note.noteID)}>{note.name}</button>;
};

export default ProjectView;
