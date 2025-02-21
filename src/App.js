import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import { format, isValid } from 'date-fns';
import { Popover, TextField, Button } from '@mui/material';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleDayClick = (day) => {
    if (!day || !isValid(day)) {
      console.error('Invalid date:', day);
      return;
    }

    setSelectedDate(day);
    setAnchorEl(document.getElementById('calendar-day-' + format(day, 'd')));
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedDate(null);
    setEventDescription('');
  };

  const handleSaveEvent = () => {
    if (selectedDate && eventDescription) {
      const date = format(selectedDate, 'yyyy-MM-dd');
      handleAddEvent({ date, description: eventDescription });
    }
    handleClosePopover();
  };

  return (
    <div className="App">
      <h1 className="event-heading">Event Scheduler</h1>
      <Calendar events={events} onDayClick={handleDayClick} />
      <EventList events={events} onDeleteEvent={handleDeleteEvent} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className='popover'>
          <TextField
            label="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSaveEvent} sx={{ background: "#6f31f6", color: "white" }}>
            Save
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default App;