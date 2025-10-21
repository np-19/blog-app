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
                    console.log(post.featuredImage);                    
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

    console.log(imgSrc);
    
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
        <div className="py-8 page-transition">
            <Container>
                <div className="w-full flex justify-center mb-6 relative border-2 border-indigo-200 rounded-2xl p-3 bg-white shadow-lg overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={post.title}
                        className="rounded-xl max-h-[500px] object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
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
                <div className="w-full mb-6 bg-white rounded-xl p-6 shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
                </div>
                <div className="browser-css bg-white rounded-xl p-8 shadow-md prose prose-lg max-w-none">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}