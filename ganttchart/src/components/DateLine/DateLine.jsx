// import React, { useEffect, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import DateObject from "react-date-object";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// function DateLine() {
//     const startDate = new DateObject({ year: 1404, month: 1, day: 1, calendar: persian, locale: persian_fa });
//     const endDate = new DateObject({ year: 1404, month: 2, day: 25, calendar: persian, locale: persian_fa });

//     const generateDates = (step) => {
//         let dates = [];
//         dates.push(startDate.format("YYYY/MM/DD"));
//         let currentDate = startDate.add(1, "days");

//         while (currentDate < endDate) {
//             dates.push(currentDate.format("YYYY/MM/DD"));
//             currentDate = currentDate.add(step, "days"); // قدم های یک ماهه
//         }
//         dates.push(endDate.format("YYYY/MM/DD"));

//         return dates;
//     };



//     let msDay = 24 * 60 * 60 * 1000; // milliseconds per day
//     let days = Math.floor((endDate - startDate) / msDay);
//     const countInRow = Math.floor(window.innerWidth / 90);   
//     const steps = Math.floor(countInRow / days)
//     const dates = generateDates(3);



//     return (
//         <>
//             <Row className=" w-100">
//                 <Col md="auto">
//                     <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'wrap', overflowX: 'auto', whiteSpace: 'nowrap' }}>
//                         {/* <span style={{ margin: '8px' }}>{dates[0]}</span> */}
//                         {dates.map((date) => (
//                             <span key={date} style={{ margin: '8px' }}>{date}</span>
//                         ))}
//                     </div>
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default DateLine;


import React, { useEffect, useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function DateLine() {

    const startDate = new DateObject({ year: 1404, month: 1, day: 1, calendar: persian, locale: persian_fa });
    const endDate = new DateObject({ year: 1404, month: 3, day: 25, calendar: persian, locale: persian_fa });

    const [dates, setDates] = useState([]);
    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        setWindowWidth(window.innerWidth);

        const generateDates = () => {
            let msDay = 24 * 60 * 60 * 1000;
            let days = Math.floor((endDate.toDate() - startDate.toDate()) / msDay);
            const approxDateWidth = 78;
            const countInRow = Math.floor(windowWidth / approxDateWidth);

            let displayDates = [];
            displayDates.push(startDate.format("MMMM"));

            if (days <= countInRow) {
                let currentDate = startDate.add(1, "days");
                while (currentDate < endDate) {
                    displayDates.push(currentDate.format("MMMM"));
                    currentDate = currentDate.add(1, "month");
                }
            } else {
                const step = Math.floor(days / (countInRow - 1));
                let currentDate = startDate;

                for (let i = 1; i < countInRow - 1; i++) {
                    currentDate = startDate.add(step, "month");
                    displayDates.push(currentDate.format("MMMM"));
                }
            }

            displayDates.push(endDate.format("MMMM"));
            setDates(displayDates);
        };

        generateDates();

    }, [windowWidth]);

    return (
        <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap',justifyContent:'center' }}>
            {dates.map((date) => (
                <span key={date} style={{ margin: '8px' }}>{date}</span>
            ))}
        </div>

    );
}

export default DateLine;
