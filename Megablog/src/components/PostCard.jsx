import React from 'react'
import { bucketService } from '../services'
import { Link } from 'react-router'

const PostCard = ({$id, title, featuredImage}) => {
  const [imgSrc, setImgSrc] = React.useState(null);

  React.useEffect(() => {
    const src = bucketService.getFilePreview(featuredImage);
    setImgSrc(src);
  }, [featuredImage]);

  return (
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-indigo-100'>
            <div className='w-full justify-center mb-4 overflow-hidden rounded-lg'>
                <img src={imgSrc} alt={title} className='rounded-lg w-full aspect-square object-cover hover:scale-110 transition-transform duration-500' />
            </div>
            <h2 className='text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300'>{title}</h2> 
        </div>
      </Link>
  )
}

export default PostCard
