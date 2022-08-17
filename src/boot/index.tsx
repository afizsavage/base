import {BrowserRouter} from "react-router-dom";
import BrowserGuard from "@monime-lab/uix-core/base/BrowserGuard";
import SignUpInfoProvider from "../common/components/SignUpInfoProvider";
import AppRoutes from "../scenes/routes";

export default function Bootstrapper() {
    return (
        <BrowserGuard>
            <BrowserRouter>
                <SignUpInfoProvider>
                    <AppRoutes/>
                </SignUpInfoProvider>
            </BrowserRouter>
        </BrowserGuard>
    );
}