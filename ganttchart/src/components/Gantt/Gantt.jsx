import { Col, Container, Row } from "react-bootstrap";
import DateLine from "../DateLine/DateLine";
import Pipleline from "../Pipeline/Pipleline";
import Label from "../Label/Label";
import { useEffect, useRef, useState } from "react";
import './gantt.scss'
import { sortArrayByStartDate, sortArrayByEndDate } from "./functions";

function Gantt({ data, color }) {

    const [bigStartDate, setBigStartDate] = useState(null);
    const [bigEndDate, setBigEndDate] = useState(null);
    const [bigDuration, setBigDuration] = useState(null);

    let stripedRow = true;

    const colRef = useRef(null);
    const [colWidth, setColWidth] = useState(0);

    useEffect(() => {

        const sortedArrayByStartDate = sortArrayByStartDate(data);
        const sortedArrayByEndDate = sortArrayByEndDate(data);

        setBigStartDate(sortedArrayByStartDate[0].startDate);
        setBigEndDate(sortedArrayByEndDate[0].endDate);
        
        const msDay = 24 * 60 * 60 * 1000;
        const daysDuration = Math.floor(((sortedArrayByEndDate[0].endDate.toDate() - sortedArrayByStartDate[0].startDate.toDate()) / msDay));

        setBigDuration(daysDuration);

        const handleResize = () => {
            if (colRef.current) {
                setColWidth(colRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [data])

    return (
        <>
            <Container dir="rtl" fluid className="gantt-container">
                {
                    data.map(function (data) {

                        const msDay = 24 * 60 * 60 * 1000;

                        if (bigDuration == null)
                            return;

                        const right = Math.floor((((data.startDate - bigStartDate) / msDay) / (bigDuration)) * 100) + '%';
                        const left = Math.floor((((bigEndDate - data.endDate) / msDay) / bigDuration) * 100) + '%';


                        stripedRow = !stripedRow

                        return (
                            <Row key={data.id} className={stripedRow ? 'striped-row' : 'not-striped-row'} >

                                <Col className="d-flex align-items-center">
                                    <Label text={data.label} />
                                </Col>

                                <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: right, left: left }}>
                                        <Pipleline
                                            color={color}
                                            startDate={data.startDate.format("YYYY/MM/DD")}
                                            endDate={data.endDate.format("YYYY/MM/DD")}
                                            percentage={data.percentage}
                                            variant="success"
                                        />
                                    </div>
                                </Col>

                            </Row>
                        )
                    })
                }

                <Row>
                    <Col></Col>
                    <Col ref={colRef} xl={10} lg={10} sm={9} xs={8}>
                        {bigStartDate && <DateLine startTime={bigStartDate}
                            endTime={bigEndDate} width={colWidth} />}

                    </Col>
                </Row>
            </Container>
        </>
    );


}

export default Gantt;