import * as React from 'react';
import HeaderPhone from "../components/header/App";
import Home from "../components/Home";

export default function Template({content}) {

    return (
        <Home
            top={<HeaderPhone/>}
            left={
                content
            }
        />
    );
}
