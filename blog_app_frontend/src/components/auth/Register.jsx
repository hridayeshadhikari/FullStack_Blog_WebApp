import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../../store/authSlice"
import peninhand from '../../asset/peninhand.png'
import { useEffect } from "react"

export default function Register() {
    const dispatch = useDispatch()
    const { isLoading, isError, message, isRegisterSuccess } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()


    const onSubmit = (data) => {
        // console.log(data);

        dispatch(signup(data))
        reset()
    }

    useEffect(()=>{
        if (isRegisterSuccess) {
            navigate("/login")
        }
    },[isRegisterSuccess,navigate])

    return (
        <div className="max-w-[500px] mx-auto border-2 my-5 p-5  ">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3"  >
                <h1 className="text-gray-400 font-extrabold text-6xl text-center ">Write<span className="text-orange-600">Up</span></h1>
                <img className="h-[130px] w-[130px] mx-auto mb-5" src={peninhand} alt="" />
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                    <input className="p-2 border-2 focus:outline-none focus:ring-1 focus:ring-gray-400" id="firstname" name="firstname" placeholder="First Name"  {...register("firstName", { required: true })} />
                    {errors.firstName && <span className="text-red-500">This field is required</span>}

                    <input className="p-2 border-2 focus:outline-none focus:ring-1 focus:ring-gray-400" id="lastname" name="lastname" placeholder="Last Name"  {...register("lastName", { required: true })} />
                    {errors.lastName && <span className="text-red-500">This field is required</span>}
                </div>

                <input className="p-2 border-2 focus:outline-none focus:ring-1 focus:ring-gray-400" id="email" name="email" placeholder="Email"  {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500">This field is required</span>}

                <input className="p-2 border-2 focus:outline-none focus:ring-1 focus:ring-gray-400" id="password" name="password" placeholder="Password" {...register("password", { required: true })} />
                {errors.password && <span className="text-red-500">This field is required</span>}


                <button className="bg-blue-600 w-full p-2 rounded-md text-white mt-8 font-bold" type="submit" >Register</button>
                <p className="text-end">already have an account? <Link className="text-blue-600" to={'/login'}>Login</Link></p>
            </form>
        </div>
    )
}