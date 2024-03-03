import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title : '', description:'', tag:'default'});
    const handleClick=(e)=>{
        e.preventDefault();
        console.log(e.title, e.description);
        const alert = "New Note Added";
        addNote(note.id, note.title, note.description, note.tag, alert);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value});
    }
    return (
        <div className='container my-3'>
            <h2>
                Add a Note
            </h2>

            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} />

                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name='description' placeholder="Enter Description"  onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote