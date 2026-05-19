"use client";

import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import Lottie from "lottie-react";
import animationData from "../../assets/Login.json";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (data) alert("Login successful");
    if (error) alert(error.message);
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen flex py-36 items-center justify-center px-4 bg-linear-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl overflow-hidden">
        <div className=" lg:flex items-center justify-center bg-linear-to-br from-pink-50 via-indigo-50 to-white p-10">
          <div className="w-full">
            <Lottie animationData={animationData} loop={true} />
            <h2 className="text-center text-xl font-bold text-gray-800 mt-4">
              Welcome Back 🐾
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Login to continue your pet journey
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Login Account
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Please enter your details
            </p>
          </div>

          <Form className="space-y-5" onSubmit={handleRegister}>
            <TextField name="email" type="email">
              <Label>Email Address</Label>
              <Input
                name="email"
                placeholder="example@gmail.com"
                className="h-12 rounded-xl border border-gray-200 px-4 focus:ring-2 focus:ring-pink-300"
              />
              <FieldError className="text-red-500 text-sm mt-1" />
            </TextField>

            <TextField name="password">
              <Label>Password</Label>

              <div className="relative">
                <input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter password"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 pr-12 focus:ring-2 focus:ring-indigo-300 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </button>
              </div>

              <FieldError className="text-red-500 text-sm mt-1" />
            </TextField>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-linear-to-r from-pink-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              <FaSignInAlt />
              Login
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <Button
              onClick={handleGoogle}
              className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 text-gray-700 font-medium"
            >
              <FcGoogle size={22} />
              Continue with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-black font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
