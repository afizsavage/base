import React from "react";
import MainLayout from "./MainLayout";
import NoAuthGuard from "@monime-lab/frontend-extra/base/NoAuthGuard";

export default function NoAuthLayout() {
    return (
        <NoAuthGuard>
            <MainLayout/>
        </NoAuthGuard>
    );
}