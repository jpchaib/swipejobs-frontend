import { useState, useEffect, useContext } from "react";
import { MatchesContext } from "../matchesContext/MatchesContext";
import { UserContext } from "../userContext/UserContext.jsx";
import { sendAcceptJobRequest } from "../../services/sendAcceptJobRequest.js";
import { sendRejectJobRequest } from "../../services/sendRejectJobRequest.js";
import style from "./Card.module.scss";
import Shifts from "../shifts/Shifts.jsx";

const Card = ({ index }) => {
    const { user } = useContext(UserContext);
    const { matches, setMatches } = useContext(MatchesContext);
    const [message, setMessage] = useState("");
    const [rejected, setRejected] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        setMessage("");
        if (matches.length > 0) {
            setAccepted(matches[index].status === "accepted" ? true : false);
            setRejected(matches[index].status === "rejected" ? true : false);
        }
    }, [matches, index]);

    const acceptJob = async (jobId) => {
        try {
            const data = await sendAcceptJobRequest(user, jobId);

            if (data.success) {
                setMessage("Accepted!");
                const updatedMatches = [...matches];
                updatedMatches[index] = {
                    ...updatedMatches[index],
                    status: "accepted",
                };
                setMatches(updatedMatches);
                setAccepted(true);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleAcceptClick = () => {
        acceptJob(matches[index].jobId);
    };

    const rejectJob = async (jobId) => {
        try {
            console.log(matches);
            const data = await sendRejectJobRequest(user, jobId);

            if (data.success) {
                setMessage("Rejected");
                const updatedMatches = [...matches];
                updatedMatches[index] = {
                    ...updatedMatches[index],
                    status: "rejected",
                };
                setMatches(updatedMatches);
                setRejected(true);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleRejectClick = () => {
        rejectJob(matches[index].jobId);
    };

    return (
        <div className={style.Card}>
            <div className={style.Photo}>
                {matches[index] && (
                    <>
                        <img src={matches[index].jobTitle.imageUrl} alt="Job" />
                    </>
                )}
            </div>
            <div className={style.MainInfo}>
                {matches[index] && (
                    <>
                        <p className={style.JobName}>{matches[index].jobTitle.name}</p>
                        <p className={style.CompanyName}>{matches[index].company.name}</p>
                    </>
                )}
            </div>
            <div className={style.Figures}>
                {matches[index] && (
                    <>
                        <div className={style.Figure_Title}>
                            <p>Distance</p>
                            <p>Hourly Rate</p>
                        </div>
                        <div className={style.Figure_Value}>
                            <h3>{Math.floor(matches[index].milesToTravel * 10) / 10 + " miles"}</h3>
                            <h3>
                                <sup>$ </sup>
                                {Math.floor((matches[index].wagePerHourInCents / 100) * 100) / 100}
                            </h3>
                        </div>
                    </>
                )}
            </div>
            {matches[index] && <Shifts data={matches[index].shifts} />}
            <div className={style.Separator}></div>
            <div className={style.Container}>
                <div className={style.Icon_Container}>
                    <img src="../../assets/location.png" alt="Location icon" />
                </div>
                <div className={style.Location}>
                    <h3>Location</h3>
                    {matches[index] && (
                        <div className={style.Location_Lines}>
                            <p>{matches[index].company.address.formattedAddress}</p>
                            <sub>{Math.floor(matches[index].milesToTravel * 100) / 100 + " miles from your job search location"}</sub>
                        </div>
                    )}
                </div>
            </div>
            <div className={style.Separator}></div>
            <div className={style.Container}>
                <div className={style.Icon_Container}>
                    <img src="../../assets/requirements.png" alt="Calendar Icon" />
                </div>
                <div className={style.Requirements}>
                    <h3>Requirements</h3>
                    {(matches[index] && matches[index].requirements && (
                        <div className={style.Requirements_Lines}>
                            <p>{"- " + matches[index].requirements[0]}</p>
                            <p>{"- " + matches[index].requirements[1]}</p>
                        </div>
                    )) || (
                        <div className={style.Requirements_Lines}>
                            <p>None</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={style.Separator}></div>
            <div className={style.Container}>
                <div className={style.Icon_Container}>
                    <img src="../../assets/user.png" alt="Staff Icon" />
                </div>
                <div className={style.Report_To}>
                    <h3>Report To</h3>
                    {(matches[index] && matches[index].company.reportTo.name && matches[index].company.reportTo.phone && (
                        <div className={style.Report_To_Lines}>
                            <p>{matches[index].company.reportTo.name + " " + matches[index].company.reportTo.phone}</p>
                        </div>
                    )) ||
                        (matches[index] && matches[index].company.reportTo.name && (
                            <div className={style.Report_To_Lines}>
                                <p>{matches[index].company.reportTo.name}</p>
                            </div>
                        )) || (
                            <div className={style.Report_To_Lines}>
                                <p>Not Specified</p>
                            </div>
                        )}
                </div>
            </div>
            <div className={style.Message}>
                <p>{message}</p>
            </div>
            {matches[index] && (
                <div className={style.Container_Button}>
                    <div className={style.Container_Reject_Button}>
                        {!accepted && (
                            <button className={`${style.button} ${style.RejectButton}`} onClick={handleRejectClick} disabled={rejected}>
                                {rejected ? "Rejected" : "No Thanks"}
                            </button>
                        )}
                    </div>
                    <div className={style.Container_Accept_Button}>
                        {!rejected && (
                            <button className={`${style.button} ${style.AcceptButton}`} onClick={handleAcceptClick} disabled={accepted}>
                                {accepted ? "Accepted" : "I'll Take it"}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
