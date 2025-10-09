import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useAuthCookies } from '../utils/cookies';
import {
    fetchLikes,
    selectLikes,
    selectLikesLoading
} from '../redux/api/likedPostsSlice';

interface LikedPostsCardProps {
    onClick?: () => void;
}

export default function LikedPostsCard({ onClick }: LikedPostsCardProps) {
    const dispatch = useAppDispatch();
    const cookies = useAuthCookies();
    const allLikes = useAppSelector(selectLikes);
    const loading = useAppSelector(selectLikesLoading);

    const currentUser = cookies.getUserSession();

    useEffect(() => {
        dispatch(fetchLikes());
    }, [dispatch]);

    // Filtriraj likes za trenutnog korisnika
    const userLikes = allLikes.filter(like => like.user === currentUser?.id);


    // 🔥 ISPRAVI - uzmi LENGTH umesto niz
    const likesCount = userLikes.length;

    return (
        <div
            className="card"
            onClick={onClick}
            style={{
                backgroundColor: "#0d0d0d",
                border: "2px solid #b30000",
                boxShadow: "0 4px 20px rgba(179, 0, 0, 0.4)",
                color: "#f5f5f5",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                maxWidth: "350px",
                margin: "0 auto"
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(179, 0, 0, 0.8)";
                e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(179, 0, 0, 0.4)";
                e.currentTarget.style.transform = "translateY(0px)";
            }}
        >
            <div className="card-content is-flex is-flex-direction-column is-align-items-center">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <span
                                className="icon is-large"
                                style={{
                                    fontSize: "2.5rem",
                                    color: "#b30000",
                                    textShadow: "0 0 10px rgba(179, 0, 0, 0.6)"
                                }}
                            >
                                ❤️
                            </span>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4" style={{ color: "#b30000", fontWeight: "700" }}>
                            Liked Posts
                        </p>
                        <p className="subtitle is-6" style={{ color: "#cfcfcf" }}>
                            Your favorite articles
                        </p>
                    </div>
                </div>

                <div className="content">
                    <p style={{ color: "#bdbdbd", fontSize: "0.9rem" }}>
                        View all the blog posts you've liked and saved for later reading.
                    </p>

                    <div className="tags has-addons mt-3 is-justify-content-center">
                        <span className="tag is-dark">Posts liked</span>
                        <span
                            className="tag"
                            style={{
                                backgroundColor: "#b30000",
                                color: "#fff",
                                fontWeight: "bold"
                            }}
                        >
                            {loading ? "..." : likesCount}
                        </span>
                    </div>


                </div>
            </div>

            <footer className="card-footer" style={{ borderTop: "1px solid #333" }}>
                <a className="card-footer-item" href="/liked-posts" style={{ textDecoration: "none" }}>
                    <span style={{ color: "#b30000", fontWeight: "600" }}>
                        Click to view →
                    </span>
                </a>
            </footer>
        </div>
    );
}