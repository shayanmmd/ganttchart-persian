import { OverlayTrigger, Popover } from 'react-bootstrap';


function Popup({ parentElement, children, show }) {

    return (
        <OverlayTrigger
            placement="bottom"
            show={show}
            overlay={
                <Popover dir='rtl' style={{ width: '100%' }} id="popover-contained">
                    <Popover.Body>
                        {children}
                    </Popover.Body>
                </Popover>
            }
        >
            {parentElement}
        </OverlayTrigger>
    );
}

export default Popup;
