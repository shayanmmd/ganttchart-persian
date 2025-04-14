
import { Col, Row } from "react-bootstrap";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
function DateLine({ width, startTime, endTime }) {

    const startDate = new DateObject(startTime)
    const endDate = new DateObject(endTime)

    const estimatedMonthWidth = 80;

    const monthsPerRow = Math.floor(width / estimatedMonthWidth);

    const months = [];
    let current = startDate;

    // months.push(startDate.format('MMMM'));


    let step = 1;

    let msDay = 24 * 60 * 60 * 1000;

    const allmonths = Math.floor(((endDate - startDate) / msDay) / 30);


    if (width <= 320) {
        step = 10
    } else if (width <= 768) {
        step = 3
    }
    else {
        step = 1
    }

    months.push(startDate.format('MMMM'));

    current.add(step, "month");


    while (current < endDate) {
        months.push(current.format('MMMM'));
        current = current.add(step, 'month');
    }

    if (months[months.length - 1] !== endDate.format('MMMM')) {
        months.push(endDate.format('MMMM'));
    }


    return (
        <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', justifyContent: 'space-around' }}>
            {months.map((date, index) => (
                <span key={index} style={{ margin: '8px' }}>{date}</span>
            ))}
        </div>
    );



}

export default DateLine;
