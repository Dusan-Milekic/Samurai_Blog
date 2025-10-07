import Navigation from "./Navigation";
export default function Register() {
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
                                        <label htmlFor="firstName" className="label">First Name</label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="e.g. Bob"
                                                className="input"
                                                required
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="lastName" className="label">Last Name</label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="e.g. Smith"
                                                className="input"
                                                required
                                            />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>
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
                                        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="confirmPassword"
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
                                        <button type="submit" className="button is-primary">
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