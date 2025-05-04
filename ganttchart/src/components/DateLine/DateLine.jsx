import { useEffect, useState } from "react";
import './dateline.scss';

function DateLine({ width, startDate, endDate }) {

    const [displayMonths, setDisplayMonths] = useState(null);

    useEffect(() => {

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

    }, [startDate, endDate, width]);

    return (
        <div className="container-dateline" >
            {
                displayMonths?.map((date, index) =>
                    <span className="month" key={index}>{date}</span>
                )
            }
        </div>
    );
}

export default DateLine;
