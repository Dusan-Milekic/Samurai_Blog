import React, { useState } from "react";

export default function Navigation() {
    const [menuActive, setMenuActive] = useState(false);

    const handleBurgerClick = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">
                    <img src="samurai.jpg" alt="Logo" />
                </a>
                <button
                    type="button"
                    className={`navbar-burger${menuActive ? " is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded={menuActive}
                    data-target="navbarBasicExample"
                    onClick={handleBurgerClick}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>
            <div
                id="navbarBasicExample"
                className={`navbar-menu${menuActive ? " is-active" : ""}`}
            >
                <div className="navbar-start">
                    <a className="navbar-item">Home</a>
                    <a className="navbar-item">Posts</a>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">About</a>
                            <a className="navbar-item">Author</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary" href="/register">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light" href="/login">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}