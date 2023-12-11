import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader("Set-Cookie", [
      cookie.serialize("chat_user", JSON.stringify({}), {
        httpOnly: false,
        secure: true,
        maxAge: 0, // 7 DAYS
        path: "/",
      }),
    ]);

    res.redirect("/");
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
}
