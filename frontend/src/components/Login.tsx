import Navigation from "./Navigation";

export default function Login() {
    return (
        <>
            <Navigation />
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form action="" className="box">
                                    <div className="field">
                                        <label htmlFor="email" className="label">Email</label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="e.g. bobsmith@gmail.com"
                                                className="input"
                                                required
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password" className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="*******"
                                                className="input"
                                                required
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="checkbox">
                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="field">
                                        <button type="submit" className="button is-success">
                                            Login
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