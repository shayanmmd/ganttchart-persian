import { Col, Container, Row } from "react-bootstrap";
import DateLine from "../DateLine/DateLine";
import Pipleline from "../Pipeline/Pipleline";
import Label from "../Label/Label";
import { useEffect, useRef, useState } from "react";

function Gantt({ data }) {

    const [bigStartDate, setBigStartDate] = useState(null);
    const [bigEndDate, setBigEndDate] = useState(null);
    const [bigDuration, setBigDuration] = useState(null);

    const colRef = useRef(null);
    const [colWidth, setColWidth] = useState(0);

    useEffect(() => {

        setBigStartDate(data[0].startDate);
        setBigEndDate(data[0].endDate);

        const msDay = 24 * 60 * 60 * 1000;
        const daysDuration = Math.floor(((data[0].endDate.toDate() - data[0].startDate.toDate()) / msDay));

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

    }, [])

    return (
        <>
            <Container dir="rtl" fluid>
                {
                    data.map(function (data) {

                        const msDay = 24 * 60 * 60 * 1000;

                        if (bigDuration == null)
                            return;

                        const right = Math.floor((((data.startDate - bigStartDate) / msDay) / (bigDuration)) * 100) + '%';
                        const left = Math.floor((((bigEndDate - data.endDate) / msDay) / bigDuration) * 100) + '%';

                        return (
                            <Row key={data.id}>

                                <Col className="d-flex align-items-center">
                                    <Label text={data.label} />
                                </Col>

                                <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: right, left: left }}>
                                        <Pipleline
                                            startDate={data.startDate.format("YYYY/MM/DD")}
                                            endDate={data.endDate.format("YYYY/MM/DD")}
                                            percentage={data.percentage}

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
                        {/* {bigStartDate && bigEndDate &&  colWidth &&  <DateLine startDate={bigStartDate} endDate={bigEndDate} width={colWidth} />} */}

                    </Col>
                </Row>
            </Container>
        </>
    );


}

export default Gantt;