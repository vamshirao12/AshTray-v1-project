import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/signup", form);

      alert("Account created successfully! Please log in.");

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);

      alert(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5E7D8] px-5 py-8 flex items-center justify-center">

      <div className="w-full max-w-md">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C65D2E]">
            ASHTRAY
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight text-[#33251F]">
            Create Account
          </h1>

          <p className="mt-4 text-lg leading-8 text-[#7A685D]">
            Start building healthier habits, one choice at a time.
          </p>

        </div>

        {/* FORM CARD */}

        <form
          onSubmit={submit}
          className="
            w-full
            rounded-[32px]
            border
            border-[#C65D2E]/10
            bg-[#FFF9F1]
            p-10
            shadow-[0_20px_60px_rgba(51,37,31,0.08)]
          "
        >

          <div className="space-y-5">

            {/* NAME */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#6F5C50]"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={change}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#C65D2E]/15
                  bg-[#F8F0E8]
                  px-5
                  py-4
                  text-base
                  text-[#33251F]
                  outline-none
                  placeholder:text-[#9A887A]
                  transition
                  focus:border-[#C65D2E]
                  focus:bg-[#FFF9F1]
                  focus:ring-2
                  focus:ring-[#C65D2E]/10
                "
              />

            </div>

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#6F5C50]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={change}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#C65D2E]/15
                  bg-[#F8F0E8]
                  px-5
                  py-4
                  text-base
                  text-[#33251F]
                  outline-none
                  placeholder:text-[#9A887A]
                  transition
                  focus:border-[#C65D2E]
                  focus:bg-[#FFF9F1]
                  focus:ring-2
                  focus:ring-[#C65D2E]/10
                "
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#6F5C50]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={change}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#C65D2E]/15
                  bg-[#F8F0E8]
                  px-5
                  py-4
                  text-base
                  text-[#33251F]
                  outline-none
                  placeholder:text-[#9A887A]
                  transition
                  focus:border-[#C65D2E]
                  focus:bg-[#FFF9F1]
                  focus:ring-2
                  focus:ring-[#C65D2E]/10
                "
              />

            </div>

          </div>

          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-7
              w-full
              rounded-2xl
              bg-[#C65D2E]
              py-4
              font-bold
              text-white
              shadow-[0_10px_25px_rgba(198,93,46,0.18)]
              transition
              hover:bg-[#B95025]
              hover:shadow-[0_12px_30px_rgba(198,93,46,0.22)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* LOGIN */}

          <p className="mt-7 text-center text-[#7A685D]">

            Already have an account?{" "}

            <Link
              to="/"
              className="font-bold text-[#C65D2E] hover:underline"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}