import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useNavParams } from "../../hooks/useNavParams";

export default function Layout({ children }: PropsWithChildren<any>) {
    const router = useRouter()
    const exempt_routes = ["/"] //routes that have their own custom layout and navbar import

    const {navRef, navHeight} = useNavParams()

    return exempt_routes.includes(router.asPath) ? children : (
        <div className="relative w-screen min-h-screen"
        style={{
            display:"grid",
            gridTemplateRows:`${navHeight}px auto`
        }}>
            <div className="absolute top-0 left-0 w-screen h-screen bg-landing z-[-1] pointer-events-none"/>
            <Navbar navRef={navRef}/>
            <div className="flex h-full">
                {children}
            </div>
        </div>
    );
}