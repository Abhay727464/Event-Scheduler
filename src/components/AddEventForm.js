// import React, { useState } from 'react';
// import '../styles/EventForm.css';

// const AddEventForm = ({ onAddEvent }) => {
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAddEvent({ date, description });
//     setDate('');
//     setDescription('');
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Event description"
//           required
//         />
//         <button type="submit">Add Event</button>
//       </form>
//     </div>
//   );
// };

// export default AddEventForm;