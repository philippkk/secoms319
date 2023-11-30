import React, { useState} from "react";

const NoteView = ({ notes, note, changeView }) => {
  const [currentID, setCurrentID] = useState(note.noteID);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags);

  // Used to save an updated note.
  function save() {
    note.content = content;
    note.title = title;
    note.tags = tags;
    // Implement note saving here ///////////////////////////////////////////////////////
  }
  
  if(note.noteID !== currentID) {
    setCurrentID(note.noteID);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }

  const tagDiv = <Tags tags={tags} />;
  if (note.type === "text") {
    return (
      <div>
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}>
          </input>
        </div>
        <div>
          <input type="text" value={content} onChange={e => setContent(e.target.value)}>
          </input>
        </div>
        <div>Tags: {tagDiv}</div>
        <button onClick={() => save()}>Save</button>
      </div>
    );
  }

  const noteTabs = note.content.map((noteID) => 
    <Note
      key={noteID}
      note={notes.find((n) => n.noteID === noteID)}
      changeView={changeView}
    />
  );

  return (
    <div>
      <div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}>
          </input>
      </div>
      <div>{noteTabs}</div>
      <div>Tags: {tagDiv}</div>
      <button onClick={() => save()}>Save</button>
    </div>
  );
};

const Tags = ({ tags }) => {
  return <div>{tags.map((tag) => <Tag name={tag} />)}</div>;
};

const Tag = ({name}) => {
  return <button>{name}</button>
}

const Note = ({ note, changeView }) => {
  return <button onDoubleClick={() => changeView(note.noteID)}>{note.title}</button>;
};

export default NoteView;
