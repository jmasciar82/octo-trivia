// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [speakerName, setSpeakerName] = useState('');
  const [speakerEmail, setSpeakerEmail] = useState('');
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('speakerName', speakerName.toUpperCase());
    formData.append('speakerEmail', speakerEmail.toUpperCase());
    formData.append('room', room.toUpperCase());
    formData.append('date', date);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);

    const backendURL = process.env.NODE_ENV === 'production' ?
      `${process.env.REACT_APP_PROD_BACKEND_URL}` :
      `http://localhost:5000`;
    
    try {
      const res = await axios.post(`${backendURL}/api/files/upload`, formData);
      toast.success('File uploaded successfully!');
      console.log('File uploaded successfully:', res.data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Upload File</h2>
          <div className="form-group">
            <label htmlFor="fileUpload">File</label>
            <input type="file" className="form-control" id="fileUpload" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label htmlFor="speakerName">Speaker Name</label>
            <input
              type="text"
              className="form-control"
              id="speakerName"
              placeholder="Speaker Name"
              value={speakerName}
              onChange={(e) => setSpeakerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="speakerEmail">Speaker Email</label>
            <input
              type="email"
              className="form-control"
              id="speakerEmail"
              placeholder="Speaker Email"
              value={speakerEmail}
              onChange={(e) => setSpeakerEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room</label>
            <input
              type="text"
              className="form-control"
              id="room"
              placeholder="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={uploadFile}>Upload File</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
