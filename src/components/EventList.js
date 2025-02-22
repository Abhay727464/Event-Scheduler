import React, { useState } from 'react';
import '../styles/EventList.css';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const EventList = ({ events, onDeleteEvent, onEditEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');

  const filteredEvents = events.filter(event =>
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setEditedDescription(event.description);
  };

  const handleSaveEdit = (eventId) => {
    onEditEvent(eventId, editedDescription);
    setEditingEventId(null);
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
  };

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>

      {/* Search Bar */}
      <TextField
        label="Search Events"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>
              {editingEventId === event.id ? (
                <div className='eventlist'>
                  <div>
                    <TextField
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      fullWidth
                      variant="outlined"

                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => handleSaveEdit(event.id)}
                      variant="contained"
                      color="primary"
                      style={{ background: "green", marginRight: "10px" }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Normal Mode: Show event details and edit/delete buttons
                <div className='eventlist'>
                  <div>
                    <div className="description">{event.description}</div>
                    <div className="date">
                      <DateRangeIcon style={{ width: '20px' }} />
                      {event.date}
                    </div>
                  </div>
                  <div className="actions">
                    <Button
                      onClick={() => handleEditClick(event)}
                      style={{ background: "#6f31f6", marginRight: "10px" }}
                      xstartIcon={<EditIcon style={{ color: "white" }} />}
                      variant="outlined" size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDeleteEvent(event.id)}
                      variant="outlined"
                      style={{ background: "#ff4357" }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-events">No Events Found</div>
      )}
    </div>
  );
};

export default EventList;