import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import Axios from "axios";
import { API_URL } from "@/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const { data } = await Axios.post(`${API_URL}/users/authenticate`, {
        email,
        password,
      });

      res.setHeader("Set-Cookie", [
        cookie.serialize("chat_user", JSON.stringify({ ...data }), {
          httpOnly: false,
          secure: true,
          maxAge: 86400 * 7, // 7 DAYS
          path: "/",
        }),
      ]);

      res.json(data);
    } catch (err: any) {
      let message = "";
      const { response } = err;
      if (response) {
        const { data } = response;
        if (data) {
          message = data.message || "An error occurred.";
        } else {
          message = "Authentication failed. Please check your credentials.";
        }
      } else {
        message = "Authentication failed. Please check your credentials.";
      }
      res.status(500).json({
        message,
      });
    }
  } else {
    res.status(400).send("Method not allowed");
  }
}
