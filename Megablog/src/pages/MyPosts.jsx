import {useState, useEffect} from 'react'
import { Container, PostCard, LoadingBar } from '../components'
import {databaseService} from "../services";
import { useSelector } from 'react-redux';

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userId = useSelector(state => state.auth.userData.$id);
    
    useEffect(() => {
        setLoading(true)
        databaseService.getPostsByUser(userId).then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, [userId])
    
    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <Container>
                    <LoadingBar message="Loading your posts..." />
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center page-transition">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full animate-fade-in">
                            <h1 className="text-3xl font-bold text-gray-700 hover:text-indigo-600 transition-colors">
                                You haven't created any posts yet.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 page-transition'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post, index) => (
                        <div key={post.$id} className='p-2 w-1/4 card-item'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts