import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, disLikePost, getPostById, likePost } from "../../store/postSlice";
import parse from "html-react-parser"
import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function Post() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const postId = useParams()
    const dispatch = useDispatch()
    const post = useSelector(state => state.post.singlePost)
    const { user } = useSelector(state => state.auth)
    const [comment,setComment]=React.useState('')

    // console.log("Postid",postId.postId);
    // console.log("AAAAA",post);

    const handleDeletePost = async (postId) => {
        try {
            dispatch(deletePost(postId));
            navigate("/");
        } catch (error) {
            console.error("Failed to delete the post:", error);
        }
    }


    const handleLikePost=(postId)=>{
        dispatch(likePost(postId))
    }
    const handleDisLikePost=(postId)=>{
        dispatch(disLikePost(postId))
    }

    const handleInputChange=(e)=>{
        setComment(e.target.value)
    }

    const handleSubmit=()=>{
        if(comment.trim()){
            console.log("comment ====>",comment);
        }
        else{
            console.log("please enter comment");
            
        }
    }

    const handleCreateComment=()=>{

    }

    useEffect(() => {
        dispatch(getPostById(postId.postId))
    }, [dispatch, postId])

    // console.log("user====>",user);

    return (
        <div className="py-10 max-w-[380px] md:max-w-[700px] lg:max-w-[1250px] mx-auto grid md:grid-cols-[2fr_.8fr] gap-8">
            <div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post?.featuredImage}
                        alt=""
                        className="rounded-xl h-[25rem]"
                    />

                    {post?.author?.id === user?.id ? (
                        <div className="absolute right-6 top-6">

                            <button onClick={()=>navigate(`/edit-post/${post.postId}`)} className="mr-3 bg-green-500 px-3 py-1 text-white rounded-lg">
                                Edit Post
                            </button>

                            <button onClick={handleOpen} className="bg-red-500 text-white rounded-lg py-1 px-3" >
                                Delete Post
                            </button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Are you sure want to delete the post
                                    </Typography>
                                    <button className="bg-blue-600 text-white px-3 font-semibold p-1 mr-4 mt-4 rounded-lg hover:bg-blue-500">cancel</button>
                                    <button onClick={() => handleDeletePost(post.postId)} className="bg-blue-600 text-white px-3 p-1 mt-4 font-semibold rounded-lg hover:bg-blue-500">OK</button>
                                </Box>
                            </Modal>
                        </div>) : <div></div>
                    }
                </div>
                <div className="max-w-[700px] mx-auto mb-6 ">
                    <h1 className="text-4xl font-bold">{post?.title}</h1>
                    <p className="mt-2 text-end text-sm">written by <u className='text-gray-400 underline decoration-blue-600 underline-offset-4 decoration-[1.5px]'>{post?.author?.firstName} {post?.author?.lastName}</u></p>
                    <div className="browser-css mt-8 ">
                        <p className="text-gray-600 font-medium">{parse(`${post?.content}`)}</p>
                    </div>
                    <div className='space-x-4 flex mt-4'>
                        <p className='text-blue-600'><ThumbUpOffAltIcon onClick={()=>handleLikePost(post.postId)}/>{post?.liked.length}</p>
                        <p className='text-red-500'><ThumbDownOffAltIcon onClick={()=>handleDisLikePost(post.postId)}/>{post?.disliked.length}</p>
                    </div>
                    <div>
                        <h2 className="text-white bg-blue-600 w-full p-1 mt-[60px]">LEAVE A REPLY</h2>
                        <input onChange={handleInputChange} className="p-4 border-[1.5px] w-full pb-[60px] outline-none focus:border-[1.5px]" type="text " placeholder="Write a comment ...." value={comment} />
                        <div className="border-[1.5px] w-full border-t-0  p-4 flex flex-col  items-end">
                            <button onClick={handleSubmit}  className="border-[1.5px] p-1 px-4 text-gray-400 hover:bg-gray-200 hover:text-gray-500">Comment</button>
                        </div>
                    </div>
                </div>

            </div>
            <Sidebar />
        </div>
    );
}