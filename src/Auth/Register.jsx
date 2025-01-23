import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useProvider from "../Hooks/useProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const profilePhoto_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${profilePhoto_hosting_key}`;

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, signWithGoogle } = useProvider();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const formData = new FormData();
    const file = data.profilePhoto[0]; // Access the uploaded file
    formData.append("image", file);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        const imageUrl = result.data.url; // Get the uploaded image URL

        // Add the image URL to the `data` object
        const updatedData = {
          ...data,
          profilePhoto: imageUrl,
        };

        console.log(updatedData); // Logs the updated data with the image URL

        createUser(updatedData.email, updatedData.password)
        .then(res=>{
            updateProfile(auth.currentUser,{
                displayName:updatedData.name,
                photoURL: updatedData.profilePhoto
            })
            .then(()=>{
                console.log('Profile Updated')
            })
            console.log('USer:', res.user)
            navigate('/')
        })
        .catch(error=>{
            console.error('Error in sign up', error.message)
        })
      } else {
        console.error("Image upload failed:", result.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleGoogleSignIn = () => {
    signWithGoogle()
    .then(res=>{
        console.log('Google Logged In ',res.user )
    })
    .catch(error=> {
        console.error('Google sign in error ', error.message)
    })
  }

  return (
    <div>
      <Helmet>
        <title>Register || EIN</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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

              {/* Profile Photo */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo</span>
                </label>
                <input
                  type="file"
                  {...register("profilePhoto", {
                    required: "Profile photo is required.",
                  })}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
                {errors.profilePhoto && (
                  <span className="text-red-500 text-xs">
                    {errors.profilePhoto.message}
                  </span>
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
                <button onClick={handleGoogleSignIn} className="btn btn-primary w-full">Sign In With Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
