import { FormEvent, useState } from "react";
import { isLoggedIn, showErrorMessage } from "@/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/config";
import LoadingDots from "@/components/Loader";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && username.trim() && password.trim()) {
      try {
        setLoading(true);
        await axios.post(`${API_URL}/users`, {
          username,
          email,
          password,
        });
        await axios.post("/api/login", { email, password });
        router.push("/");
        setLoading(false);
      } catch (err) {
        showErrorMessage(err);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create account | Chrono</title>
      </Head>
      <div className="login-container">
        <form onSubmit={createAccount} autoComplete="off">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Register
          </button>
        </form>
        <p>
          Have an account? <Link href="/auth/login">Login</Link>
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
