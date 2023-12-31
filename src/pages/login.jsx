import LayoutAuth from "@/components/layout/layout_auth";
import Link from "next/link";
import { PiLockKey } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/router";
import InputComp from "@/components/elements/input/input";
import InputPassComp from "@/components/elements/input/inputPass";
import MetaHead from "@/components/MetaHead/metahead";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function SignIn() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // const apiUrl = ;
  function handleChange(e) {
    const copy = { ...state };
    copy[e.target.name] = e.target.value;
    setState(copy);
  }
  async function handleSubmit() {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login
    `,
      {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("token", json.token);

      MySwal.fire("Login berhasil!", "Klik tombol!", "success").then(() => {
        router.push("/dashboard");
      });
    } else {
      MySwal.fire("Login gagal!", "Email or Password incorrect!", "error").then(
        () => {}
      );
    }
  }

  return (
    <>
      <MetaHead title="Login" description="Login to your account" />
      <LayoutAuth>
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h1 className="text-2xl font-semibold mb-8 text-black">
            Sign to your account
          </h1>
          <div>
            <div className="mb-4 relative">
              <label htmlFor="email" className="text-gray-600 mb-1 block">
                Email
              </label>
              <InputComp
                icon={<HiOutlineMail />}
                placeholder="enter your email"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="text-gray-600 mb-1 block">
                Password
              </label>
              <InputPassComp
                icon={<PiLockKey />}
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="enter your password"
              />
            </div>

            <div>
              {!loading ? (
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              ) : (
                <div className="w-full bg-blue-500  p-2 rounded-md flex justify-center">
                  <span className="loading loading-spinner text-neutral"></span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center mt-6">
              <p className="text-gray-500">Trouble Logging?</p>
              <Link href="/auth/verify" className="text-blue-500 mt-3">
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </LayoutAuth>
    </>
  );
}
