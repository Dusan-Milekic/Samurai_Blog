import { fetchPosts, selectPosts } from "../redux/api/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRef, useEffect, useState } from "react"; // 🔥 useRef umesto createRef
import { useParams } from "react-router-dom"; // 🔥 ukloni data import
import Navigation from "./Navigation";
import MarkdownRender from "./MarkdownRender";
import { useAuthCookies } from "../utils/cookies";
// 🔥 ukloni dupli useDispatch import

export default function DetailPost() {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const [users, setUsers] = useState<any[]>([]);
    const [allComments, setAllComments] = useState<any[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);

    const commentText = useRef<HTMLTextAreaElement>(null); // 🔥 useRef umesto createRef
    const cookie = useAuthCookies();

    // 🔥 ISPRAVKA - ukloni users iz dependency array (beskonačna petlja)
    useEffect(() => {
        dispatch(fetchPosts());

        const fetchUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/users/", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [dispatch]); // 🔥 ukloni users iz dependency

    const currentPost = posts.find(post => post.slug === slug);

    const GetComments = async (): Promise<any[]> => {
        try {
            const response = await fetch("http://127.0.0.1:8000/comments/");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("📦 Comments fetched:", data);
            return data;

        } catch (error) {
            console.error("❌ Error fetching comments:", error);
            return [];
        }
    };

    // 🔥 FETCH COMMENTS
    useEffect(() => {
        const fetchComments = async () => {
            setCommentsLoading(true);
            const comments = await GetComments();
            setAllComments(comments);
            setCommentsLoading(false);
        };

        fetchComments();
    }, []);

    const PostComment = async () => {
        try {
            setIsPosting(true);
            const userID = cookie.getUserSession()?.id;
            const postID = currentPost?.id;
            const comment = commentText.current?.value;

            if (!userID) {
                alert("You must be logged in to comment!");
                return;
            }

            if (!postID) {
                alert("Post not found!");
                return;
            }

            if (!comment || comment.trim() === "") {
                alert("Comment cannot be empty!");
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/comments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userID,
                    post: postID,
                    comment: comment.trim()
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("✅ Comment posted successfully:", result);

            // 🔥 OČISTI FORMU
            if (commentText.current) {
                commentText.current.value = "";
            }

            // 🔥 REFRESH COMMENTS
            const updatedComments = await GetComments();
            setAllComments(updatedComments);

            alert("Comment posted successfully!");

        } catch (error) {
            console.error("❌ Error posting comment:", error);
            alert(`Failed to post comment: ${error.message}`);
        } finally {
            setIsPosting(false);
        }
    };

    // 🔥 FILTRIRAJ KOMENTARE ZA TRENUTNI POST
    const postComments = allComments.filter((comment: any) => comment.post === currentPost?.id);

    // 🔥 HELPER FUNKCIJA ZA NALAŽENJE KORISNIKA
    const getUserById = (userId: number) => {
        const user = users.find(u => u.id === userId);
        return user ? user.username || user.email || `User ${userId}` : `User ${userId}`;
    };

    return (
        <>
            <Navigation />
            <section className="section" style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}>
                <div className="container">
                    {/* POST HEADER */}
                    <div className="modern-post-header mb-6">
                        <h1 className="title is-1 has-text-white mb-4">
                            {currentPost ? currentPost.title : "Post not found"}
                        </h1>

                        {currentPost && (
                            <div className="modern-post-meta">
                                <span className="tag is-dark">
                                    <i className="fa fa-calendar mr-2"></i>
                                    {new Date(currentPost.created_at || Date.now()).toLocaleDateString()}
                                </span>
                                <span className="tag is-primary ml-2">
                                    <i className="fa fa-user mr-2"></i>
                                    Author: Dusan Milekic
                                </span>
                            </div>
                        )}
                    </div>

                    {/* POST CONTENT */}
                    <div className="modern-post-content">
                        {currentPost ? (
                            <div className="box" style={{
                                backgroundColor: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                borderRadius: "12px"
                            }}>
                                <div className="content has-text-white">
                                    <MarkdownRender content={currentPost.content} />
                                </div>
                            </div>
                        ) : (
                            <div className="box has-background-danger-light">
                                <div className="content has-text-centered">
                                    <h3 className="title is-4">Post not found</h3>
                                    <p>The post you're looking for doesn't exist or has been removed.</p>
                                    <a href="/posts" className="button is-primary">
                                        <i className="fa fa-arrow-left mr-2"></i>
                                        Back to Posts
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* COMMENTS SECTION */}
                    {currentPost && (
                        <div className="modern-comments-section mt-6">
                            <div className="box" style={{
                                backgroundColor: "#1a1a1a",
                                border: "1px solid #2a2a2a",
                                borderRadius: "12px"
                            }}>
                                <h2 className="title is-3 has-text-white mb-4">
                                    <i className="fa fa-comments mr-3"></i>
                                    Comments ({postComments.length})
                                </h2>

                                {/* COMMENT FORM */}
                                <div className="modern-comment-form mb-5">
                                    <div className="field">
                                        <div className="control">
                                            <textarea
                                                className="textarea"
                                                ref={commentText}
                                                placeholder="Write your comment here..."
                                                style={{
                                                    backgroundColor: "#2a2a2a",
                                                    borderColor: "#3a3a3a",
                                                    color: "#f5f5f5"
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                className={`button is-primary ${isPosting ? 'is-loading' : ''}`}
                                                onClick={PostComment}
                                                disabled={isPosting}
                                            >
                                                <i className="fa fa-paper-plane mr-2"></i>
                                                {isPosting ? 'Posting...' : 'Post Comment'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* COMMENTS LIST */}
                                <div className="modern-comments-list">
                                    {commentsLoading ? (
                                        <div className="has-text-centered py-4">
                                            <div className="button is-loading is-ghost">Loading comments...</div>
                                        </div>
                                    ) : postComments.length > 0 ? (
                                        postComments.map((comment: any) => (
                                            <div key={comment.id} className="comment-item mb-4 p-4" style={{
                                                backgroundColor: "#2a2a2a",
                                                borderRadius: "8px",
                                                border: "1px solid #3a3a3a"
                                            }}>
                                                <div className="comment-header mb-2">
                                                    <span className="has-text-white has-text-weight-semibold">
                                                        {getUserById(comment.user)}
                                                    </span>
                                                    <span className="has-text-grey-light is-size-7 ml-2">
                                                        {new Date(comment.created_at || Date.now()).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="comment-content has-text-grey-light">
                                                    {comment.comment}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="has-text-grey-light has-text-centered py-6">
                                            <i className="fa fa-comment-o" style={{ fontSize: "3rem", marginBottom: "1rem" }}></i>
                                            <p>No comments yet. Be the first to comment!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BACK BUTTON */}
                    <div className="modern-back-section mt-6 has-text-centered">
                        <a href="/posts" className="button is-large is-outlined is-white">
                            <i className="fa fa-arrow-left mr-2"></i>
                            Back to All Posts
                        </a>
                    </div>
                </div>
            </section>

            <style>{`
                .modern-post-header {
                    text-align: center;
                    padding: 2rem 0;
                    border-bottom: 2px solid #c41e3a;
                    margin-bottom: 3rem !important;
                }

                .modern-post-meta {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .modern-post-content {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .modern-comments-section {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .modern-comment-form textarea:focus {
                    border-color: #c41e3a !important;
                    box-shadow: 0 0 0 0.125em rgba(196, 30, 58, 0.25) !important;
                }

                .modern-back-section {
                    padding: 2rem 0;
                }

                .button.is-outlined.is-white:hover {
                    background-color: #c41e3a;
                    border-color: #c41e3a;
                    color: white;
                }

                @media (max-width: 768px) {
                    .modern-post-meta {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .modern-post-content,
                    .modern-comments-section {
                        margin: 0 1rem;
                    }
                }
            `}</style>
        </>
    );
}