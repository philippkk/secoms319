import React, { useState } from "react";

const NoteView = ({ notes, setNotes, note, changeView, refresh, setSearch }) => {
  const [currentID, setCurrentID] = useState(note._id);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags);

  // Used to save an updated note.
  function save() {
    note.content = content;
    note.title = title;
    note.tags = tags;

    fetch("http://localhost:8081/updateNote/" + note._id, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tags,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        refresh();
      });
  }

  function deletee() {
    if (note.parentID) { // Update parent
      let p = notes.find((n) => n._id === note.parentID);
      p.content = p.content.filter((id) => id !== note._id);
      fetch("http://localhost:8081/updateNote/" + note._id, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: p.title,
          content: p.content,
          tags: p.tags,
        }),
      })
        .then((response) => response.json())
        .then((data) => {console.log(data);});
    }
    let id = note._id;
    fetch("http://localhost:8081/deleteNote/" + note._id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        setNotes(notes.filter((n) => n._id !== id));
      });
  }

  if (note._id !== currentID) {
    setCurrentID(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }

  const tagDiv = <Tags tags={tags} setTags={setTags} setSearch={setSearch} />;
  if (note.type === "text") {
    return (
      <div className="m-5">
        <div>
          <div class="">
            <label for="message" class="block mb-2  ">
              Title
            </label>
            <hr className="m-1"></hr>
            <textarea
              id="message"
              rows="1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block p-2.5 w-5.12 text-lg rounded-lg border border-gray-300 bg-indigo-300 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white"
              placeholder="Title..."
            ></textarea>{" "}
          </div>
        </div>
        <div>
          <div className="mt-10">
            <label for="message" class="block mb-2 ">
              Description
            </label>
            <hr className="m-1"></hr>
            <textarea
              id="message"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block p-2.5 w-full text-lg rounded-lg border border-gray-300 bg-indigo-400 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white"
              placeholder="Description..."
            ></textarea>
          </div>
        </div>
        <div>
        <div className="flex mt-10">
        <h1 className="mr-2">Tags:  </h1>    
         {tags.map((tag) => (
        <Tag name={tag} setSearch={setSearch} />
          ))} 
          </div>
      <hr className="m-1"></hr>
          {tagDiv}
        </div>
        <button
          className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600"
          onClick={() => save()}
        >
          Save
        </button>
        <button
          className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600"
          onClick={() => deletee()}
        >
          Delete
        </button>
      </div>
    );
  }

  const noteTabs = note.content.map((noteID) => (
    <Note
      key={noteID}
      note={notes.find((n) => n._id === noteID)}
      changeView={changeView}
    />
  ));

  return (
    <div className="m-5">
      <div>
        <div class="">
          <label for="message" class="block mb-2  ">
            Title
          </label>
          <hr className="m-1"></hr>
          <textarea
            id="message"
            rows="1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block p-2.5 w-5.12 text-lg rounded-lg border border-gray-300 bg-indigo-300 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white"
            placeholder="Title..."
          ></textarea>{" "}
        </div>
      </div>
      <div>
        <div className="mt-10">
          <label for="message" class="block mb-2 ">
            Content
          </label>
          <hr className="m-1"></hr>
          {noteTabs}
        </div>
      </div>
      <div>
        <div className="flex mt-10">
        <h1 className="mr-2">Tags:  </h1>    
         {tags.map((tag) => (
        <Tag name={tag} setSearch={setSearch} />
          ))} 
          </div>
      <hr className="m-1"></hr>
        {tagDiv}
        <hr className="m-1"></hr>
      </div>
      <button
        className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600"
        onClick={() => save()}
      >
        Save
      </button>
      <button
        className="border-white border-2 rounded-lg m-2 p-2 pt-1 bg-indigo-400 hover:bg-indigo-600"
        onClick={() => deletee()}
      >
        Delete
      </button>
    </div>
  );
};

const Tags = ({ tags, setTags, setSearch }) => {
  const [newTag, setNewTag] = useState("");
  function handleAdd() {
    setTags([...tags, "," + newTag]);
    setNewTag("");
  }
  function handleRemove() {
    setTags(tags.filter((t) => t !== "," + newTag));

  }

  return (
    <div>

      <div className="flex">
        <h1 className="mr-2">Add Tag:</h1>
        <textarea
          id="message"
          rows="1"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="block p-2.5 w-5.12 text-lg rounded-lg border border-gray-300 bg-indigo-300 border-gray-600 placeholder-stone-700 text-stone-700 focus:ring-blue-500 focus:border-blue-500 hover:border-white"
          placeholder="Enter Tag..."
        ></textarea>
          <button className="mx-2 bg-indigo-400 rounded-lg p-4 pt-1 border-white border-2 hover:bg-indigo-600"
      onClick={() => {handleAdd();}}>+</button>
      <button className="mr-2 bg-indigo-400 rounded-lg p-4 pt-1 border-white border-2 hover:bg-indigo-600"
      onClick={() => {handleRemove();}}>-</button>
      </div>
    
    </div>
  );
};

const Tag = ({ name, setSearch }) => {
  return <button onClick={() => {setSearch(name);}}>{name}</button>;
};

const Note = ({ note, changeView }) => {
  return (
    <button onDoubleClick={() => changeView(note.noteID)}>{note.title}</button>
  );
};

export default NoteView;
