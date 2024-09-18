import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { login } from "../../store/authSlice"
import peninhand from '../../asset/peninhand.png'


export default function Login() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { isLoading, isError, message, isLoginSuccess } = useSelector((state) => state.auth); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const onSubmit = (data) => {
        dispatch(login(data))
    }
    if (isLoginSuccess) {
        navigate('/')
    }



    return (
        <div className="max-w-[500px] mx-auto border-2 my-5 p-5  ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col"  >
                <h1 className="text-gray-400 font-extrabold text-6xl text-center">Write<span className="text-orange-600">Up</span></h1>  
                <img className="h-[130px] w-[130px] mx-auto mb-5" src={peninhand} alt="" />
                <input className="p-2 border-2 " placeholder="Email"  {...register("email", {required:true})} />
                {errors.email && <span className="text-red-500">This field is required</span>}
                
                <input className="p-2 border-2 mt-8" placeholder="Password" {...register("password", { required: true })} />
                {errors.password && <span className="text-red-500">This field is required</span>}


                <button className="bg-blue-600 w-full p-2 rounded-md text-white mt-8 font-bold" type="submit" >Login</button>
                <p className="pt-2 text-end">don't have an account? <Link className="text-blue-600" to={'/register'}>Signup</Link></p>
            </form>
        </div>
    )
}