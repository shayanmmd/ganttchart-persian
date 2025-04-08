import { useState } from 'react';
import './pipleline.scss'
import Popup from '../Popup';
import { ProgressBar } from 'react-bootstrap';


function Pipleline({ percentage = '75' }) {

    const [showPopup, setShowPopup] = useState(false);

    const handlePopoverOpen = (event) => {
        setShowPopup(true);
    };

    const handlePopoverClose = () => {
        setShowPopup(false);
    };

    return (
        <Popup percentage={percentage} show={showPopup}>
            <ProgressBar dir='rtl' striped onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen} now={percentage} />
        </Popup>
    )

}

export default Pipleline;