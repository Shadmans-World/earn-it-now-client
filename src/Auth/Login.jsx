import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useProvider from "../Hooks/useProvider";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const Login = () => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState('')
  const { signInUser ,signWithGoogle} = useProvider();
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
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
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log("Logged In User: ", res.user);
       
        setError("")
        navigate('/')
      })
      .catch((error) => {
        console.error("Error when login", error.message);
        setError(error.message)
      });
  };

  

  const handleGoogleSignIn = () => {
    signWithGoogle()
      .then((res) => {
        const user = res.user;
  
        // Default role as 'Worker' for Google sign-in users
        const defaultUserData = {
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL, // Use photoURL provided by Google
          role: "worker",
          coins: 10, // Default coins for workers
        };
  
        // Save user data to the database
        axiosPublic
          .post("/users", defaultUserData)
          .then((dbRes) => {
            console.log("User saved to database:", dbRes.data);
            setError("");
            navigate("/"); // Navigate after successful sign-in
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
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ height: "400px", width: "400px" }}
              />
            )}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-5xl font-bold mt-2 mb-3 text-center">
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
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: 'Password Is required' })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-sm mt-2">
                New to this website? Create An Account{" "}
                <Link to="/register" className="text-red-600">
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
