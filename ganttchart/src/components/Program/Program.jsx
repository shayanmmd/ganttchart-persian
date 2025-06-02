import { calculateProgress, calculatePosition } from "./../../helpers/functions.js";
import { Col, Row } from "react-bootstrap";
import { Pipeline } from "../Pipeline";
import { Label } from "../Label";
import './program.scss';


function Program({ data, startDate, endDate, color }) {

    const msDay = 24 * 60 * 60 * 1000;
    const bigDuration = Math.floor(((endDate - startDate) / msDay));

    const pipelineProgramPosition = calculatePosition(startDate, endDate, bigDuration, data.jStartTime, data.jEstimatedEndTime);

    if (pipelineProgramPosition == null)
        return;

    const [right, left] = pipelineProgramPosition;

    const displayPercentage = calculateProgress(data.jEstimatedStarTime, data.jEstimatedEndTime, data.percentage, startDate, endDate);

    const isPercentageDanger = (data.percentage > 100) ? true : false;

    const isTimeDanger = (data.jEstimatedEndTime < Date.now()) ? true : false;

    return (
        <Row key={data.ProgramID} className='striped-row gantt-header' >

            <Col className="d-flex align-items-center border-left">
                <Label text={data.title} />
            </Col>

            <Col xl={10} lg={10} sm={9} xs={8} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: right, left: left }}>
                    <Pipeline
                        displayPercentage={displayPercentage}
                        color={color}
                        startDate={data.jStartTime.format("YYYY/MM/DD")}
                        endDate={data.jEstimatedEndTime.format("YYYY/MM/DD")}
                        percentage={data.percentage}
                        variant="success"
                        description={data.description}
                        title={data.title}
                        isPercentageDanger={isPercentageDanger}
                        isTimeDanger={isTimeDanger}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default Program;