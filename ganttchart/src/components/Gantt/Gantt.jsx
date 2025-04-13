import { Col, Container, Row } from "react-bootstrap";
import DateLine from "../DateLine/DateLine";
import Pipleline from "../Pipeline/Pipleline";
import Label from "../Label/Label";
import { useEffect, useState } from "react";




function Gantt({ data }) {

    const [bigStartDate, setBigStartDate] = useState(null);
    const [bigEndDate, setBigEndDate] = useState(null);
    const [bigDuration, setBigDuration] = useState(null);

    useEffect(() => {

        setBigStartDate(data[0].startDate.toDate())
        setBigEndDate(data[0].endDate.toDate())

        let msDay = 24 * 60 * 60 * 1000;
        let days = Math.floor(((data[0].endDate.toDate() - data[0].startDate.toDate()) / msDay));

        setBigDuration(days)

    }, []);

    return (
        <>
            <Container dir="rtl" fluid>
                {
                    data.map(function (data) {

                        let msDay = 24 * 60 * 60 * 1000;

                        if (bigDuration == null)
                            return

                        const right = Math.floor((((data.startDate - bigStartDate) / msDay) / bigDuration) * 100) + '%';
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
                
                <Row dir="ltr">
                    <Col lg={10}>
                        {/* <DateLine /> */}
                    </Col>
                </Row>
            </Container>
        </>
    );


}

export default Gantt;