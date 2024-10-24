import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useNavParams } from "../../hooks/useNavParams";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren<any>) {
  const router = useRouter();
  //   const exemptRoutes = ["/"]; //routes that have their own custom layout and navbar import
  //   const blankRoutes = ["/register", "/login", "/forgot", "/verify"];
  //   const blank = blankRoutes.includes(router.asPath);

  const { navRef, navHeight } = useNavParams();

  //   const isBlankRoute = (path: string) => {
  //     return blankRoutes.some((route) => path.startsWith(route));
  //   };

  return (
    <div
      className="relative w-full min-h-[calc(100vh_+_64px)]"
      style={{
        display: "grid",
        gridTemplateRows: `${navHeight}px auto 100px`,
      }}
    >
      {/* <div className="absolute top-0 left-0 w-full h-screen bg-landing z-[-1] pointer-events-none"/> */}
      <Navbar navRef={navRef} router={router} />
      <div className="flex h-full">{children}</div>
      <Footer />
    </div>
  );
}
