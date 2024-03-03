import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote} = context;
    const [note, setNote] = useState({id:'', etitle : '', edescription:'', etag:'default'});
    const ref = useRef(null);
    const close = useRef(null);
    const handleEdit = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value});
    }
    const handleClick=(e)=>{
        e.preventDefault();
        const alert = "Note Edited successfully";
        editNote(note.id, note.etitle, note.edescription, note.etag, alert);
        close.current.click();
    }
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, []);
    return (
        <>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Open Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} placeholder="Enter Description" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={close} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 container'>
                <h2>
                    Your Notes
                </h2>
                {notes.length ? notes.map((note) => {
                    return <NoteItem key={note._id} note={note} handleEdit={handleEdit} />
                }) : null}
            </div>
        </>
    )
}

export default Notes