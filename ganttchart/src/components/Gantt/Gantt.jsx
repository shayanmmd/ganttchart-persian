import { Col, Container, Row } from "react-bootstrap";
import { DateLine } from "../DateLine";
import { Pipeline } from "../Pipeline";
import { Label } from "../Label";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import './gantt.scss';
import { calculateProgress } from "./../../helpers/functions";
import DateObject from "react-date-object";

function Gantt({ data, color, startDate, endDate }) {

    const [bigDuration, setBigDuration] = useState(null);
    const [colWidth, setColWidth] = useState(0);
    const [isGanttEmpty, setIsGanttEmpty] = useState(false);

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

    }, [data, startDate, endDate]);

    const checkIfGanttIsEmpty = () => {

        let count = 0;

        data?.map(function (data) {
            if ((data.jLevelEstimatedStartTime > endDate || data.jLevelEstimatedEndTime < startDate))
                count += 1;
        });

        if (count == data.length)
            return true;

        return false;
    }

    useLayoutEffect(() => {

        if (checkIfGanttIsEmpty()) {
            setIsGanttEmpty(true);
        } else {
            setIsGanttEmpty(false);
        }

    }, [startDate, endDate]);

    return (
        <>
            {!isGanttEmpty
                && <Container dir="rtl" fluid className="gantt-container">
                    {
                        data?.map(function (data) {

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

                            stripedRow = !stripedRow;

                            const displayPercentage = calculateProgress(data.jLevelEstimatedStartTime, data.jLevelEstimatedEndTime, data.percentage, startDate, endDate);

                            return (
                                <Row key={data.id} className={stripedRow ? 'striped-row' : 'not-striped-row'} >

                                    <Col className="d-flex align-items-center border-left">
                                        <Label text={data.title} />
                                    </Col>

                                    <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', right: right, left: left }}>
                                            <Pipeline
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
                            {
                                startDate
                                && endDate
                                && <DateLine
                                    startDate={new DateObject(startDate)}
                                    endDate={new DateObject(endDate)} width={colWidth}
                                />
                            }
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );


}

export default Gantt;