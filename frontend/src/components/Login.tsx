import React, { useState, useEffect } from 'react'; // Dodano useEffect
import { useNavigate } from 'react-router-dom'; // Dodano useNavigate
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login, selectCurrentUser, selectIsAuthenticated, selectAccountError, selectAccountLoading } from '../redux/api/accountSlice';
import { useAuthCookies } from '../utils/cookies';
import Navigation from "./Navigation";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate(); // Hook za rutiranje
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = useAuthCookies();
    const currentUser = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const error = useAppSelector(selectAccountError);
    const loading = useAppSelector(selectAccountLoading);

    // 🚀 AUTOMATSKA REDIREKCIJA - pomešten na pravo mesto
    useEffect(() => {
        if (isAuthenticated && currentUser) {
            console.log('User authenticated, redirecting to dashboard...');
            cookies.clearUserSession();
            cookies.setUserSession(currentUser);
            navigate('/dashboard');
        }
    }, [isAuthenticated, currentUser, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await dispatch(login({ email, password }));

            if (login.fulfilled.match(result)) {
                console.log('Login successful!');
                // Navigation će se automatski desiti preko useEffect-a
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const quickLogin = async (userEmail: string, userPassword: string) => {
        try {
            const result = await dispatch(login({
                email: userEmail,
                password: userPassword
            }));

            if (login.fulfilled.match(result)) {
                console.log('Quick login successful!');
                // Navigation će se automatski desiti preko useEffect-a
            }
        } catch (error) {
            console.error('Quick login failed:', error);
        }
    };

    // Loading state
    if (loading) {
        return (
            <>
                <Navigation />
                <section className="section has-text-centered" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
                    <progress className="progress is-danger" value="60" max="100" />
                    <p className="has-text-grey-light">Logging in...</p>
                </section>
            </>
        );
    }

    // Authenticated state - prikazuje se kratko pre redirekcije
    if (isAuthenticated && currentUser) {
        return (
            <>
                <Navigation />
                <section className="section has-text-centered" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
                    <div className="container">
                        <progress className="progress is-success" value="100" max="100" />
                        <h2 className="title has-text-light">Welcome, {currentUser.first_name} {currentUser.last_name}!</h2>
                        <p className="has-text-grey-light">Redirecting to dashboard...</p>
                    </div>
                </section>
            </>
        );
    }

    // Login form
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
                                    onSubmit={handleSubmit}
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

                                    {/* Error display */}
                                    {error && (
                                        <div className="notification is-danger mb-4">
                                            {error}
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div className="field">
                                        <label htmlFor="email" className="label has-text-light">
                                            Email
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="e.g. dusan@gmail.com"
                                                className="input"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                            disabled={loading}
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
                                            {loading ? 'Logging in...' : 'Login'}
                                        </button>
                                    </div>

                                    {/* Quick login buttons for demo */}
                                    <div className="field">
                                        <p className="has-text-centered mb-3" style={{ color: "#bdbdbd" }}>
                                            Quick Login (Demo):
                                        </p>
                                        <div className="buttons is-centered">
                                            <button
                                                type="button"
                                                className="button is-small is-outlined is-danger"
                                                onClick={() => quickLogin('dusan@gmail.com', 'zemun10!')}
                                                disabled={loading}
                                            >
                                                Login as Dusan
                                            </button>
                                            <button
                                                type="button"
                                                className="button is-small is-outlined is-danger"
                                                onClick={() => quickLogin('pera@gmail.com', 'pera_password')}
                                                disabled={loading}
                                            >
                                                Login as Pera
                                            </button>
                                        </div>
                                    </div>

                                    {/* Link to Register */}
                                    <p className="has-text-centered" style={{ color: "#bdbdbd" }}>
                                        Don't have an account?{" "}
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

export default Login;