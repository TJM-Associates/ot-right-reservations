import React from 'react';
// import styled from 'styled-components';
import moment from 'moment';
import $ from 'jquery';
import Calendar from './Calendar.jsx';

// import BrandonTextRegular from './fonts/BrandonText-Regular.otf';
// import BrandonTextLight from './fonts/BrandonText-Light.otf';
// import BrandonTextMedium from './fonts/BrandonText-Medium.otf';
// import BrandonTextBold from './fonts/BrandonText-Bold.otf';

/******************** STYLED COMPONENTS ********************/
const ReserveForm = styled.div`
width: 300px;
height: 326px;
background-color: white;
box-shadow: 0px 0px 6px #BFBFBF;
margin: 50px;
font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans';
`;
const FormTitle = styled.div`
font-size: 19px;
margin: 18px;
padding-top: 12.5px;
padding-bottom: 12.5px;
border-bottom: 1px solid #BFBFBF;
text-align: center;
font-weight: bold;
`;
const ReservationForms = styled.div`
width: 95%;
display: inline-block;
`;
const PartyLabel = styled.div`
font-size: 14px;
height: 22px;
margin-left: 18px;
font-weight: bold;
`;
const PartyDiv = styled.div`
display: flex;
`;
const PartyFor = styled.div`
display: absolute;
padding-top: 5px;
padding-left: 18px;
font-size: 14px;
font-weight: none;
`;
const PartySelect = styled.select`
margin-left: -22px;
margin-bottom: 12px;
width: 94%;
background-color: white;
-moz-appearance:none;
-webkit-appearance: none;
-webkit-border-radius: 0px;
padding-top: 5px;
padding-bottom: 10px;
padding-left: 27px;
border: none;
border-bottom: 1px solid #BFBFBF;
font-size: 14px;
font-weight: none;
outline: none;
background: url(https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/010-Down-512.png) no-repeat right;
background-position-x: 97%;
background-size: 10px;
&:hover, active {
  margin-bottom: 11px;
  border-bottom: 2px solid #da3743;
  cursor: pointer;
}
`;
PartySelect.displayName = 'PartySelect';
const DateTime = styled.div`
display: flex;
width: 100%;
`;
const DateTimeLabel = styled.div`
font-size: 14px;
height: 22px;
width: 40%;
margin-left: 18px;
font-weight: bold;
`;
const DateDiv = styled.div`
width: 100%;
display: flex;
`;
const DateChooser = styled.div`
margin-left: -115px;
margin-bottom: 12px;
width: 100%;
background-color: white;
-moz-appearance:none;
-webkit-appearance: none;
-webkit-border-radius: 0px;
padding-top: 5px;
padding-bottom: 10px;
border: none;
border-bottom: 1px solid #BFBFBF;
font-size: 14px;
font-weight: none;
outline: none;
background: url(https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/010-Down-512.png) no-repeat right;
background-position-x: 97%;
background-size: 10px;
&:hover, active, __hover {
  margin-bottom: 11px;
  border-bottom: 2px solid #da3743;
  cursor: pointer;
}
`
DateChooser.displayName = 'DateChooser';
const SelectedDate = styled.div`
display: absolute;
padding-top: 5px;
padding-left: 18px;
font-size: 14px;
font-weight: none;
width: 100%;
`;
const TimeSelect = styled.select`
margin-left: 18px;
margin-bottom: 12px;
margin-right: 4px;
width: 93%;
background-color: white;
-moz-appearance:none;
-webkit-appearance: none;
-webkit-border-radius: 0px;
padding-top: 5px;
padding-bottom: 10px;
border: none;
border-bottom: 1px solid #BFBFBF;
font-size: 14px;
font-weight: none;
outline: none;
background: url(https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/010-Down-512.png) no-repeat right;
background-position-x: 97%;
background-size: 10px;
&:hover, active {
  margin-bottom: 11px;
  border-bottom: 2px solid #da3743;
  cursor: pointer;
}
`;
TimeSelect.displayName = 'TimeSelect';
const CalPopup = styled.div`
position: absolute;
margin-top: 34px;
margin-left: 18px;
z-index: 2;
`;
const FindTable = styled.button`
margin-left: 18px;
margin-top: 5px;
width: 93%
height: 47px;
outline: none;
border: none;
border-radius: 3%;
background-color: #da3743;
color: white;
font-size: 14px;
&:hover, active {
  cursor: pointer;
  opacity: .8;
}
`;
FindTable.displayName = 'FindTable';
const BookedNumTimes = styled.div`
margin-left: 18px;
margin-top: 15px;
font-weight: bold;
text-align: left;
font-size: 14px;
`;
const Bookings = styled.div`
// display: absolute;
`;
const BookingLabel = styled.div`
font-size: 16px;
margin-left: 18px;
text-align: left;
font-weight: bold;
margin-bottom: 10px;
`;
const BookingButtons = styled.div`
position: relative;
box-sizing: border-box;
margin-left: 18px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 93%;
align-content: space-around;
`;
const BookingButton = styled.div`
width: 29%;
height: 32px;
margin-right: 10px;
margin-bottom: 10px;
border-radius: 3%;
background-color: #da3743;
color: white;
font-size: 14px;
&:hover {
  cursor: pointer;
  opacity: 0.8;
}
`;
const BookingTime = styled.div`
padding-top: 7px;
text-align: center;
`;

