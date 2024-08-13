import style from "./Shifts.module.scss";

const Shifts = ({ data }) => {
    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Options for the start date formatting
        const optionsStart = {
            month: "short", // "Apr"
            day: "numeric", // "7"
            weekday: "short", // "Wed"
            hour: "numeric", // "8 AM"
            minute: "2-digit", // "00"
            hour12: true, // 12-hour clock
        };

        // Options for the end time formatting
        const optionsEnd = {
            hour: "numeric", // "10 PM"
            minute: "2-digit", // "00"
            hour12: true, // 12-hour clock
        };

        const startFormatted = start.toLocaleDateString("en-US", optionsStart);
        const endFormatted = end.toLocaleTimeString("en-US", optionsEnd);

        // Extract and format the output
        // MON MONTH DAY, WEEKDAY STARTTIME - ENDTIME TIMEZONE
        const [weekday, monthDay, timeStart, timeZone] = startFormatted.split(", ");
        const formattedDateRange = `${monthDay.toUpperCase()}, ${weekday.toUpperCase()} ${timeStart} - ${endFormatted} PDT`;

        return formattedDateRange;
    };

    return (
        <div className={style.Shifts_Container}>
            <div className={style.Image_Container}>
                <img src="../../assets/calendar.png" alt="Calendar Icon" />
            </div>
            <div className={style.Shifts}>
                <h3>Shift Dates</h3>
                <div className={style.Shift_Lines}>
                    {data.slice(0, 2).map((shift, shiftIndex) => {
                        return (
                            <p className={style.Date} key={shiftIndex}>
                                {formatDateRange(shift.startDate, shift.endDate)}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Shifts;
