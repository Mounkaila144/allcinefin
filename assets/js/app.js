import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import RouteApp from "./routes";
import {CartProvider} from "react-use-cart";
import {AuthProvider} from "react-auth-kit";

const rootElement = document.getElementById("root");

render(
    <AuthProvider authType={'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
        <CartProvider>
            <RouteApp/>
        </CartProvider>
    </AuthProvider>,
    rootElement
);
