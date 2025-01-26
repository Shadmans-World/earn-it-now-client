import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useProvider from "../Hooks/useProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState("");
  const { signInUser, signWithGoogle } = useProvider();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch("/login-lottie.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    fetchAnimationData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        setError("");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error when logging in:", error.message);
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signWithGoogle()
      .then((res) => {
        const user = res.user;

        const defaultUserData = {
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL,
          role: "worker",
          coins: 10,
        };

        axiosPublic
          .post("/users", defaultUserData)
          .then(() => {
            setError("");
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Error saving Google user to database:", error.message);
            setError("");
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login || EIN</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex flex-col-reverse lg:flex-row gap-y-6 lg:gap-x-10">
          {/* Animation Section */}
          <div className="flex justify-center items-center">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{
                  height: "300px",
                  
                  maxWidth: "100%",
                }}
                className="lg:h-[400px] lg:w-[400px]"
              />
            )}
          </div>

          {/* Login Form */}
          <div className="card bg-base-100 w-[270px] md:w-full shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-4xl lg:text-5xl font-bold mt-2 mb-3 text-center">
                Login now!
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="email"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="password"
                  className="input input-bordered w-full"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Login</button>
              </div>
              <p className="text-sm mt-2 text-center">
                New to this website?{" "}
                <Link to="/register" className="text-red-600 font-semibold">
                  Register
                </Link>
              </p>
            </form>
            <div className="flex justify-center w-full px-8 mb-5">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary w-full"
              >
                Sign In With Google
              </button>
            </div>
            {error && (
              <span className="text-red-500 text-center mb-3">{error}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
