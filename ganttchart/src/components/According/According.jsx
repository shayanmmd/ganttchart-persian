import { Accordion } from "react-bootstrap";

function According({children,title,direction='rtl',eventKey}) {

    return (
        <Accordion dir={direction}>
            <Accordion.Item eventKey={eventKey} >
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default According;