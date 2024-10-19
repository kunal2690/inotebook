import React, { useContext, useState, useEffect, useLayoutEffect } from 'react'
// import notecontext from '../context/notes/noteContext'
import Addnote from './Addnote'
import notecontext from '../context/notes/noteContext'
import Notesitem
    from './Notesitem'
import Modal from './Modal'
import { useRef } from 'react'

export default function Home() {
    const { notes, addNote, fetchNote, updatenote } = useContext(notecontext)
    useEffect(() => {
        fetchNote()


    }, []);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "lets go" })
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const [id, setId] = useState(null)
    const handleclick = (e) => {
        e.preventDefault()
        console.log(id)
        console.log(note)
        updatenote(id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        // updateNote(note)
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const openedit = (note) => {
        ref.current.click();
        setNote({ etitle: note.title, edescription: note.description, etag: note.tag })
        setId(note._id)

    }

    return (
        <>
            <Addnote />
            <div>

                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit the note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label mx-3">Title</label>
                            <input type="text" name="etitle" id="etitle" value={note.etitle} onChange={handlechange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label mx-3">Description</label>
                            <textarea className="form-control" id="edescription" name="edescription" onChange={handlechange} rows="3"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">

                {notes.map((e) => {
                    return <Notesitem openedit={openedit} key={e._id} note={e} />
                })}
            </div>
        </>


    )
}
