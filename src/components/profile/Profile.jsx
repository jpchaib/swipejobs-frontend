import React from "react";
import { useState, useEffect, useContext } from "react";
import { getProfile } from "../../services/profile.js";
import { getMatches } from "../../services/matches.js";
import style from "./Profile.module.scss";
import { UserContext } from "../userContext/UserContext.jsx";
import { MatchesContext } from "../matchesContext/MatchesContext";
import Carousel from "../carousel/Carousel.jsx";
import RenderError from "../renderError/RenderError.jsx";
import Loading from "../loading/Loading.jsx";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const { matches, setMatches } = useContext(MatchesContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getProfile(user);
                setProfile(data);
                setError(null);
            } catch (error) {
                setProfile(null);
                setError("Failed to fetch profile: " + error.message);
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

        const fetchMatches = async () => {
            try {
                setLoading(true);
                const data = await getMatches(user);
                const updatedMatches = data.map((match) => ({
                    ...match,
                    status: "pending",
                }));
                setMatches(updatedMatches);
                setError(null);
            } catch (error) {
                setMatches(null);
                setError("Failed to fetch maches: " + error.message);
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [user]);

    return (
        <div>
            <div>
                {profile && (
                    <div className={style.Profile}>
                        <div className={style.Topbar}>
                            <div className={style.Logo}>
                                <img src="../../assets/swipejobslogo2.png" alt="swipejobs logo" />
                            </div>
                            <div className={style.Name}>
                                <p>{profile.firstName}</p>
                                <p>{profile.lastName}</p>
                            </div>
                        </div>
                        <div className={style.Carousel}>
                            <Carousel />
                        </div>
                    </div>
                )}
            </div>
            <div>
                {error && (
                    <>
                        <div className={style.Topbar}>
                            <div className={style.Logo}>
                                <img src="../../assets/swipejobslogo2.png" alt="swipejobs logo" />
                            </div>
                            <div className={style.Name}>
                                <p>Log in</p>
                            </div>
                        </div>
                        <div>
                            <RenderError data={error} />
                        </div>
                    </>
                )}
            </div>
            <div>
                {loading && (
                    <div>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
