// import { DatePicker } from "zaman";
import './JalaliDatePicker.scss'
import { Col, Row } from "react-bootstrap";
import {
    DatePicker
} from "react-advance-jalaali-datepicker";

function JalaliDatePicker({ date = new Date(), title, onChangeFunction }) {

    return (
        <>
            <Row>
                <Col xl={2} lg={2} sm={12}>
                    <span>{title}</span>
                </Col>
                <Col xl={10} lg={10} sm={12}>
                    {/* <DatePicker direction="rtl" position="center" defaultValue={date} onChange={(e) => onChangeFunction(e)} /> */}
                    <div className='datePicker'>
                        <DatePicker
                            placeholder={title}
                            format="jYYYY/jMM/jDD"
                            preSelected={date.format('YYYY/MM/DD')}
                            onChange={onChangeFunction}
                            id="datePicker"

                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default JalaliDatePicker;


