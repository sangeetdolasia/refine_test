import React, { useEffect } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { HttpError, useLogin } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any, HttpError, any>();
  const navigate = useNavigate();

  const { mutate: login } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/lists");
    }
  }, []);
  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form
                onSubmit={handleSubmit((values) => {
                  console.log(values, "values");
                  login(values);
                })}
              >
                <fieldset className="form-group">
                  <div className="mb-6">
                    <input
                      {...register("email", {
                        required: true,
                      })}
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        <span className="font-medium">
                          This field is required
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <input
                      {...register("password", {
                        required: true,
                      })}
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        <span className="font-medium">
                          This field is required
                        </span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
