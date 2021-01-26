import React from "react";
import {Backdrop, CircularProgress} from "@material-ui/core";

const Loader = () => {

    return (
        <Backdrop open>
            <CircularProgress/>
        </Backdrop>
    )
}

export default Loader;