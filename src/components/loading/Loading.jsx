import React from "react";
import style from "./Loading.module.scss";

const Loading = () => {
    return (
        <div className={style.Loading_container}>
            <div className={style.Spinner}></div>
            <div className={style.Loading_text}>Loading...</div>
        </div>
    );
};

export default Loading;
