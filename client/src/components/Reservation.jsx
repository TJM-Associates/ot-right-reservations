import React from 'react';
import Calendar from './Calendar.jsx';

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Calendar />
            </div>
        )
    }
}

export default Reservation;