/******************** REACT COMPONENT ********************/
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      showBookings: false,
      bookings: ['6:30 PM', '7:00 PM', '7:30 PM'],
      seats: 0,
      date: '',
      time: {},
      partyArray: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      timeArray: this.generateTimes(), //reservationTimes
      currentMonth: '',
      currentYear: '',
      currentMonthDates: [],
      selectedDate: ''
    }

    this.restaurantId = window.location.pathname.split('/')[2];
    this.calendar = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.generateMonth = this.generateMonth.bind(this);
    this.selectSeats = this.selectSeats.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.changePrevMonth = this.changePrevMonth.bind(this);
    this.changeNextMonth = this.changeNextMonth.bind(this);
    this.findReservation = this.findReservation.bind(this);
    this.generateTimes = this.generateTimes.bind(this);
    this.generateMonthlyDates = this.generateMonthlyDates.bind(this);
    this.postReservation = this.postReservation.bind(this);
  }
  
  handleClickOutside(event) {
    if (!this.calendar.current.contains(event.target)) {
      this.closeCalendar();
    }
  }

  componentDidMount() {
    var date = new Date;
    var dayOfWeek = moment().format('ddd');
    $.get(`http://54.215.234.24:3003/api/restaurants/${this.restaurantId}`, (data) => {
    this.setState({
      openTime: data.open_time,
      closeTime: data.close_time,
      date: date.getFullYear() + '-' + '09' + '-' + '17', //(Number(date.getMonth())+1)+ '-' + date.getDay()
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear(),
      time: '3:00 PM',
      seats: 4,
      selectedDate: '' + dayOfWeek + ', ' + (Number(date.getMonth())+1) + '/' + date.getDay()
    }, () => {
      this.generateMonth();
      });
    });
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  generateTimes() {
    const times = [];
    for(var hour = 0; hour < 24; hour++) {
      times.push(moment({ hour }).format('h:mm A'));
      times.push(
        moment({
          hour,
          minute: 30
        }).format('h:mm A')
      );
    }
    return times;
  }
  
  generateMonthlyDates(currentMonth, year) {
    const firstWeek = moment().month(currentMonth).startOf('month').week();
    var calendarMonth = []
    for(var week = firstWeek; week <= firstWeek + 5; week++) {
      var weekdates = [];
      for (var i = 0; i < 7; i ++) {
        weekdates.push({
          date: moment().week(week).startOf('week').clone().add(i, 'day').format('D'),
          month: moment().week(week).startOf('week').clone().add(i, 'day').format('M') - 1
        })
      }
      calendarMonth.push(weekdates);
    }
    return calendarMonth
  }

  generateMonth() {
    const dates = this.generateMonthlyDates(this.state.currentMonth, this.state.currentYear);
    this.setState({
      currentMonthDates: dates
    })
  }

  selectSeats(e) {
    this.setState({
      seats: e.target.value,
      showBookings: false
    })
  }

  selectDate(date) {
    this.setState({
      date: date[0],
      currentMonth: date[1] - 1,
      selectedDate: date[2],
      showBookings: false
    }, () => {
      this.generateMonth();
    })
  }

  selectTime(e) {
    this.setState({
      time: e.target.value,
      showBookings: false
    })
  }

  showCalendar() {
    this.setState((state) => ({
      showCalendar: !state.showCalendar
    }));
  }

  closeCalendar() {
    this.setState({
      showCalendar: false
    })
  }
  changePrevMonth() {
    this.setState({
      currentMonth: this.state.currentMonth - 1
    }, () => {
      this.generateMonth();
    });
  }

  changeNextMonth() {
    this.setState({
      currentMonth: this.state.currentMonth + 1
    }, () => {
      this.generateMonth();
    })
  }

  findReservation() {
    var twentyFourTime = moment(this.state.time, ['h:m a', 'H:m']).format('HH:mm')
    // var timeLower = moment(this.state.time, ['h:m a', 'H:m']).subtract(1.25, 'hours').format('HH:mm')
    // var timeUpper = moment(this.state.time, ['h:m a', 'H:m']).add(1.25, 'hours').format('HH:mm')
    var req = { date: this.state.date, time: twentyFourTime, seats: this.state.seats };
    $.get(`http://54.215.234.24:3003/api${window.location.pathname}availability`, req, (data) => {
      var times = [];
      data.forEach((bookingTime) => times.push(moment(bookingTime, ['HH:mm:ss']).format('h:mm A')));
      this.setState({
        showBookings: true,
        bookings: times,
      });
    });
  }
  
  postReservation(e) {
    console.log(e.target.value)
    // console.log(this.selectSeats(e));
    // const req = {
    //   "reservation_datetime": "2019-09-17 17:00:03",
    //   "seats": 
    // }
    // $.post(`http://localhost:3003/api/restaurants/${restaurantId}/reservations`, req, (success) => {

    // });
  }

  render() {
    return (
      <div>
          <ReserveForm>
              <FormTitle>
                  Make a reservation
              </FormTitle>
              <ReservationForms>
                  <PartyLabel>
                      Party Size
                  </PartyLabel>
                  <PartyDiv>
                      <PartyFor>For </PartyFor>
                      <PartySelect value={this.state.partySize} onChange={this.selectPartySize}>
                          {this.state.partyArray.map((num, i) => (
                              <option key={i} value={num}>{num}</option>
                          ))}
                      </PartySelect>
                  </PartyDiv>
                  <DateTime>
                      <DateTimeLabel>
                          Date
                      </DateTimeLabel>
                      <DateTimeLabel>
                          Time
                      </DateTimeLabel>
                  </DateTime>
                  <DateTime>
                      <DateDiv ref={this.calendar}>
                          <SelectedDate>{this.state.selectedDate}</SelectedDate>
                          <DateChooser onClick={this.showCalendar}></DateChooser>
                              <CalPopup>
                                  {this.state.showCalendar ? <Calendar changeNextMonth={this.changeNextMonth} changePrevMonth={this.changePrevMonth} currentMonthDates={this.state.currentMonthDates} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear}  closeCalendar={this.closeCalendar} selectDate={this.selectDate}/> : null}
                              </CalPopup>
                      </DateDiv>
                      <TimeSelect value={this.state.time} onChange={this.selectTime}>
                          {this.state.timeArray.map((time, i) => (
                              <option key={i} value={time}>{time}</option>
                          ))}
                      </TimeSelect>
                  </DateTime>
                  {this.state.showBookings ? null : <FindTable onClick={this.findReservation}>Find a Table</FindTable>}
                  {this.state.showBookings ? null : <BookedNumTimes>Booked 4 times today</BookedNumTimes>}
              </ReservationForms>
                  <Bookings>
                      {this.state.showBookings ? <BookingLabel>Select a time:</BookingLabel> : null} 
                      <BookingButtons>
                          {this.state.showBookings ? this.state.bookings.map((time, i) => 
                                  <BookingButton key={i} > <BookingTime onClick={this.postReservation}>{time}</BookingTime> </BookingButton>        
                          ) : null }
                      </BookingButtons>
                  </Bookings>
          </ReserveForm>
      </div>
    )
  }
}
window.Reservation = Reservation;
export default Reservation;
