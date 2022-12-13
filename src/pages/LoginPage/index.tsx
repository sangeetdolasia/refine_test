import React from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { HttpError, useLogin } from "@pankod/refine-core";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any, HttpError, any>();

  const { mutate: login, isLoading } = useLogin();
  return (
    <div className="auth-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <form
              onSubmit={handleSubmit((values) => {
                login(values);
              })}
            >
              <fieldset disabled={isLoading}>
                <fieldset className="form-group">
                  <input
                    {...register("user.email", {
                      required: true,
                    })}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    {...register("user.password", {
                      required: true,
                    })}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    autoComplete=""
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
