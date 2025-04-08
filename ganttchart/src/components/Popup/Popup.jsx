import { OverlayTrigger, Popover, Row, Col, Container } from 'react-bootstrap';


function Popup({ show,percentage, children }) {



    return (
        <OverlayTrigger

            placement="bottom"
            show={show}
            overlay={
                <Popover dir='rtl' style={{ width: '100%' }} id="popover-contained">
                    <Popover.Body>
                        <Container>
                            <Row>
                                <Col lg={5}>
                                    <span>زمان شروع :</span>
                                </Col>
                                <Col dir='ltr' lg={7}>
                                    <p>1401/05/12</p>
                                </Col>

                                <Col lg={5}>
                                    <span>زمان پایان :</span>
                                </Col>
                                <Col dir='ltr' lg={7}>
                                    <p>1401/05/12</p>
                                </Col>

                                <Col lg={8}>
                                    <span>درصد پیشرفت :</span>
                                </Col>
                                <Col dir='ltr' lg={4}>
                                    <p>{percentage}%</p>
                                </Col>

                            </Row>
                        </Container>
                    </Popover.Body>
                </Popover>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

export default Popup;
