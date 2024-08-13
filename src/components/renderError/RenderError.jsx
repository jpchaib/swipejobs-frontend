import React from "react";
import style from "./RenderError.module.scss";

const RenderError = ({ data }) => {
    return (
        <div>
            <h1 className={style.Message}>{data}</h1>
        </div>
    );
};

export default RenderError;
