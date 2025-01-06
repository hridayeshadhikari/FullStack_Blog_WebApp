import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RTE from "../RTE";
import { UploadToCloud } from "../../Utils/UploadToCloud";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../store/postSlice";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast, ToastContainer, Bounce } from 'react-toastify'; // Import toast

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            featuredImage: post?.featuredImage || "",
            category: post?.category || "",
        },
    });

    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Optional if you want to redirect after success

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        try {
            const imageUrl = await UploadToCloud(event.target.files[0], "image");
            setSelectedImage(imageUrl);
            setValue("featuredImage", imageUrl);
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (post?.featuredImage) {
            setSelectedImage(post.featuredImage);
        }
    }, [post]);

    const submit = async (data) => {
        if (post) {
            const updatedData = {
                ...post,
                title: data.title !== post.title ? data.title : post.title,
                content: data.content !== post.content ? data.content : post.content,
                category: data.category !== post.category ? data.category : post.category,
                featuredImage: data.featuredImage !== post.featuredImage ? data.featuredImage : post.featuredImage,
            };
            await dispatch(updatePost(updatedData));
            toast.success('Post updated successfully! redirecting');
            setTimeout(() => {
                navigate("/post/post.postId")
            }, 2500)

        } else {
            await dispatch(createPost(data));
            toast.success('Post created successfully!');
            setTimeout(() => {
                navigate("/post/post.postId")
            }, 2500)
        }
        reset();
    };

    const [category, setCategory] = React.useState(post?.category || "");

    const handleChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setValue("category", selectedCategory);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="md:w-2/3 px-2">
                <label>Title :</label>
                <input
                    placeholder="Title"
                    className="mb-4 border-2 w-full p-2 mt-2 outline-none focus:border-2"
                    {...register("title", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <div className="md:w-1/3 px-2 pt-4 md:pt-0">
                <label>Select category :</label>
                <Box sx={{ minWidth: 120, marginTop: 2, marginBottom: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value="lifestyle">Lifestyle</MenuItem>
                            <MenuItem value="technology">Technology</MenuItem>
                            <MenuItem value="Health and Fitness">Health and Fitness</MenuItem>
                            <MenuItem value="Food and Drink">Food and Drink</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Fashion">Fashion</MenuItem>
                            <MenuItem value="Beauty">Beauty</MenuItem>
                            <MenuItem value="Photography">Photography</MenuItem>
                            <MenuItem value="Art and Culture">Art and Culture</MenuItem>
                            <MenuItem value="Programming">Programming</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Gaming">Gaming</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <label>Featured Image :</label>
                <input
                    type="file"
                    className="mb-4 mt-2 w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={handleSelectImage}
                />
                {isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    selectedImage && <img src={selectedImage} alt="Uploaded" className="w-full rounded-lg" />
                )}

                <button type="submit" className="w-full bg-blue-600 rounded-lg my-3 text-white p-2">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}
