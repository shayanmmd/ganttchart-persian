import { useEffect, useState } from "react";
import DateObject from "react-date-object";

function DateLine({ width, startTime, endTime }) {

    const [displayMonths, setDisplayMonths] = useState(null);

    useEffect(() => {

        const startDate = new DateObject(startTime);
        const endDate = new DateObject(endTime);

        const months = [];

        let current = startDate;

        let step = 1;

        if (width >= 1024) {
            step = 1;
        }
        else if (width >= 425) {
            step = 3;
        }
        else {
            step = 11;
        }

        while (current <= endDate) {
            months.push(current.format('MMMM'));
            current = current.add(step, 'month');
        }

        if (months[months.length - 1] !== endDate.format('MMMM')) {
            months.push(endDate.format('MMMM'))
        }

        setDisplayMonths(months);

    }, [startTime, endTime, width]);

    return (
        <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', justifyContent: 'space-around' }}>
            {displayMonths && displayMonths.map((date, index) => (
                <span key={index} style={{ margin: '8px' }}>{date}</span>
            ))}
        </div>
    );
}

export default DateLine;
