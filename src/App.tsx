import React from "react";
import "./App.css";

import RootView from "./views/RootView";

import Header from "./views/Header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const Recoil = require("recoil");

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: "#DAF",
            main: "#A8F",
            dark: "#428",
        },
    },
    typography: {
        fontFamily: "Teko, Arial",
        fontSize: 16,
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Recoil.RecoilRoot>
                    <Header></Header>
                    <RootView />
                </Recoil.RecoilRoot>
            </ThemeProvider>
        </div>
    );
}

export default App;
