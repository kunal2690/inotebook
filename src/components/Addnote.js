import React, { useContext, useState } from 'react'
import notecontext from '../context/notes/noteContext'

export default function Addnote() {

    const { addNote } = useContext(notecontext)
    const [note, setNote] = useState({ title: "", description: "", tag: "lets go" })
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleclick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "lets go" })

    }

    return (
        <>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" name="title" value={note.title} id="title" onChange={handlechange} className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Desccription</label>
                <textarea className="form-control" value={note.description} id="description" name="description" onChange={handlechange} rows="3"></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleclick}>Add note</button>

        </>

    )
}
