import React from 'react';
import '../styles/EventList.css'; // Import the CSS file
import DateRangeIcon from '@mui/icons-material/DateRange';

const EventList = ({ events, onDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <div>
              <div className='description'>
                {event.description}
              </div>
              <div className='date'>
                <DateRangeIcon style={{ width: "20px" }} />{event.date}
              </div>
            </div>
            <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;