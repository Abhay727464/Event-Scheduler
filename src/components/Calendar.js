import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';
import "../styles/Calendar.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Calendar = ({ events, onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState('');

  const nextMonth = () => {
    setSlideDirection('slide-left');
    setTimeout(() => {
      setCurrentDate(addMonths(currentDate, 1));
      setSlideDirection('');
    }, 300);
  };

  const prevMonth = () => {
    setSlideDirection('slide-right');
    setTimeout(() => {
      setCurrentDate(subMonths(currentDate, 1));
      setSlideDirection('');
    }, 300);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}><ArrowCircleLeftIcon /></button>
        <span>{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth}><ArrowCircleRightIcon /></button>
      </div>

      <div className="weekdays">
        {weekdayNames.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="grid-container">
        <div className={`grid ${slideDirection}`}>
          {days.map((day, i) => (
            <div
              key={i}
              id={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
              className={`day ${isSameMonth(day, monthStart) ? '' : 'outside'}`}
              onClick={() => onDayClick(day)}
            >
              {format(day, 'd')}
              {events.filter(event => event.date === format(day, 'yyyy-MM-dd')).map(event => (
                <div key={event.id} className="event">
                  {event.description}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;