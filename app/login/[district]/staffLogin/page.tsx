"use client";
import * as React from "react";
import {
  TextField,
  Backdrop,
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EmailOutlined, Key } from "@mui/icons-material";

export default function StaffLogin() {
  const [theEmail, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [passwordInput, setPasswordInput]: any = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (
      email.includes("@") &&
      email.split("@")[0] != undefined &&
      email.split("@")[0] != null &&
      email.split("@")[1] != undefined &&
      email.split("@")[1] != null &&
      email.split("@")[1].includes(".") &&
      email.split("@")[1].split(".")[0] != undefined &&
      email.split("@")[1].split(".")[0] != null &&
      email.split("@")[1].split(".")[1] != undefined &&
      email.split("@")[1].split(".")[1] != null
    ) {
      return true;
    } else {
      return false;
    }
  };

  const login = async () => {
    setLoading(true);
    if (validateEmail(theEmail)) {
      try {
        await signInWithEmailAndPassword(auth, theEmail, password);
        setLoading(false);
        router.push("/login/staff/upcomingSessions");
      } catch (e: any) {
        alert("Login error: " + e.message);
        setError(true);
        setLoading(false);
      }
    } else {
      setError(true);
      setLoading(false);
      alert("Invalid Email");
    }
    setLoading(false);
  };

  const Backup = () => {
    return (
      <>
        <div className="flex w-full flex-col h-screen justify-center items-center">
          <div className="flex flex-col bg-[#1e1e1e] w-96 h-fit md:w-1/2 xl:w-1/3 mt-4 mb-4 py-16 justify-center items-center focus:shadow-md focus:shadow-slate-600 rounded-3xl">
            <text className="text-6xl">Staff Login</text>
            <div className="w-fit h-fit flex flex-col space-y-3 mt-14">
              <text className="text-3xl">Email:</text>
              <TextField
                onKeyDown={(key) => {
                  if (key.code === "Enter" && passwordInput != null) {
                    passwordInput.focus();
                  }
                }}
                onChange={(event) => setEmail(event.target.value)}
                error={error}
                id="email-input"
                label="Your Email"
                sx={{ width: 300 }}
              />
            </div>
            <div className="w-fit h-fit flex flex-col space-y-3 mt-7">
              <text className="text-3xl">Password:</text>
              <TextField
                onKeyDown={(key) => {
                  if (key.code === "Enter") {
                    login();
                  }
                }}
                inputRef={(input) => {
                  setPasswordInput(input);
                }}
                onChange={(event) => setPassword(event.target.value)}
                error={error}
                id="password-input"
                type="password"
                label="Password"
                sx={{ width: 300 }}
              />
            </div>
            <button
              onClick={login}
              className="bg-gradient-to-br from-green-400 to-emerald-700 w-fit mt-9 h-fit px-5 py-3 text-5xl rounded-xl transition-all duration-200 hover:scale-110 hover:-translate-y-2 hover:opacity-80"
            >
              Login
            </button>
          </div>
        </div>
        <Backdrop open={loading}>
          <div className="flex flex-col w-screen h-screen justify-center items-center">
            <CircularProgress size={100} thickness={1.5} />
          </div>
        </Backdrop>
      </>
    );
  };

  return (
    <div className="flex flex-col h-screen pt-10 justify-center items-center">
      <Image
        alt="Scholarly_Icon"
        src={"/images/sizedCircularScholarlyIcon.png"}
        width={70}
        height={70}
      />
      <h3 className="text-center text-4xl sm:text-5xl px-5 text-zinc-200 mt-7 font-light">
        Sign in to your account
      </h3>
      <div className="flex flex-col w-screen px-9 max-w-xl mt-14">
        <h5 className="text-2xl opacity-90 mb-3 font-thin">Email</h5>
        <FormControl
          fullWidth
          size="medium"
          variant="outlined"
          id="email-input"
          error={error}
        >
          <OutlinedInput
            type="email"
            id="email-input"
            onKeyDown={(input) => {
              if (input.code === "Enter") {
                passwordInput.focus();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <EmailOutlined fontSize="medium" />
              </InputAdornment>
            }
            value={theEmail}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormControl>
      </div>

      <div className="flex flex-col w-screen px-9 max-w-xl mt-7">
        <h5 className="text-2xl opacity-90 mb-3 font-thin">Password</h5>
        <FormControl
          fullWidth
          size="medium"
          variant="outlined"
          id="email-input"
          error={error}
        >
          <OutlinedInput
            type="password"
            id="password-input"
            onKeyDown={(input) => {
              if (input.code === "Enter") {
                login();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Key fontSize="medium" />
              </InputAdornment>
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            inputRef={(input) => {
              setPasswordInput(input);
            }}
          />
        </FormControl>
      </div>
      <button
        onClick={login}
        className="text-2xl mt-9 w-40 rounded-md py-4 bg-gradient-to-tr from-violet-400 via-sky-400 to-emerald-400 transition hover:scale-105"
      >
        Sign In
      </button>
      <Backdrop open={loading}>
        <div className="flex flex-col w-screen h-screen justify-center items-center">
          <CircularProgress size={100} thickness={1.5} />
        </div>
      </Backdrop>
    </div>
  );
}
