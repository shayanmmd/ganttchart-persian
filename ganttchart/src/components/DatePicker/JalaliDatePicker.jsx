import { DatePicker } from "zaman";
import './JalaliDatePicker.scss'

function JalaliDatePicker({ date = new Date(), title, onChangeFunction }) {

    return (
        <>
            <span>{title}</span>
            <DatePicker inputClass="m-2" defaultValue={date} onChange={(e) => onChangeFunction(e)} />
        </>
    )
}

export default JalaliDatePicker;