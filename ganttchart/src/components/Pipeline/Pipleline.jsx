import { useState } from 'react';
import './pipleline.scss'
import { Popup } from '../Popup';
import { ProgressBar } from 'react-bootstrap';
import { Row, Col, Container } from 'react-bootstrap';


function Pipleline({ startDate, endDate, displayPercentage, percentage, color }) {

    const [showPopup, setShowPopup] = useState(false);

    const progressBarElement =
        <ProgressBar
            dir='rtl'
            variant={color}
            className='progress-bar-custom'
            onMouseLeave={() => setShowPopup(false)}
            onMouseEnter={() => setShowPopup(true)}
            now={displayPercentage}
        />

    return (
        <Popup parentElement={progressBarElement} show={showPopup}>
            <Container>
                <Row>
                    <Col lg={5}>
                        <span>زمان شروع :</span>
                    </Col>
                    <Col dir='ltr' lg={7}>
                        <p>{startDate}</p>
                    </Col>

                    <Col lg={5}>
                        <span>زمان پایان :</span>
                    </Col>
                    <Col dir='ltr' lg={7}>
                        <p>{endDate}</p>
                    </Col>

                    <Col lg={8}>
                        <span>درصد پیشرفت :</span>
                    </Col>
                    <Col dir='ltr' lg={4}>
                        <p>{percentage}%</p>
                    </Col>

                </Row>
            </Container>
        </Popup>
    );
}

export default Pipleline;