import React, { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

interface RegisterResponse {
    message?: string;
    error?: string;
    success?: boolean;
    verification_token?: string;
}

export default function Register() {
    const navigate = useNavigate();

    // Form refs
    const first_name = createRef<HTMLInputElement>();
    const last_name = createRef<HTMLInputElement>();
    const email = createRef<HTMLInputElement>();
    const password = createRef<HTMLInputElement>();
    const confirm_password = createRef<HTMLInputElement>();

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isRegistered, setIsRegistered] = useState(false);

    // Validacije...
    const validatePasswords = () => {
        const pass = password.current?.value || "";
        const confirmPass = confirm_password.current?.value || "";

        if (pass.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        if (pass !== confirmPass) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Register API poziv
    async function fetchRegister(): Promise<RegisterResponse> {
        const response = await fetch("http://127.0.0.1:8000/auth/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: first_name.current?.value,
                last_name: last_name.current?.value,
                email: email.current?.value,
                password: password.current?.value,
                confirm_password: confirm_password.current?.value,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Registration failed: ${response.status}`);
        }

        return response.json();
    }

    // Form submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validacije...
        const emailValue = email.current?.value || "";
        const firstNameValue = first_name.current?.value || "";
        const lastNameValue = last_name.current?.value || "";

        if (!firstNameValue.trim()) {
            setError("First name is required");
            return;
        }

        if (!lastNameValue.trim()) {
            setError("Last name is required");
            return;
        }

        if (!emailValue.trim()) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(emailValue)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!validatePasswords()) {
            return;
        }

        setIsLoading(true);

        try {

            const result = await fetchRegister();



            // 🔥 PRIKAŽI SUCCESS STANJE UMESTO REDIRECT
            setSuccess(result.message || "Registration successful! Please check your email.");
            setIsRegistered(true);


        } finally {
            setIsLoading(false);
        }
    };

    // 🔥 AKO JE REGISTROVAN, PRIKAŽI SUCCESS STRANICU
    if (isRegistered) {
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
                                <div className="column is-6">
                                    <div className="box" style={{
                                        backgroundColor: "#0d0d0d",
                                        border: "1px solid #b30000",
                                        boxShadow: "0 0 20px rgba(179, 0, 0, 0.4)",
                                        color: "#f5f5f5",
                                        textAlign: "center"
                                    }}>
                                        <h1 className="title" style={{ color: "#00d1b2", marginBottom: "2rem" }}>
                                            ✅ Registration Successful!
                                        </h1>

                                        <div className="content">
                                            <p className="subtitle has-text-light" style={{ fontSize: "1.2rem" }}>
                                                {success}
                                            </p>

                                            <div className="notification is-info" style={{
                                                backgroundColor: "rgba(0, 209, 178, 0.1)",
                                                border: "1px solid #00d1b2",
                                                color: "#f5f5f5"
                                            }}>
                                                <p className="has-text-weight-semibold">📧 Check Your Email</p>
                                                <p>We've sent a verification link to your email address.</p>
                                                <p>Click the link to activate your account and start blogging!</p>
                                            </div>

                                            <div className="content" style={{ marginTop: "2rem" }}>
                                                <p className="has-text-grey-light">
                                                    Didn't receive the email? Check your spam folder or try registering again.
                                                </p>
                                            </div>

                                            <div className="buttons is-centered" style={{ marginTop: "2rem" }}>
                                                <button
                                                    className="button"
                                                    onClick={() => navigate('/login')}
                                                    style={{
                                                        backgroundColor: "#b30000",
                                                        color: "#fff",
                                                        fontWeight: "600",
                                                        border: "none",
                                                        boxShadow: "0 0 15px rgba(179, 0, 0, 0.6)",
                                                    }}
                                                    onMouseOver={(e) =>
                                                        e.currentTarget.style.boxShadow = "0 0 25px rgba(179, 0, 0, 0.9)"
                                                    }
                                                    onMouseOut={(e) =>
                                                        e.currentTarget.style.boxShadow = "0 0 15px rgba(179, 0, 0, 0.6)"
                                                    }
                                                >
                                                    🚀 Go to Login
                                                </button>

                                                <button
                                                    className="button is-outlined"
                                                    onClick={() => setIsRegistered(false)}
                                                    style={{
                                                        borderColor: "#b30000",
                                                        color: "#b30000",
                                                        marginLeft: "1rem"
                                                    }}
                                                >
                                                    ← Register Another Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    // 🔥 REGISTER FORM
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
                                    className="box"
                                    onSubmit={handleSubmit}
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
                                        🔥 Register
                                    </h1>

                                    {/* Error Messages */}
                                    {error && (
                                        <div className="notification is-danger is-small mb-4">
                                            <button
                                                className="delete is-small"
                                                onClick={() => setError("")}
                                            ></button>
                                            {error}
                                        </div>
                                    )}

                                    {/* First Name */}
                                    <div className="field">
                                        <label htmlFor="firstName" className="label has-text-light">
                                            👤 First Name
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="firstName"
                                                type="text"
                                                placeholder="e.g. Bob"
                                                className="input"
                                                ref={first_name}
                                                required
                                                disabled={isLoading}
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
                                            👤 Last Name
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="lastName"
                                                type="text"
                                                placeholder="e.g. Smith"
                                                className="input"
                                                ref={last_name}
                                                required
                                                disabled={isLoading}
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
                                            📧 Email
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="e.g. samurai@gmail.com"
                                                className="input"
                                                ref={email}
                                                required
                                                disabled={isLoading}
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
                                            🔒 Password
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="password"
                                                type="password"
                                                placeholder="*******"
                                                className="input"
                                                ref={password}
                                                required
                                                disabled={isLoading}
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
                                        <p className="help has-text-grey-light">
                                            Must be at least 6 characters long
                                        </p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="field">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="label has-text-light"
                                        >
                                            🔒 Confirm Password
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="*******"
                                                className="input"
                                                ref={confirm_password}
                                                required
                                                disabled={isLoading}
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

                                    {/* Submit Button */}
                                    <div className="field">
                                        <button
                                            type="submit"
                                            className={`button is-fullwidth ${isLoading ? 'is-loading' : ''}`}
                                            disabled={isLoading}
                                            style={{
                                                backgroundColor: "#b30000",
                                                color: "#fff",
                                                fontWeight: "600",
                                                border: "none",
                                                boxShadow: "0 0 15px rgba(179, 0, 0, 0.6)",
                                                transition: "all 0.3s ease-in-out",
                                            }}
                                            onMouseOver={(e) => {
                                                if (!isLoading) {
                                                    e.currentTarget.style.boxShadow = "0 0 25px rgba(179, 0, 0, 0.9)";
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (!isLoading) {
                                                    e.currentTarget.style.boxShadow = "0 0 15px rgba(179, 0, 0, 0.6)";
                                                }
                                            }}
                                        >
                                            {isLoading ? "Creating Account..." : "📧 Register & Send Verification"}
                                        </button>
                                    </div>

                                    {/* Login Link */}
                                    <div className="has-text-centered mt-4">
                                        <p className="has-text-grey-light">
                                            Already have an account?{" "}
                                            <a
                                                href="/login"
                                                style={{ color: "#b30000", fontWeight: "600" }}
                                                onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                                                onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                                            >
                                                Login here
                                            </a>
                                        </p>
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