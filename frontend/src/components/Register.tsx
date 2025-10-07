import Navigation from "./Navigation";

export default function Register() {
    return (
        <>
            <Navigation />
            <section
                className="hero is-fullheight"
                style={{
                    background:
                        "linear-gradient(180deg, #000000 0%, #111111 50%, #1a0000 100%)",
                    color: "#f5f5f5",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form
                                    action=""
                                    className="box"
                                    style={{
                                        backgroundColor: "#0d0d0d",
                                        border: "1px solid #b30000",
                                        boxShadow: "0 0 20px rgba(179, 0, 0, 0.4)",
                                        color: "#f5f5f5",
                                    }}
                                >
                                    <h1
                                        className="title has-text-centered mb-5"
                                        style={{
                                            color: "#b30000",
                                            fontWeight: 700,
                                            textShadow: "0 0 10px rgba(179,0,0,0.5)",
                                        }}
                                    >
                                        Register
                                    </h1>

                                    {/* First Name */}
                                    <div className="field">
                                        <label htmlFor="firstName" className="label has-text-light">
                                            First Name
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="e.g. Bob"
                                                className="input"
                                                required
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    color: "#f5f5f5",
                                                    border: "1px solid #b30000",
                                                }}
                                            />
                                            <span className="icon is-small is-left has-text-danger">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div className="field">
                                        <label htmlFor="lastName" className="label has-text-light">
                                            Last Name
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="e.g. Smith"
                                                className="input"
                                                required
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    color: "#f5f5f5",
                                                    border: "1px solid #b30000",
                                                }}
                                            />
                                            <span className="icon is-small is-left has-text-danger">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="field">
                                        <label htmlFor="email" className="label has-text-light">
                                            Email
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="e.g. samurai@gmail.com"
                                                className="input"
                                                required
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    color: "#f5f5f5",
                                                    border: "1px solid #b30000",
                                                }}
                                            />
                                            <span className="icon is-small is-left has-text-danger">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="field">
                                        <label htmlFor="password" className="label has-text-light">
                                            Password
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="*******"
                                                className="input"
                                                required
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    color: "#f5f5f5",
                                                    border: "1px solid #b30000",
                                                }}
                                            />
                                            <span className="icon is-small is-left has-text-danger">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="field">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="label has-text-light"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="*******"
                                                className="input"
                                                required
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    color: "#f5f5f5",
                                                    border: "1px solid #b30000",
                                                }}
                                            />
                                            <span className="icon is-small is-left has-text-danger">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="field">
                                        <button
                                            type="submit"
                                            className="button is-fullwidth"
                                            style={{
                                                backgroundColor: "#b30000",
                                                color: "#fff",
                                                fontWeight: "600",
                                                border: "none",
                                                boxShadow: "0 0 15px rgba(179, 0, 0, 0.6)",
                                                transition: "all 0.3s ease-in-out",
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.boxShadow =
                                                "0 0 25px rgba(179, 0, 0, 0.9)")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.boxShadow =
                                                "0 0 15px rgba(179, 0, 0, 0.6)")
                                            }
                                        >
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
