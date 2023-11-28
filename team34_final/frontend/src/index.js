import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './homeView';

//import App from './App';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
let state = 0;

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

/* Message to cole:

hi, the project is set up, tailwind is all good to go if you start the react server

the backend is set up too with node and express, make sure your termial is
in the src folder then you can start it and if you go to /hi it should
print "hi node js" in the terminal to ensure that it made its connection.

We do need a database, and using the mongo compass seems weird since its all local
if we want to have an online database everyone can access, look up
mongodb atlas and make an account with your isu email
from there you can make a free hosted database.

i would make it and plug her in but i already have one for another class
and you can only have one

i think for the database what we should do is just have it so after you log in,
everyone then sees the same possible project list (while this wouldnt be ideal for a real app its easier)

data base wise we would just need to verify login,
load possible projects after the login view,
then once a user clicks a project,
it will load all notes to that project, 

there will be 2 database sections, users (to store just username and pass)
and the projects (to store project titles and the ID, as well as each of the notes)
perhaps notes should be on a 3rd section so the fields will all be the same for each section

to verify log in we can just have a ton of items in the user database.
then just query out the username inputed and compare the password and
check if its correct.

each project should have a field called "projectID" or something,
then on each note, we have a field called "projectID" as well to tie them together.

from that itll just be a ton of js to load everything into their proper containers.
*/

