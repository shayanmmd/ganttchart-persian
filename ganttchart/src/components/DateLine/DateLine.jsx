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


// import React, { useEffect, useState, useRef } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import DateObject from "react-date-object";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// function DateLine() {

//     const startDate = new DateObject({ year: 1404, month: 1, day: 1, calendar: persian, locale: persian_fa });
//     const endDate = new DateObject({ year: 1404, month: 3, day: 25, calendar: persian, locale: persian_fa });

//     const [dates, setDates] = useState([]);
//     const [windowWidth, setWindowWidth] = useState(null);

//     useEffect(() => {

//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {

//         setWindowWidth(window.innerWidth);

//         const generateDates = () => {
//             let msDay = 24 * 60 * 60 * 1000;
//             let days = Math.floor((endDate.toDate() - startDate.toDate()) / msDay);
//             const approxDateWidth = 78;
//             const countInRow = Math.floor(windowWidth / approxDateWidth);

//             let displayDates = [];
//             displayDates.push(startDate.format("MMMM"));

//             if (days <= countInRow) {
//                 let currentDate = startDate.add(1, "month");
//                 while (currentDate < endDate) {
//                     displayDates.push(currentDate.format("MMMM"));
//                     currentDate = currentDate.add(1, "month");
//                 }
//             } else {
//                 const step = Math.floor(days / (countInRow - 1));
//                 let currentDate = startDate;

//                 for (let i = 1; i < countInRow - 1; i++) {
//                     currentDate = startDate.add(step, "month");
//                     displayDates.push(currentDate.format("MMMM"));
//                 }
//             }

//             displayDates.push(endDate.format("MMMM"));
//             setDates(displayDates);
//         };

//         generateDates();

//     }, [windowWidth]);

//     return (
//         <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap',justifyContent:'center' }}>
//             {dates.map((date) => (
//                 <span key={date} style={{ margin: '8px' }}>{date}</span>
//             ))}
//         </div>

//     );
// }

// export default DateLine;


// import React, { useEffect, useState } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import DateObject from "react-date-object";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// function DateLine({width}) {

//     const startDate = new DateObject({ year: 1404, month: 1, day: 1, calendar: persian, locale: persian_fa });
//     const endDate = new DateObject({ year: 1404, month: 12, day: 25, calendar: persian, locale: persian_fa });

//     const [dates, setDates] = useState([]);

//     useEffect(() => {
//         if (!width) return;
//         if(!startDate || !endDate) return;

//         const generateDates = () => {
//             let displayDates = [];
//             let currentDate = startDate; 

//             while (currentDate <= endDate) {
//                 displayDates.push(currentDate.format("MMMM"));
//                 currentDate = currentDate.add(1, "month");
//             }

//             setDates(displayDates);
//         };

//         generateDates();
//     }, [width]);  


//     return (
//         <div style={{ direction: 'rtl', width: '100%', display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', justifyContent: 'space-around' }}>
//             {dates.map((date, index) => (
//                 <span key={index} style={{ margin: '8px' }}>{date}</span>
//             ))}
//         </div>
//     );
// }

// export default DateLine;


import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import React from 'react';
import { Col, Row } from 'react-bootstrap';

function DateLine({ width, startDate, endDate }) {

    const estimatedMonthWidth = 80;

    const start = new DateObject({ year: 1404, month: 1, day: 1, calendar: persian, locale: persian_fa });
    const end = new DateObject({ year: 1404, month: 10, day: 25, calendar: persian, locale: persian_fa });

    const monthsPerRow = Math.floor(width / estimatedMonthWidth);


    const months = [];
    let current = start;

    months.push(start.format('MMMM'));

    current = current.add(1, "month")

    let step = 1;

    let msDay = 24 * 60 * 60 * 1000;

    const allmonths = Math.floor(((end - start) / msDay) / 30);


    if (width <= 320) {
        step = 10
    } else if (width <= 768) {
        step = 3
    }
    else {
        step = 1
    }

    months.push(start.format('MMMM'));

    current.add(step, "month");


    while (current < end) {
        months.push(current.format('MMMM'));
        current = current.add(step, 'month');
    }

    if (months[months.length - 1] !== end.format('MMMM')) {
        months.push(end.format('MMMM'));
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
