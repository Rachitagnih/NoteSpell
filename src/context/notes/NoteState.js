import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000/api/";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    const [alerts, setAlerts] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fetchNotes = async() => {
        const response = await fetch(`${host}notes/getNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        },[]);

        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }
    
    
    // Add a note
    const addNote = async (id, title, description, tag, alert) => {
        // APi

        const response = await fetch(`${host}notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            
            body: JSON.stringify({id, title, description, tag, alert})
        });

        const json = await response.json();
        console.log(json);
        console.log("Adding note");
        const note = {
            "_id": id,
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-02-07T15:12:31.283Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
        setAlerts(alert);
    }

    // Delete a note
    const deleteNote = async (id, alert) => {

        const response = await fetch(`${host}notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },

        });

        const json = await response.json();
        console.log(json);

        console.log("Deleting note of id : " + id);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
        setAlerts(alert);
    }

    // edit a note
    const editNote = async (id, title, description, tag, alert) => {

        // API call

        const response = await fetch(`${host}notes/editNote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },

            body: JSON.stringify({id, title, description, tag, alert})
        });

        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        console.log("Editing note of id : " + id);
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        setAlerts(alert);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, alerts, setAlerts, setIsLoggedIn, isLoggedIn}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;