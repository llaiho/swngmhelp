import React from "react";
import "./App.css";

import RootView from "./views/RootView";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { stateLogic } from "./logic/stateLogic";

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

stateLogic();

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Recoil.RecoilRoot>
                    <RootView />
                </Recoil.RecoilRoot>
            </ThemeProvider>
        </div>
    );
}

export default App;
