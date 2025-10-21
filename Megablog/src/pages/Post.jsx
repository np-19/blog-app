import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {databaseService, bucketService } from "../services";
import { Button, Container, LoadingBar } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);    

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (id) {
            setLoading(true);
            databaseService.getPost(id).then((post) => {
                if (post){
                     setPost(post);
                    bucketService.getFilePreview(post?.featuredImage).then((src) => {
                        setImgSrc(src);
                    });
                    
                } else navigate("/");
            })
            .finally(() => {
                setLoading(false);
            });
           

        } else navigate("/");
    }, [id, navigate]);

    const deletePost = () => {
        databaseService.deletePost(post.$id).then((status) => {
            if (status) {
                bucketService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    
    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <Container>
                    <LoadingBar message="Loading post..." />
                </Container>
            </div>
        )
    }

    return post ? (
        <div className="py-4 sm:py-8 page-transition">
            <Container>
                {/* Main Content - Image and Text Side by Side on Desktop */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Featured Image Section */}
                    <div className="w-full lg:w-2/5 flex-shrink-0">
                        <div className="sticky top-24">
                            {/* Image Card */}
                            <div className="bg-white rounded-2xl p-3 shadow-xl border-2 border-indigo-200 overflow-hidden">
                                <img
                                    src={imgSrc}
                                    alt={post.title}
                                    className="rounded-xl w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-indigo-100">
                        {/* Title and Actions */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                                {post.title}
                            </h1>
                            {isAuthor && (
                                <div className="flex gap-2 flex-shrink-0">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-gradient-to-r from-emerald-600 to-teal-600" className="shadow-lg">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-gradient-to-r from-red-600 to-rose-600" onClick={deletePost} className="shadow-lg">
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="mb-6">
                            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="browser-css prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}