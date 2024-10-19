import { useState } from 'react'
import notecontext from './noteContext'

const Notestate = (props) => {
    const url_s = "http://localhost:5000"

    const [notes, setNotes] = useState([])

    // to fetch all notes
    const fetchNote = async () => {
        const response = await fetch(`${url_s}/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jswdata': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYmU2MzUxZTg4YTFlYjU2MzU5NDFlIn0sImlhdCI6MTcyNjc0MTc1N30.R16b5GF2jt2CoiriGCnTuOgUJ5Dko9Naba4V-jvy3G4'
            }
        });
        const data = await response.json()
        setNotes(data)
        console.log(data)


    }
    // To add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${url_s}/notes/addnotes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jswdata': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYmU2MzUxZTg4YTFlYjU2MzU5NDFlIn0sImlhdCI6MTcyNjc0MTc1N30.R16b5GF2jt2CoiriGCnTuOgUJ5Dko9Naba4V-jvy3G4'
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const data = await response.json()

        setNotes(notes.concat(data))



    }
    // To delete a note 
    const deleteNote = async (id) => {
        console.log(id)
        const response = await fetch(`${url_s}/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jswdata': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYmU2MzUxZTg4YTFlYjU2MzU5NDFlIn0sImlhdCI6MTcyNjc0MTc1N30.R16b5GF2jt2CoiriGCnTuOgUJ5Dko9Naba4V-jvy3G4'
            }
        });

        const newnotes = notes.filter((note) => { return note._id !== id })
        setNotes(newnotes)

    }
    const updatenote = async (id, title, description, tag) => {
        const response = await fetch(`${url_s}/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'jswdata': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlYmU2MzUxZTg4YTFlYjU2MzU5NDFlIn0sImlhdCI6MTcyNjc0MTc1N30.R16b5GF2jt2CoiriGCnTuOgUJ5Dko9Naba4V-jvy3G4'
            },
            body: JSON.stringify({ title, description, tag })
        });
        console.log(notes)
        const newnote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnote.length; index++) {
            if (newnote[index]._id === id) {
                newnote[index].title = title
                newnote[index].description = description
                newnote[index].tag = tag
            }
        }
        setNotes(newnote)
        console.log(notes)




    }
    return (
        <notecontext.Provider value={{ notes, addNote, fetchNote, deleteNote, updatenote }}>
            {props.children}
        </notecontext.Provider>
    );
}

export default Notestate