import React from 'react'
import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">About</Link>
                            </li>
                            <Link class="btn btn-primary" to="/signup" role="button">Sign Up</Link>
                            <Link class="btn btn-primary" to="/login" role="button">Login</Link>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
