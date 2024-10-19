import React from 'react'
import { useContext } from 'react'
import notecontext from '../context/notes/noteContext'

export default function Notesitem(props) {
    const { deleteNote } = useContext(notecontext)
    const handleclick = () => {
        deleteNote(props.note._id)
    }

    return (
        <div className='col-md-3 ' >
            <div className="card my-3" >

                <div className="card-body">
                    <div className="d-flex ">

                        <h5 className="card-title ">{props.note.title}</h5>
                        <i className="fa-solid fa-trash mx-3" style={{ cursor: "pointer" }} onClick={handleclick}></i>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={() => props.openedit(props.note)} style={{ cursor: "pointer" }}></i>
                    </div>
                    <p className="card-text">{props.note.description}Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">{props.note.tag}</a>
                </div>
            </div>
        </div>
    )
}
