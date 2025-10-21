import { useState } from "react";
import {Link, useNavigate} from 'react-router';
import { authService } from "../../services";
import {login as authLogin} from '../../features/auth/authSlice';
import {Button, Logo, Input} from '../index';
import {useDispatch} from 'react-redux';
import {useForm} from "react-hook-form";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async(data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if(session) {
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin({userData}));
                    navigate("/");
                
            }
            
        } catch (error) {
            setError(error.message || "An error occurred during login.");
            
        } finally {
            setLoading(false);
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full py-8 animate-fade-in'
    >
        <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-2xl border border-indigo-100`}>
        <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-800">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-600">
                    Don't have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
