import DatePicker, { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_en from "react-date-object/locales/persian_en";
import "react-multi-date-picker/styles/colors/purple.css"
type EndOffType = {
    setDate: (value: any) => void, date: Date | undefined
}
export default function Calendar({ setDate, date }: EndOffType) {
    const changeHandler = (value: any) => {
        const date = new DateObject({
            date: value,
            format: "YYYY/MM/DD HH:mm:ss",
            calendar: persian,
            locale: persian_fa,
        });
        date.convert(gregorian, persian_en);
        const time = new Date(date.format())
        setDate(time)
    }
    return (
        <DatePicker
            multiple={false}
            value={date}
            format="YYYY/MM/DD"
            onChange={changeHandler}
            calendar={persian}
            className="teal"
            locale={persian_fa}
            calendarPosition="bottom-right"
        />
    )
}
