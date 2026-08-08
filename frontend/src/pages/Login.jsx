import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5E7D8] px-5 py-8 flex items-center justify-center">

      <div className="w-full max-w-md rounded-[32px] border border-[#C65D2E]/10 bg-[#FFF9F1] p-10 shadow-[0_20px_60px_rgba(51,37,31,0.08)]">

        {/* BRAND */}

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C65D2E]">
          ASHTRAY
        </p>

        {/* TITLE */}

        <h1 className="mt-5 text-5xl font-black tracking-tight text-[#33251F]">
          Welcome Back
        </h1>

        <p className="mt-5 text-lg leading-8 text-[#7A685D]">
          Continue your journey toward healthier habits,
          one step at a time.
        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

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
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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

          {/* SIGN IN */}

          <button
            type="submit"
            className="
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
            "
          >
            Sign In
          </button>

        </form>

        {/* FOOTER */}

        <div className="mt-9 border-t border-[#C65D2E]/10 pt-6">

          <p className="text-center text-[#7A685D]">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-bold text-[#C65D2E] hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}