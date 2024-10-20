import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import CreatePostPage from "../pages/CreatePostPage";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import EditPost from "../pages/EditPost";
import SearchResultPage from "../pages/SearchResultPage";

export const Router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/category",
                element:<CategoryPage/>
            },
            {
                path:"/create-post",
                element:(
                    <ProtectedRoute>
                        <CreatePostPage/>
                    </ProtectedRoute>
                )
            },
            {
                path:"/edit-post/:postId",
                element:(
                    <ProtectedRoute>
                        <EditPost/>
                    </ProtectedRoute>
                )
            },
            {
                path:"/post/:postId",
                element:<PostPage/>
            },
            {
                path:"/login",
                element:<LoginPage/>
            },
            {
                path:"/register",
                element:<RegisterPage/>
            },
            {
                path:"/search",
                element:<SearchResultPage/>
            }
        ]
    }
])