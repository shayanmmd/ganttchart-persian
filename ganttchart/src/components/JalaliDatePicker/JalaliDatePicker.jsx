import './JalaliDatePicker.scss'
import { Col, Row } from "react-bootstrap";
import { DatePicker } from "react-advance-jalaali-datepicker";
import { convertToEnglishDateNumbers } from '../../helpers/functions';

function JalaliDatePicker({ date, title, onChangeFunction }) {

    return (
        <>
            <Row>
                <Col xl={2} lg={2} sm={12}>
                    <span>{title}</span>
                </Col>
                <Col xl={10} lg={10} sm={12}>
                    <div className='datePicker'>
                        <DatePicker
                            placeholder={title}
                            format="jYYYY/jMM/jDD"
                            preSelected={convertToEnglishDateNumbers(date.format('YYYY/MM/DD'))}
                            onChange={onChangeFunction}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default JalaliDatePicker;


