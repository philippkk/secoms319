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
      <div className="m-5">
        <div>
          <div class="">
          <label for="message" class="block mb-2  ">Title</label>
          <hr className="m-1"></hr>
            <textarea id="message" rows="1" 
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="block p-2.5 w-5.12 text-lg rounded-lg border border-gray-300 bg-indigo-300 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white" placeholder="Title..."></textarea>          </div>
        </div>
        <div>
          <div class="">
          <label for="message" class="block mb-2 ">Description</label>
          <hr className="m-1"></hr>
            <textarea id="message" rows="4" 
            value={content} onChange={e => setContent(e.target.value)}
            className="block p-2.5 w-full text-lg rounded-lg border border-gray-300 bg-indigo-400 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white" placeholder="Description..."></textarea>
          </div>
        </div>
        <div>Tags: <hr className="m-1"></hr>{tagDiv}</div>
        <button className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600"
        onClick={() => save()}>Save</button>
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
    <div className="m-5">
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