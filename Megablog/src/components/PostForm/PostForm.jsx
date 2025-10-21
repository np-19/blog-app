import {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index';
import {databaseService, bucketService} from '../../services';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const PostForm = ({ post = null }) => {
    const {register, handleSubmit, setValue,
     watch, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            featuredImage: post?.featuredImage || '',
            content: post?.content || '',
            status: post?.status || 'active',
            slug: post?.slug || ''
        }
    });
    
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const [imgSrc, setImgSrc] = useState(null);

    const handleFileUpload = async (file) => {
        if(!file) return;
        try {
            const uploadedFile = await bucketService.uploadFile(file);
            return uploadedFile.$id;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const submit = async (data) => {
          try {
             const fileId = data.image[0] ? await handleFileUpload(data.image[0]) : null; //data.image[0] ? can be null if no file is uploaded yet.
             if(post && fileId) await bucketService.deleteFile(post.featuredImage); //delete old image
             const payload ={
                  ...data,
                  featuredImage: fileId || post.featuredImage,
                  userId: userData.$id
             }
              const dbPost = post ?
              await databaseService.updatePost(post.$id, payload):
              await databaseService.createPost(payload);
              if(dbPost) {
                  navigate(`/post/${dbPost.$id}`);
             }
          } catch (error) {

            console.log(error);
            
            
          }
        }

    const slugTransform = useCallback((value) => {
        return value?.trim()
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      }, []);

      useEffect(() =>{
        let url;
        const subscription = watch((value, {name}) => {
          if(name === "title") {
            const slug = slugTransform(value.title);
            setValue("slug", slug, {shouldValidate: true});
          }
          if(name === "image" && value.image && value.image.length > 0) {
            const file = value.image[0];
            url = URL.createObjectURL(file);
            setImgSrc(url);
          }
        });
        return () => {
            subscription.unsubscribe();
            if(url) URL.revokeObjectURL(url);
        };
      }, [watch, setValue, slugTransform]);

       useEffect(() => {
        post ? bucketService.getFilePreview(post?.featuredImage).then((src) => {
        if(!imgSrc) setImgSrc(src);
        }): null;
        
    }, []);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {imgSrc && (
                    <div className="w-full mb-4">
                        <img
                            src={imgSrc}
                            alt={post?.title || "Featured"}
                            className="rounded-lg h-30 object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-gradient-to-r from-emerald-600 to-teal-600" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}


export default PostForm
