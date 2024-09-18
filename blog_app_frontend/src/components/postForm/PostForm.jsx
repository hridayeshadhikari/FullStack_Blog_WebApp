import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RTE from "../RTE";
import Selectopt from "../Selectopt";
import { UploadToCloud } from "../../Utils/UploadToCloud";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch} from 'react-redux'
import { createPost } from "../../store/postSlice";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            featuredImage: post?.featuredImage || "",
            // category: post?.category || "active",
        },
    });

    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        try {
            const imageUrl = await UploadToCloud(event.target.files[0], "image");
            console.log(imageUrl);
            setSelectedImage(imageUrl);
            setValue("featuredImage", imageUrl); 
        } catch (error) {
            console.error("Image upload failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const submit = (data) => {
        dispatch(createPost(data))
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="md:w-2/3 px-2">
                <label>Title :</label>
                <input
                    
                    placeholder="Title"
                    className="mb-4 border-2 w-full p-2 mt-2 outline-none focus:border-2 "
                    {...register("title", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="md:w-1/3 px-2 pt-4 md:pt-0">
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
                {/* <Selectopt
                    options={["active", "inactive"]}
                    label="Category :"
                    className="mb-4"
                    {...register("category", { required: true })}
                /> */}
                <button type="submit" className="w-full bg-blue-600 rounded-lg my-3 text-white p-2">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}
