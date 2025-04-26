import { useEffect, useState } from "react";
import DateObject from "react-date-object";

function DateLine({ width, startTime, endTime }) {

    const [displayMonths, setDisplayMonths] = useState(null);

    useEffect(() => {

        const startDate = new DateObject(startTime);
        const endDate = new DateObject(endTime);

        const months = [];

        let current = startDate;

        while (current <= endDate) {
            months.push(current.format('MMMM'));
            current = current.add(1, 'month');
        }
        
        if (months[months.length - 1] !== endDate.format('MMMM')) {
            months.push(endDate.format('MMMM'))
        }
        
        setDisplayMonths(months);

    }, [startTime, endTime])



    return (
        <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', justifyContent: 'space-around' }}>
            {displayMonths && displayMonths.map((date, index) => (
                <span key={index} style={{ margin: '8px' }}>{date}</span>
            ))}
        </div>
    );
}

export default DateLine;
