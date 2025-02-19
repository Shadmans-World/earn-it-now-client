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
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profilePhoto: imageUrl,
          role: data.role,
          coins: defaultCoins,
        };

        createUser(data.email, data.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: updatedData.name,
              photoURL: updatedData.profilePhoto,
            })
              .then(() => {
                axiosPublic
                  .post("/users", updatedData) // Send all data to DB
                  .then(() => navigate("/"))
                  .catch((error) => console.error("DB Save Error:", error));

                setError("");
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
          phone: "Not Provided",
          address: "Not Provided",
          role: "worker",
          coins: 10,
        };

        axiosPublic
          .post("/users", defaultUserData)
          .then(() => navigate("/dashboard"))
          .catch((error) => console.error("Google DB Save Error:", error));
      })
      .catch((error) => {
        setError(error.message);
        console.error("Google Sign-In Error:", error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register || EIN</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen px-4 sm:px-8 lg:px-20">
        <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center lg:justify-between gap-8">
          <div className="w-full lg:w-1/2 flex justify-center">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto"
              />
            )}
          </div>

          <div className="card bg-base-100 w-[270px] md:w-[500px] p-6 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-4xl font-bold text-center mb-4">
                Register Now!
              </h1>

              {/* Name */}
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required." })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required." })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              {/* Phone Number */}
              <div className="form-control">
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone number is required." })}
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
              </div>

              {/* Address */}
              <div className="form-control">
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required." })}
                  placeholder="Address"
                  className="input input-bordered"
                />
                {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
              </div>

              {/* Profile Photo */}
              <div className="form-control">
                <label className="label">Profile Photo</label>
                <input
                  type="file"
                  {...register("profilePhoto", { required: "Profile photo is required." })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.profilePhoto && <span className="text-red-500 text-xs">{errors.profilePhoto.message}</span>}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">Password</label>
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
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="label">Role</label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="select select-bordered"
                  defaultValue=""
                >
                  <option value="" disabled>Choose Your Role</option>
                  <option value="worker">Worker</option>
                  <option value="buyer">Buyer</option>
                </select>
                {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
              </div>

              {/* Submit */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>

            <div className="w-full flex justify-center mt-4">
              <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
                Sign In with Google
              </button>
            </div>

            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
