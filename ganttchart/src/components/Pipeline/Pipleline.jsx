import { useState } from 'react';
import './pipleline.scss'
import Popup from '../Popup';
import { ProgressBar } from 'react-bootstrap';


function Pipleline({ startDate,endDate,percentage = '75' }) {

    const [showPopup, setShowPopup] = useState(false);

    const handlePopoverOpen = (event) => {
        setShowPopup(true);
    };

    const handlePopoverClose = () => {
        setShowPopup(false);
    };

    return (
        <Popup startDate={startDate} endDate={endDate} percentage={percentage} show={showPopup}>
            <ProgressBar className='m-2' dir='rtl' striped onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen} now={percentage} />
        </Popup>
    )

}

export default Pipleline;