import { Col, Container, Row } from "react-bootstrap";
import DateLine from "../DateLine/DateLine";
import Pipleline from "../Pipeline/Pipleline";
import Label from "../Label/Label";


function Gantt() {
    return (
        <>
            <Container dir="rtl" fluid>
                <Row>
                    <Col className="d-flex align-items-center">
                        <Label text={'تیم سازی'} />
                    </Col>

                    <Col xl={10} lg={10} sm={9} xs={8}>
                        <Pipleline percentage="1" />
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex align-items-center">
                        <Label text={'اموزش بچه ها'} />
                    </Col>

                    <Col xl={10} lg={10} sm={9} xs={8}>
                        <Pipleline percentage="88" />
                    </Col>
                </Row>
                <Row dir="ltr">
                    <Col lg={10}>
                        <DateLine />
                    </Col>
                </Row>
            </Container>
        </>
    );


}

export default Gantt;