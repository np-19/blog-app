import { useState } from "react";
import { authService } from "../../services";
import { Link, useNavigate } from "react-router";
import { login } from "../../features/auth/authSlice";
import { Button, Logo, Input } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
        console.log(error);
        
      setError(error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-4 sm:py-8 px-4 animate-fade-in">
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-indigo-100`}
      >
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl sm:text-3xl font-bold leading-tight text-gray-800">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
