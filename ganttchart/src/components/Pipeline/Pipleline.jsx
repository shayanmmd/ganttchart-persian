import { useState } from 'react';
import './pipleline.scss'
import { Popup } from '../Popup';
import { ProgressBar } from 'react-bootstrap';
import { Row, Col, Container } from 'react-bootstrap';
import { TruncatedText } from '../TruncatedText';


function Pipleline({ startDate, endDate, displayPercentage, percentage,realWorkHours,estimatedWorkHours, color, isPercentageDanger = false, isTimeDanger = false, description = null, title = null }) {

    const [showPopup, setShowPopup] = useState(false);

    const progressBarElement =
        <ProgressBar
            dir='rtl'
            variant={color}
            className={`progress-bar-custom ${(isPercentageDanger === true || isTimeDanger === true) && 'progress-bar-danger'}`}
            onMouseLeave={() => setShowPopup(false)}
            onMouseEnter={() => setShowPopup(true)}
            now={displayPercentage}
        />

    return (
        <Popup parentElement={progressBarElement} show={showPopup}>
            <Container>
                {
                    title &&
                    <Row>
                        <Col lg={5}>
                            <span>عنوان :</span>
                        </Col>
                        <Col dir='ltr' lg={12}>
                            <TruncatedText className='margin-right-10' text={title} maxLength={70} />
                        </Col>
                    </Row>
                }
                <Row>
                    <Col lg={5}>
                        <span>زمان شروع :</span>
                    </Col>
                    <Col dir='ltr' lg={7}>
                        <p>{startDate}</p>
                    </Col>
                </Row>
                <Row className={isTimeDanger ? 'border-danger' : ''}>
                    <Col lg={5}>
                        <span>زمان پایان :</span>
                    </Col>
                    <Col dir='ltr' lg={7}>
                        <p>{endDate}</p>
                    </Col>
                </Row>
                <Row className={isPercentageDanger ? 'border-danger' : ''}>
                    <Col lg={8}>
                        <span>ساعت واقعی: </span>
                    </Col>
                    <Col dir='ltr' lg={4}>
                        <p>{realWorkHours ?? 0}</p>
                    </Col>
                </Row>
                 <Row className={isPercentageDanger ? 'border-danger' : ''}>
                    <Col lg={8}>
                        <span>ساعت تخمینی: </span>
                    </Col>
                    <Col dir='ltr' lg={4}>
                        <p>{estimatedWorkHours ?? 0}</p>
                    </Col>
                </Row>
                <Row className={isPercentageDanger ? 'border-danger' : ''}>
                    <Col lg={8}>
                        <span>درصد پیشرفت :</span>
                    </Col>
                    <Col dir='ltr' lg={4}>
                        <p>{percentage ?? 0}%</p>
                    </Col>
                </Row>
                {
                    description &&
                    <Row>
                        <Col lg={5}>
                            <span>توضیحات :</span>
                        </Col>
                        <Col dir='ltr' lg={12}>
                            <TruncatedText className='margin-right-10' text={description} maxLength={70} />
                        </Col>
                    </Row>
                }

            </Container>
        </Popup>
    );
}

export default Pipleline;