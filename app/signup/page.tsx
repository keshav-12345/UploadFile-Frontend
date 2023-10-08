"use client";
import { FormEvent, useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";
import "./Signup.css";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const { signup, isLoading, error, setError } = useSignup();
  const router = useRouter();

  let user: User;
  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("user")) {
          router.push("/");
        }
      }
    };
    check();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatch(false);
    } else {
      setMatch(true);
      await signup(email, password);
      let user = localStorage.getItem("user");
      if (user) { 
        router.push("/");
      }
    }
  };

  const closeError1 = () => {
    setMatch(true);
  };
  const closeError2 = () => {
    setError(null);
  };

  return (
    <div className="signupPage">
      <div className="signupLogo">
      </div>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h1>
        <span>Sign Up Page</span>{" "}
        </h1>
        <div className="signupBody">
          <label htmlFor="">Email address </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required={true}
          />
          <button className="signupBtn" disabled={isLoading}>
            SignUp
          </button>
        </div>
        {!match && (
          <div className="signupError">
            <p>Password != Confirm Password</p>
          </div>
        )}
        {error && (
          <div className="signupError">
            {error}
          </div>
        )}

        <div className="signuptoLogin">
          <p>
            Already Registered?{" "}
            <Link href="/login" className="hover:text-blue-500">
              Login
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

// closedoutlined is from ant design
