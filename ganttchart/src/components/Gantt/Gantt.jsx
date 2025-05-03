import { Col, Container, Row } from "react-bootstrap";
import DateLine from "../DateLine/DateLine";
import Pipleline from "../Pipeline/Pipleline";
import Label from "../Label/Label";
import { useEffect, useRef, useState } from "react";
import './gantt.scss';
import { calculateProgress } from "./functions";

function Gantt({ data, color, startDate, endDate }) {

    const [bigDuration, setBigDuration] = useState(null);
    const [colWidth, setColWidth] = useState(0);
    const colRef = useRef(null);
    let stripedRow = true;

    useEffect(() => {

        const msDay = 24 * 60 * 60 * 1000;
        const daysDuration = Math.floor(((endDate - startDate) / msDay));

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

    }, [data, startDate, endDate])



    return (
        <>
            <Container dir="rtl" fluid className="gantt-container">
                {
                    data.map(function (data) {
                        

                        const msDay = 24 * 60 * 60 * 1000;

                        if (bigDuration == null)
                            return;

                        let right;
                        let left;
                        
                        if (data.jLevelEstimatedStartTime > startDate && data.jLevelEstimatedStartTime < endDate) {
                            right = Math.floor((((data.jLevelEstimatedStartTime - startDate) / msDay) / (bigDuration)) * 100) + '%';
                        } else if (data.jLevelEstimatedStartTime < startDate) {
                            right = '0%';
                        }
                        else {
                            return;
                        }

                        if (data.jLevelEstimatedEndTime < endDate && data.jLevelEstimatedEndTime > startDate) {
                            left = Math.floor((((endDate - data.jLevelEstimatedEndTime) / msDay) / (bigDuration)) * 100) + '%';
                        } else if (data.jLevelEstimatedEndTime > endDate) {
                            left = '0%';
                        }
                        else {
                            return;
                        }

                        stripedRow = !stripedRow

                        const displayPercentage = calculateProgress(data.jLevelEstimatedStartTime, data.jLevelEstimatedEndTime, data.percentage, startDate, endDate);

                        return (
                            <Row key={data.id} className={stripedRow ? 'striped-row' : 'not-striped-row'} >

                                <Col className="d-flex align-items-center">
                                    <Label text={data.title} />
                                </Col>

                                <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: right, left: left }}>
                                        <Pipleline
                                            displayPercentage={displayPercentage}
                                            color={color}
                                            startDate={data.jLevelEstimatedStartTime.format("YYYY/MM/DD")}
                                            endDate={data.jLevelEstimatedEndTime.format("YYYY/MM/DD")}
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
                        {startDate && <DateLine startTime={startDate}
                            endTime={endDate} width={colWidth} />}
                    </Col>
                </Row>
            </Container>
        </>
    );


}

export default Gantt;