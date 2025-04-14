import { useState } from 'react';
import './pipleline.scss'
import Popup from '../Popup';
import { ProgressBar } from 'react-bootstrap';


function Pipleline({ startDate,endDate,percentage = '75',color='info',backgroundColor = 'red' }) {

    const [showPopup, setShowPopup] = useState(false);

    const handlePopoverOpen = (event) => {
        setShowPopup(true);
    };

    const handlePopoverClose = () => {
        setShowPopup(false);
    };

    return (
        <Popup startDate={startDate} endDate={endDate} percentage={percentage} show={showPopup}>
            <ProgressBar style={{backgroundColor:backgroundColor}} variant={color} className='progress-bar-custom' dir='rtl'  onMouseLeave={handlePopoverClose} onMouseEnter={handlePopoverOpen} now={percentage} />
        </Popup>
    )

}

export default Pipleline;