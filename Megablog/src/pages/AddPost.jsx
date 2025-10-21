import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-4 sm:py-6 lg:py-8 page-transition'>
        <Container>          
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost