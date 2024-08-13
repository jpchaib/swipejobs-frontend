import { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext/UserContext.jsx";
import { MatchesContext } from "../matchesContext/MatchesContext";
import style from "./Carousel.module.scss";
import Card from "../card/Card.jsx";

const Carousel = () => {
    const { user } = useContext(UserContext);
    const { matches } = useContext(MatchesContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {}, [user]);

    const moveLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const moveRight = () => {
        if (currentIndex < matches.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className={style.Carousel}>
            <div className={style.LeftArrowContainer} onClick={moveLeft}>
                {currentIndex !== 0 && (
                    <>
                        <img src="../../assets/leftarrow.png" alt="Left" />
                    </>
                )}
            </div>
            <div className={style.Card}>
                <Card index={currentIndex} />
            </div>
            <div className={style.RightArrowContainer} onClick={moveRight}>
                {currentIndex < matches.length - 1 && (
                    <>
                        <img src="../../assets/rightarrow.png" alt="Right" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Carousel;
