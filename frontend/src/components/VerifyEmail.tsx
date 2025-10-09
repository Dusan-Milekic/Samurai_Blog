import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');



        if (!token) {

            setStatus('error');
            setMessage('Invalid verification link - no token found');
            return;
        }

        // Pozovi backend verification

        const apiUrl = "https://samurai-blog.onrender.com/verify-email/?token=${token}";


        fetch(apiUrl)
            .then(res => {

                return res.json();
            })
            .then(data => {


                if (data.success) {
                    setStatus('success');
                    setMessage(data.message);

                    // Redirect na login nakon 3 sekunde
                    setTimeout(() => {

                        navigate('/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Verification failed');

                }
            })

    }, [searchParams, navigate]);



    return (
        <>
            <Navigation />
            <section className="hero is-fullheight" style={{
                background: "linear-gradient(180deg, #000000 0%, #111111 50%, #1a0000 100%)",
                color: "#f5f5f5",
                fontFamily: "'Poppins', sans-serif",
            }}>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5">
                                <div className="box" style={{
                                    backgroundColor: "#0d0d0d",
                                    border: "1px solid #b30000",
                                    boxShadow: "0 0 20px rgba(179, 0, 0, 0.4)",
                                    color: "#f5f5f5",
                                    textAlign: "center"
                                }}>
                                    <h1 className="title has-text-light" style={{ marginBottom: "2rem" }}>
                                        🔥 Email Verification
                                    </h1>

                                    {/* DEBUG INFO */}
                                    <div style={{
                                        backgroundColor: "#1a1a1a",
                                        padding: "10px",
                                        marginBottom: "20px",
                                        fontSize: "12px",
                                        textAlign: "left"
                                    }}>
                                        <p>🔍 <strong>Debug Info:</strong></p>
                                        <p>Token: {searchParams.get('token')?.substring(0, 20)}...</p>
                                        <p>Status: {status}</p>
                                        <p>URL: {window.location.href}</p>
                                    </div>

                                    {status === 'loading' && (
                                        <>
                                            <h2 className="subtitle has-text-light">🔄 Verifying Email...</h2>
                                            <progress className="progress is-danger" max="100">Loading</progress>
                                            <p className="has-text-grey-light">
                                                Please wait while we verify your email address.
                                            </p>
                                        </>
                                    )}

                                    {status === 'success' && (
                                        <>
                                            <h2 className="subtitle" style={{ color: "#00d1b2" }}>✅ Email Verified!</h2>
                                            <p className="has-text-light">{message}</p>
                                            <p className="has-text-grey-light">Redirecting to login in 3 seconds...</p>
                                            <button
                                                className="button is-success mt-3"
                                                onClick={() => navigate('/login')}
                                            >
                                                Go to Login Now
                                            </button>
                                        </>
                                    )}

                                    {status === 'error' && (
                                        <>
                                            <h2 className="subtitle" style={{ color: "#ff3860" }}>❌ Verification Failed</h2>
                                            <p className="has-text-light">{message}</p>
                                            <div className="buttons is-centered mt-4">
                                                <button
                                                    className="button is-danger"
                                                    onClick={() => navigate('/register')}
                                                >
                                                    Back to Register
                                                </button>
                                                <button
                                                    className="button is-outlined"
                                                    onClick={() => navigate('/login')}
                                                    style={{ borderColor: "#b30000", color: "#b30000" }}
                                                >
                                                    Try Login
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}