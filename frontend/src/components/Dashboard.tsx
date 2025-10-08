import Navigation from "./Navigation";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout, selectCurrentUser, selectIsAuthenticated, type IAccount } from "../redux/api/accountSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthCookies } from '../utils/cookies';
import LikedPostsCard from "./LikedPostsCard";
import CommentPostsCard from "./CommentPostsCard";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const cookies = useAuthCookies();

    const [currentTime, setCurrentTime] = useState(new Date());

    console.log('🔍 Dashboard render:', {
        currentUser,
        isAuthenticated,
        cookieUser: cookies.getUserSession()
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const user: IAccount | null = currentUser || cookies.getUserSession();

    const handleLogout = () => {
        console.log('🚪 Logging out...');
        dispatch(logout());
        cookies.clearUserSession();
        navigate('/login');
    };

    useEffect(() => {
        console.log('🔍 Auth check:', { isAuthenticated, user });

        if (!isAuthenticated && !user) {
            console.log('❌ No user, redirecting to login');
            navigate('/login');
            return;
        }

        if (currentUser && isAuthenticated && !cookies.getUserSession()) {
            console.log('💾 Saving user to cookie');
            cookies.setUserSession(currentUser);
        }
    }, [isAuthenticated, currentUser, user, navigate, cookies]);

    console.log('🔍 Final user:', user);

    if (!user) {
        console.log('🔍 No user found, showing loading...');
        return (
            <>
                <Navigation />
                <section className="section has-text-centered" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
                    <div className="container">
                        <progress className="progress is-danger" value="60" max="100" />
                        <p className="has-text-grey-light">Loading dashboard...</p>
                    </div>
                </section>
            </>
        );
    }

    console.log('🔍 Rendering dashboard for user:', user.email);

    const formatDate = currentTime.toLocaleDateString('en-GB');
    const formatTime = currentTime.toLocaleTimeString('en-GB', { hour12: false });
    const formatUTC = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    return (
        <>
            <Navigation />
            <section className="section has-text-centered mt-6" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
                <div className="container">
                    {/* Main Dashboard Box */}
                    <div className="box" style={{
                        backgroundColor: "#0d0d0d",
                        border: "1px solid #b30000",
                        boxShadow: "0 0 20px rgba(179, 0, 0, 0.4)",
                        color: "#f5f5f5",
                        maxWidth: "600px",
                        margin: "0 auto"
                    }}>
                        <h1 className="title has-text-centered" style={{
                            color: "#b30000",
                            fontWeight: 700,
                            textShadow: "0 0 10px rgba(179,0,0,0.5)",
                        }}>
                            🏠 Dashboard
                        </h1>

                        <div className="content">
                            <h2 className="subtitle has-text-light">
                                Welcome back, {user.first_name} {user.last_name}! 👋
                            </h2>

                            <div className="columns is-mobile">
                                <div className="column">
                                    <div className="field">
                                        <label className="label has-text-light">👤 Name:</label>
                                        <p className="has-text-grey-light">
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="columns is-mobile">
                                <div className="column">
                                    <div className="field">
                                        <label className="label has-text-light">📧 Email:</label>
                                        <p className="has-text-grey-light">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="columns is-mobile">
                                <div className="column">
                                    <div className="field">
                                        <label className="label has-text-light">🆔 User ID:</label>
                                        <p className="has-text-grey-light">{user.id}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="field is-grouped is-grouped-centered mt-5">
                                <div className="control">
                                    <button
                                        className="button is-danger"
                                        onClick={handleLogout}
                                        style={{
                                            backgroundColor: "#b30000",
                                            border: "none",
                                            boxShadow: "0 0 15px rgba(179, 0, 0, 0.6)",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.boxShadow = "0 0 25px rgba(179, 0, 0, 0.9)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.boxShadow = "0 0 15px rgba(179, 0, 0, 0.6)";
                                        }}
                                    >
                                        <span className="icon">
                                            <i className="fa fa-sign-out"></i>
                                        </span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Display Box */}
                    <div className="mt-5">
                        <div className="box" style={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}>
                            <h4 className="subtitle is-5 has-text-light mb-3">
                                🕒 Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted):
                            </h4>
                            <p className="has-text-danger is-size-4 mt-3" style={{
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                letterSpacing: "1px"
                            }}>
                                {formatUTC}
                            </p>

                            <div className="mt-4">
                                <p className="has-text-grey-light is-size-6">
                                    📅 Local Date: {formatDate}
                                </p>
                                <p className="has-text-grey-light is-size-7 mt-2">
                                    👤 Current User's Login: {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 🔥 QUICK ACTIONS SECTION - KARTICE U ISTOM REDU */}
                    <div className="mt-6">
                        <h3 className="subtitle has-text-light mb-4 is-4">
                            ⚡ Quick Actions
                        </h3>

                        {/* 🔥 COLUMNS WRAPPER ZA KARTICE U ISTOM REDU */}
                        <div className="columns is-centered is-variable is-4">
                            <div className="column is-narrow">
                                <LikedPostsCard
                                    onClick={() => {
                                        console.log('Opening liked posts...');
                                        // navigate('/liked-posts');
                                    }}
                                />
                            </div>
                            <div className="column is-narrow">
                                <CommentPostsCard
                                    onClick={() => {
                                        console.log('Opening comment posts...');
                                        // navigate('/comment-posts');
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-6">
                        <p className="has-text-grey-light is-size-7">
                            🔐 Session Active | 🍪 Persistent Login Enabled | 🕒 Live Clock Running
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}