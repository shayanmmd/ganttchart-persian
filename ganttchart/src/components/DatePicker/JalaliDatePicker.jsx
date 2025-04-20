import { DatePicker } from "zaman";
import './JalaliDatePicker.scss'
import { Col, Row } from "react-bootstrap";

function JalaliDatePicker({ date = new Date(), title, onChangeFunction }) {

    return (
        <>
            <Row>
                <Col xl={2} lg={2} sm={12}>
                    <span>{title}</span>
                </Col>
                <Col xl={10} lg={10} sm={12}>
                    <DatePicker inputClass="" defaultValue={date} onChange={(e) => onChangeFunction(e)} />
                </Col>
            </Row>
        </>
    )
}

export default JalaliDatePicker;