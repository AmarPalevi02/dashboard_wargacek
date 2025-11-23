import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/action";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router";
import Alert from "../ui/alert/Alert";
import { extractErrorMessage } from "../../utils/handleApiError";

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
    dinasName: string;
  };
};

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await postData<LoginResponse>("login/admin", data);

      const authPayload = {
        token: res.data.token,
        username: res.data.user.username,
        email: res.data.user.email,
        role: res.data.user.role,
        id: res.data.user.id,
        dinasName: res.data.user.dinasName,
      };

      console.log("Login successful, dispatching:", authPayload);

      dispatch(userLogin(authPayload));

      setAlert({
        variant: "success",
        title: "Login berhasil",
        message: `Selamat datang, ${res.data.user.username}!`,
      });

      // Redirect berdasarkan role
      setTimeout(() => {
        if (res.data.user.role === "ADMIN") {
          navigate("/admin");
        } else if (res.data.user.role === "DINAS") {
          navigate("/dinas");
        } 
      }, 1000);
    } catch (error: unknown) {
      const errorMessage = extractErrorMessage(error);
      setAlert({
        variant: "error",
        title: "Login gagal",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {alert && (
          <div className="mb-4">
            <Alert
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
            />
          </div>
        )}

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
