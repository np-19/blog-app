import React, {useEffect, useState} from 'react'
import {Container, PostForm, LoadingBar} from '../components'
import {databaseService} from "../services";
import { useNavigate,  useParams } from 'react-router';

function EditPost() {
    const [post, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setLoading(true)
            databaseService.getPost(id).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
            .finally(() => {
                setLoading(false)
            })
        } else {
            navigate('/')
        }
    }, [id, navigate])

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center">
                <Container>
                    <LoadingBar message="Loading post editor..." />
                </Container>
            </div>
        )
    }

    return post ? (
        <div className='py-8 page-transition'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost