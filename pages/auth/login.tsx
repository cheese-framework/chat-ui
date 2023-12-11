import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn, showErrorMessage } from "@/utils";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/config";
import LoadingDots from "@/components/Loader";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`/api/login`, { email, password });
      router.push("/");
      setLoading(false);
    } catch (err) {
      showErrorMessage(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Chrono</title>
      </Head>
      <div className="login-container">
        <form id="login-form" onSubmit={login} autoComplete="off">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loading && <LoadingDots />}
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <p>
          Need an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;

export async function getServerSideProps({ req }) {
  const userData = isLoggedIn(req);
  if (!userData) {
    return {
      props: {
        userData,
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
