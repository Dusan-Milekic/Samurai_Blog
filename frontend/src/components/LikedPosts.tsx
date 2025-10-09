
import Navigation from "./Navigation";
import { useAuthCookies } from '../utils/cookies';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { fetchPosts, selectPosts } from "../redux/api/postSlice";
const API_BASE_URL = import.meta.env.VITE_API_URL
const fetchLikedPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/likes/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;

}


interface LikedPost {
    post: number;
    user: number;
}


export default function LikedPosts() {
    const dispatch = useAppDispatch();


    const cookie = useAuthCookies();
    const [data, setData] = useState<LikedPost[]>([]);

    const likedPostIds = data.map(d => d.post);
    const posts = useAppSelector(selectPosts).filter(post => likedPostIds.includes(post.id));
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    useEffect(() => {
        const getLikedPosts = async () => {
            const fetchedData = await fetchLikedPosts().then((posts) => posts.filter((like: { user: number; }) => like.user === cookie.getUserSession()?.id));
            setData(fetchedData);
        };

        getLikedPosts();
    }, []);

    return (
        <>
            <Navigation />
            <section className="section mt-6" style={{ backgroundColor: "#0f0f0f", minHeight: "100vh" }}>
                <div className="container">
                    {/* MODERN HEADER */}
                    <div className="modern-header mb-6">
                        <h2 className="title is-2 has-text-weight-bold mb-2">
                            <span className="modern-icon">❤️</span>
                            <span className="modern-text">Liked Posts</span>
                        </h2>
                        <div className="modern-subtitle">
                            {data.length} posts in your collection
                        </div>
                    </div>

                    {/* POSTS CONTAINER */}
                    <div className="modern-posts-container">
                        {posts.map((d) => (
                            <div key={d.id} className="modern-post-item">


                                {/* POST CONTENT */}
                                <div className="modern-post-content">
                                    <div className="modern-post-info">
                                        <h3 className="modern-post-title">
                                            {d.title}
                                        </h3>
                                        <div className="modern-post-id">
                                            Slug: {d.slug}
                                        </div>
                                    </div>

                                    {/* ARROW LINK */}
                                    <div className="modern-arrow-container">
                                        <a className="modern-arrow-link">
                                            <i className="fa fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                /* MODERN HEADER */
                .modern-header {
                    text-align: center;
                    padding: 3rem 0 2rem 0;
                    border-bottom: 1px solid #2a2a2a;
                    margin-bottom: 3rem !important;
                }

                .modern-text {
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    color: #f5f5f5;
                    margin-left: 1rem;
                }

                .modern-icon {
                    font-size: 2rem;
                    filter: grayscale(20%);
                }

                .modern-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    color: #888;
                    font-weight: 400;
                }

                /* POSTS CONTAINER */
                .modern-posts-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 800px;
                    margin: 0 auto;
                }

                /* MODERN POST ITEM */
                .modern-post-item {
                    position: relative;
                    background: linear-gradient(135deg, #1a1a1a, #151515);
                    border: 1px solid #2a2a2a;
                    border-radius: 12px;
                    padding: 1.5rem 2rem;
                    transition: all 0.2s ease-out;
                    cursor: pointer;
                }

                .modern-post-item:hover {
                    transform: translateY(-2px);
                    border-color: #c41e3a;
                    background: linear-gradient(135deg, #1e1e1e, #191919);
                    box-shadow: 0 8px 25px rgba(196, 30, 58, 0.1);
                }


                /* POST CONTENT */
                .modern-post-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .modern-post-info {
                    flex: 1;
                }

                .modern-post-title {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: #f5f5f5;
                    margin-bottom: 0.3rem;
                    line-height: 1.4;
                    transition: color 0.2s ease;
                }

                .modern-post-item:hover .modern-post-title {
                    color: #ffffff;
                }

                .modern-post-id {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    color: #666;
                    font-weight: 500;
                    transition: color 0.2s ease;
                }

                .modern-post-item:hover .modern-post-id {
                    color: #888;
                }

                /* ARROW CONTAINER */
                .modern-arrow-container {
                    display: flex;
                    align-items: center;
                    margin-left: 2rem;
                }

                .modern-arrow-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: #2a2a2a;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                    text-decoration: none;
                    color: #888;
                }

                .modern-post-item:hover .modern-arrow-link {
                    background: #c41e3a;
                    color: white;
                    transform: translateX(4px);
                }

                .modern-arrow-link i {
                    font-size: 1rem;
                    transition: transform 0.2s ease;
                }

                .modern-post-item:hover .modern-arrow-link i {
                    transform: translateX(2px);
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .modern-post-content {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    
                    .modern-arrow-container {
                        margin-left: 0;
                        align-self: flex-end;
                    }
                    
                    .modern-post-item {
                        padding: 1.25rem 1.5rem;
                    }

                    .modern-posts-container {
                        max-width: 100%;
                        padding: 0 1rem;
                    }
                }

                /* SMOOTH FOCUS STATES */
                .modern-arrow-link:focus {
                    outline: 2px solid #c41e3a;
                    outline-offset: 2px;
                }

                .modern-post-item:focus-within {
                    border-color: #c41e3a;
                }
            `}</style>
        </>
    );
}