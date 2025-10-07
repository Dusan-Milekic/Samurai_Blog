import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    fetchPosts,
    likePost,
    selectPosts,
    selectPostsLoading,
    selectPostsError,
    selectLikingMap,
} from "../redux/api/postSlice";
import Navigation from "./Navigation";
import MarkdownRender from "./MarkdownRender";

/* --- Konstante i helperi --- */
const RED = "#b30000";

function formatDate(iso: string) {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}

/* --- SVG ikone --- */
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? RED : "none"} stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const ShareIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
    </svg>
);
const CommentIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
);

export default function Posts() {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsLoading);
    const error = useAppSelector(selectPostsError);
    const liking = useAppSelector(selectLikingMap); // { [postId]: boolean }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    async function handleShare(slug: string) {
        const url = `${window.location.origin}/posts/${slug}`;
        try {
            await navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        } catch {
            prompt("Copy post URL:", url);
        }
    }

    if (loading) {
        return (
            <>
                <Navigation />
                <section className="section has-text-centered" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
                    <progress className="progress is-danger" value="60" max="100" />
                    <p className="has-text-grey-light">Loading posts...</p>
                </section>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <section className="section" style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Poppins', sans-serif", paddingTop: "6rem" }}>
                <div className="container">
                    {error && (
                        <div className="notification is-danger" style={{ backgroundColor: "#2b0000", color: "#fff", border: `1px solid ${RED}` }}>
                            {error}
                        </div>
                    )}

                    {posts.length === 0 ? (
                        <div className="has-text-centered">
                            <p className="title is-4" style={{ color: RED }}>No posts yet</p>
                            <p className="subtitle is-6 has-text-grey-light">When the code is ready, the story will appear.</p>
                        </div>
                    ) : (
                        posts.map((post) => {
                            const isLiking = !!liking[post.id];
                            return (
                                <article
                                    key={post.id}
                                    className="box"
                                    style={{
                                        backgroundColor: "#0d0d0d",
                                        border: `1px solid ${RED}`,
                                        boxShadow: "0 0 18px rgba(179,0,0,0.25)",
                                        marginBottom: "2.5rem",
                                    }}
                                >
                                    <header className="mb-4">
                                        <h1
                                            className="title is-3"
                                            style={{
                                                color: RED,
                                                borderBottom: `1px solid ${RED}`,
                                                paddingBottom: "0.4rem",
                                                marginBottom: "0.75rem",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            {post.title}
                                        </h1>
                                        <div className="is-flex is-justify-content-space-between is-align-items-center">
                                            <span className="tag is-dark" style={{ border: `1px solid ${RED}` }}>
                                                {formatDate(post.created_at)}
                                            </span>
                                            {post.published ? (
                                                <span className="tag" style={{ backgroundColor: RED, color: "#fff" }}>Published</span>
                                            ) : (
                                                <span className="tag is-warning">Draft</span>
                                            )}
                                        </div>
                                    </header>

                                    <MarkdownRender content={post.content} />

                                    <footer className="mt-4 is-flex is-justify-content-space-between is-align-items-center" style={{ color: "#a0a0a0" }}>
                                        <div className="is-flex is-align-items-center" style={{ gap: "1rem" }}>
                                            <button
                                                className="button is-small"
                                                onClick={() => dispatch(likePost(post.id))}
                                                title="Like"
                                                disabled={isLiking}
                                                aria-disabled={isLiking}
                                                style={{
                                                    backgroundColor: "transparent",
                                                    border: `1px solid ${RED}`,
                                                    color: "#fff",
                                                    opacity: isLiking ? 0.6 : 1,
                                                    cursor: isLiking ? "not-allowed" : "pointer",
                                                }}
                                            >
                                                <span className="icon">
                                                    <HeartIcon />
                                                </span>
                                                <span style={{ marginLeft: "0.4rem" }}>{post.count_likes}</span>
                                            </button>

                                            <button
                                                className="button is-small"
                                                onClick={() => handleShare(post.slug)}
                                                title="Share"
                                                style={{ backgroundColor: "transparent", border: `1px solid ${RED}`, color: "#fff" }}
                                            >
                                                <span className="icon">
                                                    <ShareIcon />
                                                </span>
                                                <span style={{ marginLeft: "0.4rem" }}>Share</span>
                                            </button>

                                            <a
                                                className="button is-small"
                                                href={`/posts/${post.slug}#comments`}
                                                title="Comments"
                                                style={{ backgroundColor: "transparent", border: `1px solid ${RED}`, color: "#fff" }}
                                            >
                                                <span className="icon">
                                                    <CommentIcon />
                                                </span>
                                                <span style={{ marginLeft: "0.4rem" }}>Comments</span>
                                            </a>
                                        </div>

                                        <a href={`/posts/${post.slug}`} className="has-text-weight-semibold" style={{ color: RED }}>
                                            Read →
                                        </a>
                                    </footer>
                                </article>
                            );
                        })
                    )}
                </div>
            </section>
        </>
    );
}
