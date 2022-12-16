import { useEffect } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "lists",
    defaultValue: queryResult?.data?.data.clint_type,
  });

  // useEffect(() => {
  //   resetField("category.id");
  // }, [options]);

  return (
    <div className="container mx-auto">
      <br />
      <form onSubmit={handleSubmit(onFinish)}>
        <input {...register("id")} type="hidden" />
        <div className="mb-6">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>
          <select
            {...register("status")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Type
          </label>
          <select
            {...register("clint_type", { required: true })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
          >
            <option value="International">International</option>
            <option value="Local">Local</option>
            {/* {options?.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))} */}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span> This field is required
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Client Name
          </label>
          <input
            {...register("clint_name", { required: true })}
            id="content"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
            placeholder="Content"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              <span className="font-medium">Oops!</span> This field is required
            </p>
          )}
        </div>
        <button
          type="submit"
          className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
        >
          {formLoading && "Edit"}
          <span>Save</span>
        </button>
      </form>
    </div>
  );
};
