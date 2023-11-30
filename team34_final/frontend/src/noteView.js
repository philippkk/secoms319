import React from "react";

const NoteView = ({notes, note, setNote}) => {
  const tags = <Tags tags={note.tags} />;
  if (note.type === "text") {
    return (
      <div>
        <div>
          <h1>{note.title}</h1>
        </div>
        <div>
          <p>{note.content}</p>
        </div>
        <div>{tags}</div>
      </div>
    );
  }

  const noteTabs = note.content.map((noteID) => (
    <Note key={noteID} note={notes.find((n) => n.noteID === noteID)} setNote={setNote} />
  ));


  return (
    <div>
      <div>
        <h1>{note.title}</h1>
      </div>
      <div>
        <p>{note.text}</p>
      </div>
      <div>{tags}</div>
    </div>
  );
};

const Tags = ({ tags }) => {
  let string = "";
  for (var i = 0; i < tags.length; i++)
    string += tags[i] + ", ";
  let list = string.slice(0, -2);
  return <div>{list}</div>;
};

const Note = ({note, setNote}) => {
    return (<button onClick={setNote(note.noteID)}>{note.title}</button>);
}

export default NoteView;