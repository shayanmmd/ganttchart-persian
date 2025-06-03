import { Col, Container, Row } from "react-bootstrap";
import { DateLine } from "../DateLine";
import { Pipeline } from "../Pipeline";
import { Label } from "../Label";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import './gantt.scss';
import { calculateProgress, calculatePosition } from "./../../helpers/functions";
import DateObject from "react-date-object";
import { Program } from "../Program";

function Gantt({ levels, program, color, startDate, endDate }) {

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

    }, [levels, program, startDate, endDate]);

    const checkIfGanttIsEmpty = () => {

        let count = 0;

        levels?.map(function (levels) {
            if ((levels.jLevelEstimatedStartTime > endDate || levels.jLevelEstimatedEndTime < startDate))
                count += 1;
        });

        if (count == levels.length)
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
                    <Program data={program} color={color} startDate={startDate} endDate={endDate} />
                    {

                        levels?.map(function (levels) {

                            const pipelinePosition = calculatePosition(startDate, endDate, bigDuration, levels.jLevelStartTime, levels.jLevelEstimatedEndTime);

                            if (pipelinePosition == null)
                                return;

                            const [right, left] = pipelinePosition;

                            stripedRow = !stripedRow;

                            const displayPercentage = calculateProgress(levels.jLevelEstimatedStartTime, levels.jLevelEstimatedEndTime, levels.percentage, startDate, endDate);

                            const isPercentageDanger = (levels.percentage > 100) ? true : false;

                            const isTimeDanger = (levels.jLevelEstimatedEndTime < Date.now()) ? true : false;

                            return (
                                <Row key={levels.id} className={stripedRow ? 'striped-row' : 'not-striped-row'} >

                                    <Col className="d-flex align-items-center border-left">
                                        <Label text={levels.title} />
                                    </Col>

                                    <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', right: right, left: left }}>
                                            <Pipeline
                                                displayPercentage={displayPercentage}
                                                color={color}
                                                startDate={levels.jLevelStartTime.format("YYYY/MM/DD")}
                                                endDate={levels.jLevelEstimatedEndTime.format("YYYY/MM/DD")}
                                                percentage={levels.percentage}
                                                isPercentageDanger={isPercentageDanger}
                                                isTimeDanger={isTimeDanger}
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