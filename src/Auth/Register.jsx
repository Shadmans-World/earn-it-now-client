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
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState("");
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
    const formData = new FormData();
    const file = data.profilePhoto[0];
    formData.append("image", file);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        const imageUrl = result.data.url;

        const defaultCoins = data.role === "worker" ? 10 : 50;

        const updatedData = {
          ...data,
          profilePhoto: imageUrl,
          coins: defaultCoins,
        };

        createUser(updatedData.email, updatedData.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: updatedData.name,
              photoURL: updatedData.profilePhoto,
            })
              .then(() => {
                axiosPublic
                  .post("/users", updatedData)
                  .then(() => {})
                  .catch((error) => console.error("DB Save Error:", error));

                setError("");
                navigate("/");
              })
              .catch((error) => {
                setError(error.message);
                console.error("Profile Update Error:", error);
              });
          })
          .catch((error) => {
            setError(error.message);
            console.error("Sign-Up Error:", error);
          });
      } else {
        setError(result.error.message);
        console.error("Image Upload Failed:", result.error.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Image Upload Error:", error);
    }
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
            console.error("Google DB Save Error:", error.message);
            setError("");
          });
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register || EIN</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen px-4 sm:px-8 lg:px-20">
        <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center lg:justify-between gap-8">
          {/* Lottie Animation */}
          <div className="w-full lg:w-1/2 flex justify-center">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto"
              />
            )}
          </div>

          {/* Registration Form */}
          <div className="card bg-base-100 w-[270px] md:w-[500px] p-6 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-4xl font-bold text-center mb-4">
                Register Now!
              </h1>
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
                  <span className="text-red-500 text-xs">{errors.name.message}</span>
                )}
              </div>

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
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  {...register("profilePhoto", {
                    required: "Profile photo is required.",
                  })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.profilePhoto && (
                  <span className="text-red-500 text-xs">
                    {errors.profilePhoto.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="select select-bordered"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose Your Role
                  </option>
                  <option value="worker">Worker</option>
                  <option value="buyer">Buyer</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs">{errors.role.message}</p>
                )}
              </div>

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
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message:
                        "Password must have uppercase, lowercase, number, and special character.",
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
              <p className="text-sm text-center mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </p>
            </form>
            <div className="w-full flex justify-center mt-4">
              <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                Sign In with Google
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-center mt-3">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
