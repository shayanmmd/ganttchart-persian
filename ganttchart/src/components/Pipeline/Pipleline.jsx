import { useState } from 'react';
import './pipleline.scss'
import Popup from '../Popup';
import { ProgressBar } from 'react-bootstrap';


function Pipleline({ startDate, endDate, displayPercentage, percentage, color = 'info' }) {

    const [showPopup, setShowPopup] = useState(false);

    const handlePopoverOpen = (event) => {
        setShowPopup(true);
    };

    const handlePopoverClose = () => {
        setShowPopup(false);
    };

    return (
        <Popup startDate={startDate} endDate={endDate} percentage={percentage} show={showPopup}>
            <ProgressBar variant={color} className='progress-bar-custom' dir='rtl' onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen} now={displayPercentage} />
        </Popup>
    )

}

export default Pipleline;