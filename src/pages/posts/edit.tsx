import { useEffect } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { useNavigation, useSelect } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { push } = useNavigation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container mx-auto">
      <br />
      <form onSubmit={handleSubmit(onFinish)}>
        <input {...register("id")} type="hidden" />
        <div className="flex mb-10 mt-10">
          <div className="mb-6 flex-1 w-48">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            <select
              {...register("status")}
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
            >
              <option value="true">Active</option>
              <option value="false">In-Active</option>
            </select>
          </div>
          <div className="mb-6 flex-1 w-48">
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Type
            </label>
            <select
              {...register("client_type", { required: true })}
              className="block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
            >
              <option value="International">International</option>
              <option value="Local">Local</option>
            </select>
            {errors.client_type && (
              <p className="mt-1 text-sm text-red-600">
                <span className="font-medium">This field is required</span>
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Client Name
          </label>
          <input
            {...register("client_name", {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
            id="client_name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
            placeholder="Client Name"
          />
          {errors.client_name?.type === "required" && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">This field is required</span>
            </p>
          )}
          {(errors.client_name?.type === "minLength" ||
            errors.client_name?.type === "maxLength") && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">
                Insert minimum 3 and maximum 50 char
              </span>
            </p>
          )}
        </div>
        <div className="flex flex-row-reverse space-x-4 space-x-reverse">
          <button
            type="submit"
            className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
          >
            {formLoading && "Edit"}
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 sm:w-auto"
            onClick={() => push("/lists" || "")}
          >
            <span>Back</span>
          </button>
        </div>
      </form>
    </div>
  );
};
