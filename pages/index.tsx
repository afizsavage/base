import React from 'react';
import {dynamicComponent} from "@monime-lab/uix-csplit";
import {composeGetServerSideProps, dispatchServerSessionEnhancer} from "@monime-lab/frontend-core";
import {dispatchMuiThemeEnhancer} from "@monime-lab/frontend-core/material";

export const getServerSideProps = composeGetServerSideProps(
    dispatchServerSessionEnhancer,
    dispatchMuiThemeEnhancer,
    () => {
        return async ({req}) => {
            return {props: {location: req.url}}
        };
    }
);

const Bootstrapper = dynamicComponent(() => import('boot'))

export default function IndexPage() {
    return (
        <>
            <Bootstrapper/>
        </>
    );
}