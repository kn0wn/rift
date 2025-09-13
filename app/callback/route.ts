import { handleAuth } from "@workos-inc/authkit-nextjs";
import { cookies } from "next/headers";

export const GET = handleAuth({
  returnPathname: "/router",
  onSuccess: async ({ refreshToken }) => {
    if (refreshToken) {
      const cookieStore = await cookies();
      cookieStore.set("wos_rt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    }
  },
});
