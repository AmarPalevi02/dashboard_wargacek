import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { config } from "../../configs/configs";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/action";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

type Inputs = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    username: string;
    email: string;
    role: string;
    id: string;
  };
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(config.base_url);
  console.log(config.version);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await postData<LoginResponse>("login/admin", data);

      const authPayload = {
        token: res.data.token,
        username: res.data.user.username,
        email: res.data.user.email,
        role: res.data.user.role,
        id: res.data.user.id,
      };

      Cookies.set("auth", JSON.stringify(authPayload));

      dispatch(userLogin(authPayload));

      navigate("/home");

      console.log("Login sukses:", res.data);
    } catch (err: any) {
      // setErrorMsg(err.message || "Login gagal");z
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-error-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-error-500">
                        {errors.password.message}
                      </p>
                    )}
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Button className="w-full" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
