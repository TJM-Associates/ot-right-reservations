import React from 'react';
import ReactDOM from 'react-dom';
import Reservation from './components/Reservation.jsx';

ReactDOM.render(<Reservation path={window.location.pathname}/>, document.getElementById('reservation'));