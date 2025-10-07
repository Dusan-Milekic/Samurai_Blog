import React, { useState } from "react";

export default function Navigation() {
    const [menuActive, setMenuActive] = useState(false);

    const handleBurgerClick = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav
            className="navbar is-fixed-top"
            role="navigation"
            aria-label="main navigation"
            style={{
                backgroundColor: "#0d0d0d",
                borderBottom: "1px solid #b30000",
                boxShadow: "0 2px 8px rgba(179, 0, 0, 0.3)",
            }}
        >
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img
                        src="samurai.jpg"
                        alt="Logo"
                        style={{
                            maxHeight: "3rem",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px rgba(179, 0, 0, 0.4)",
                        }}
                    />
                </a>
                <button
                    type="button"
                    className={`navbar-burger${menuActive ? " is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded={menuActive}
                    data-target="navbarBasicExample"
                    onClick={handleBurgerClick}
                    style={{ color: "#b30000" }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div
                id="navbarBasicExample"
                className={`navbar-menu${menuActive ? " is-active" : ""}`}
                style={{ backgroundColor: "#0d0d0d" }}
            >
                <div className="navbar-start">
                    <a
                        className="navbar-item"
                        href="/"
                        style={{
                            color: "#f5f5f5",
                            fontWeight: "500",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#b30000")}
                        onMouseOut={(e) => (e.target.style.color = "#f5f5f5")}
                    >
                        Home
                    </a>

                    <a
                        className="navbar-item"
                        href="/posts"
                        style={{
                            color: "#f5f5f5",
                            fontWeight: "500",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "#b30000")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                    >
                        Posts
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a
                            className="navbar-link"
                            style={{ color: "#f5f5f5", fontWeight: "600" }}
                        >
                            More
                        </a>
                        <div
                            className="navbar-dropdown"
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderTop: "1px solid #b30000",
                            }}
                        >
                            {["About", "Author", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    className="navbar-item"
                                    href={`/${item.toLowerCase()}`}
                                    style={{ color: "#f5f5f5" }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = "#b30000")}
                                    onMouseOut={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a
                                className="button"
                                href="/register"
                                style={{
                                    backgroundColor: "#b30000",
                                    color: "#fff",
                                    fontWeight: "600",
                                    border: "none",
                                }}
                                onMouseOver={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 0 12px rgba(179,0,0,0.8)")
                                }
                                onMouseOut={(e) =>
                                    (e.currentTarget.style.boxShadow = "none")
                                }
                            >
                                <strong>Sign up</strong>
                            </a>

                            <a
                                className="button is-light"
                                href="/login"
                                style={{
                                    backgroundColor: "#1a1a1a",
                                    color: "#b30000",
                                    border: "1px solid #b30000",
                                    fontWeight: "500",
                                }}
                                onMouseOver={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#b30000") &
                                    (e.currentTarget.style.color = "#fff")
                                }
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = "#1a1a1a";
                                    e.currentTarget.style.color = "#b30000";
                                }}
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
