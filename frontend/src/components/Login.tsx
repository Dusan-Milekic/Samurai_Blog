import Navigation from "./Navigation";

export default function Login() {
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
                                        Login
                                    </h1>

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

                                    {/* Remember / Forgot */}
                                    <div className="field is-flex is-justify-content-space-between is-align-items-center">
                                        <label className="checkbox" style={{ color: "#cfcfcf" }}>
                                            <input type="checkbox" style={{ marginRight: 8 }} /> Remember me
                                        </label>
                                        <a href="/forgot-password" style={{ color: "#b30000" }}>
                                            Forgot password?
                                        </a>
                                    </div>

                                    {/* Submit */}
                                    <div className="field">
                                        <button
                                            type="submit"
                                            className="button is-fullwidth"
                                            style={{
                                                backgroundColor: "#b30000",
                                                color: "#fff",
                                                fontWeight: 600,
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
                                            Login
                                        </button>
                                    </div>

                                    {/* Link to Register */}
                                    <p className="has-text-centered" style={{ color: "#bdbdbd" }}>
                                        Don’t have an account?{" "}
                                        <a href="/register" style={{ color: "#b30000", fontWeight: 600 }}>
                                            Register
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
