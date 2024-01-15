import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useNavParams } from "../../hooks/useNavParams";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren<any>) {
    const router = useRouter()
    const exempt_routes = ["/"] //routes that have their own custom layout and navbar import
    const blank_routes = ["/register", "/login", "/forgot", "/verify"]
    const blank = blank_routes.includes(router.asPath)

    const { navRef, navHeight } = useNavParams()

    return exempt_routes.includes(router.asPath) ? children :
        <div className="relative w-full min-h-[calc(100vh_+_64px)]"
            style={!blank ? {
                display: "grid", gridTemplateRows: `${navHeight}px auto 100px`
            } : { display: "grid", gridTemplateRows: `0 100vh 100px` }}>
            {/* <div className="absolute top-0 left-0 w-full h-screen bg-landing z-[-1] pointer-events-none"/> */}
            <Navbar navRef={navRef} blank={blank ? navHeight : 0} router={router} />
            <div className="flex h-full">
                {children}
            </div>
            <Footer />
        </div>
}