import React from "react";
import { useForm } from "react-hook-form";
import useDbUser from "../../../Hooks/useDbUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [dbUsers, currentUser,refetch] = useDbUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // Handle image upload to ImageBB if provided
    if (data.taskImage[0]) {
      const formData = new FormData();
      formData.append("image", data.taskImage[0]);

      const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; // Replace with your ImageBB API key
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        data.task_image_url = result.data.url; // Save uploaded image URL to data
        if (currentUser.role === "buyer") {
          const { taskImage, ...rest } = data;
          const email = currentUser.email;
          const buyerName = currentUser.name;
          const finalData = { ...rest, email ,buyerName};
          // console.log("Form Data:", finalData);
          const totalPayableAmount =
            finalData.required_workers * finalData.payable_amount;

          if (totalPayableAmount > currentUser.coins ) {
            Swal.fire({
              title: "Error!",
              text: "Not available Coin.  Purchase Coin",
              icon: "error",
              confirmButtonText: "Cool",
            });
            navigate("/dashboard/purchaseCoin");
          } else {
            axiosSecure.post("/tasks", finalData).then((res) => {
              if (res.data.insertedId) {
                refetch()
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${finalData.task_title} has been posted`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                
              }
            });

          }
        }
      }
    }

    // Submit the task data to your backend here
  };

  return (
    <div className="flex justify-center items-center flex-col mt-10 w-full">
      <h2 className="text-center my-5 text-3xl">Add Task</h2>
      <div className="card bg-base-100 w-full max-w-4xl shrink-0 shadow-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body grid grid-cols-2 gap-4 w-full"
        >
          {/* Task Title */}
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Task Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter the task title"
              className="input input-bordered"
              {...register("task_title", {
                required: "Task title is required",
              })}
            />
            {errors.task_title && (
              <span className="text-red-500 text-sm">
                {errors.task_title.message}
              </span>
            )}
          </div>

          {/* Task Detail */}
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Task Detail</span>
            </label>
            <textarea
              placeholder="Enter the task details"
              className="textarea textarea-bordered"
              {...register("task_detail", {
                required: "Task detail is required",
              })}
            ></textarea>
            {errors.task_detail && (
              <span className="text-red-500 text-sm">
                {errors.task_detail.message}
              </span>
            )}
          </div>

          {/* Required Workers */}
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Required Workers</span>
            </label>
            <input
              type="number"
              placeholder="Number of workers needed"
              className="input input-bordered"
              {...register("required_workers", {
                required: "Number of workers is required",
                min: {
                    value: 1,
                    message: "Required workers amount must be at least 1",
                  },
              })}
            />
            {errors.required_workers && (
              <span className="text-red-500 text-sm">
                {errors.required_workers.message}
              </span>
            )}
          </div>

          {/* Payable Amount */}
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Payable Amount</span>
            </label>
            <input
              type="number"
              placeholder="Payment per worker"
              className="input input-bordered"
              {...register("payable_amount", {
                required: "Payable amount is required",
                min: {
                    value: 1,
                    message: "Payable amount must be at least 1",
                  },
              })}
            />
            {errors.payable_amount && (
              <span className="text-red-500 text-sm">
                {errors.payable_amount.message}
              </span>
            )}
          </div>

          {/* Completion Date */}
          <div className="form-control col-span-2  md:col-span-1">
            <label className="label">
              <span className="label-text">Completion Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              {...register("completion_date", {
                required: "Completion date is required",
              })}
            />
            {errors.completion_date && (
              <span className="text-red-500 text-sm">
                {errors.completion_date.message}
              </span>
            )}
          </div>

          {/* Submission Info */}
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Submission Info</span>
            </label>
            <textarea
              placeholder="What to submit (e.g., screenshot, proof)"
              className="textarea textarea-bordered"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
            ></textarea>
            {errors.submission_info && (
              <span className="text-red-500 text-sm">
                {errors.submission_info.message}
              </span>
            )}
          </div>

          {/* Task Image */}
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Task Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered"
              {...register("taskImage")}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control col-span-2 mt-6">
            <button className="btn btn-primary w-full">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
