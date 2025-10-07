import Navigation from "./Navigation";

export default function Home() {
    return (
        <>
            <Navigation />
            <section
                className="hero is-fullheight has-text-centered"
                style={{
                    background:
                        "linear-gradient(180deg, #000000 0%, #111111 50%, #1a0000 100%)",
                    color: "#f5f5f5",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="hero-body">
                    <div className="container" style={{ maxWidth: "900px" }}>
                        {/* Glavni naslov */}
                        <h1
                            className="title is-1 mb-5"
                            style={{
                                color: "#b30000",
                                fontWeight: 800,
                                textShadow: "0 0 20px rgba(179, 0, 0, 0.5)",
                            }}
                        >
                            Samurai Blog 🥋
                        </h1>

                        {/* Citat */}
                        <p
                            className="subtitle is-4 mb-6"
                            style={{ fontStyle: "italic", color: "#a0a0a0" }}
                        >
                            “A sword may rust, but the spirit of the samurai never fades.”
                        </p>

                        {/* Glavni tekst */}
                        <div
                            className="content is-size-5 mb-6"
                            style={{ color: "#d0d0d0", lineHeight: "1.8" }}
                        >
                            <p>
                                Once strong and fearless, the Samurai faced sickness and
                                depression that changed his entire path. Emotions faded,
                                friendships broke, and the light dimmed.
                            </p>
                            <p>
                                But within the silence, he found a new weapon —{" "}
                                <b style={{ color: "#b30000" }}>code</b>. What began as
                                curiosity turned into discipline, and through endless lines of
                                logic, he forged himself anew.
                            </p>
                        </div>

                        {/* Misija */}
                        <h3
                            className="title is-4 mb-3"
                            style={{
                                color: "#b30000",
                                fontWeight: 700,
                            }}
                        >
                            The Mission
                        </h3>
                        <p
                            className="is-size-5 mb-6"
                            style={{ color: "#c0c0c0", lineHeight: "1.7" }}
                        >
                            Samurai Blog is a reflection of discipline, focus, and rebirth.
                            It’s not just about programming — it’s about strength of mind and
                            the path of personal growth.
                        </p>

                        {/* Dugme */}
                        <a
                            href="/posts"
                            className="button is-medium is-rounded"
                            style={{
                                backgroundColor: "#b30000",
                                border: "none",
                                color: "#fff",
                                padding: "1rem 2rem",
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                boxShadow: "0 0 15px rgba(179, 0, 0, 0.5)",
                                transition: "all 0.3s ease-in-out",
                            }}
                            onMouseOver={(e) =>
                            (e.currentTarget.style.boxShadow =
                                "0 0 25px rgba(179, 0, 0, 0.8)")
                            }
                            onMouseOut={(e) =>
                            (e.currentTarget.style.boxShadow =
                                "0 0 15px rgba(179, 0, 0, 0.5)")
                            }
                        >
                            Enter the Dojo
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
