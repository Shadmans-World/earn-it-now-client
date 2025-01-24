import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useProvider from "../Hooks/useProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signWithGoogle } = useProvider();
  const navigate = useNavigate();

  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(""); // Moved inside the Register component
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch("/register-lottie.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    fetchAnimationData();
  }, []);

  const onSubmit = async (data) => {
    // Add default coins based on role
    const defaultCoins = data.role === "worker" ? 10 : 50;

    const updatedData = {
      ...data,
      coins: defaultCoins, // Add default coins to the user data
    };

    createUser(updatedData.email, updatedData.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: updatedData.name,
          photoURL: updatedData.profilePhoto, // Directly use the URL from input
        })
          .then(() => {
            console.log("Profile Updated");

            // Save user to database with default coins
            axiosPublic
              .post("/users", updatedData)
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.error("Sign Up details in db", error.message);
              });

            setError("");
            navigate("/dashboard"); // Navigate after successful registration
          })
          .catch((error) => {
            setError(error.message);
            console.error("Error updating profile:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error in sign-up:", error.message);
        setError(error.message);
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
            navigate("/dashboard"); // Navigate after successful sign-in
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
        <title>Register || EIN</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Lottie Animation */}
          <div className="text-center lg:ml-10 lg:text-left">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ height: "300px", width: "300px" }}
              />
            )}
          </div>

          {/* Registration Form */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-5xl font-bold mt-2 mb-3 text-center">
                Register now!
              </h1>
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required." })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format.",
                    },
                  })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Profile Photo (URL input instead of file upload) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("profilePhoto", {
                    required: "Profile photo URL is required.",
                  })}
                  placeholder="Profile Photo URL"
                  className="input input-bordered"
                />
                {errors.profilePhoto && (
                  <span className="text-red-500 text-xs">
                    {errors.profilePhoto.message}
                  </span>
                )}
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose Your Role
                  </option>
                  <option value="worker">Worker</option>
                  <option value="buyer">Buyer</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be less than 20 characters.",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message:
                        "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                    },
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p className="text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-red-600">
                  Login
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

export default Register;
