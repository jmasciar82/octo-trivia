import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileManager = () => {
    const [files, setFiles] = useState([]);
    const [speakerName, setSpeakerName] = useState('');
    const [speakerEmail, setSpeakerEmail] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('speakerName', speakerName);
        formData.append('speakerEmail', speakerEmail);
        formData.append('room', room);
        formData.append('date', date);
        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            await axios.post(`${backendURL}/api/files/upload`, formData);
            fetchFiles();
            toast.success('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file.');
        }
    };

    const fetchFiles = async () => {
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            const response = await axios.get(`${backendURL}/api/files`);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            toast.error('Error fetching files.');
        }
    };

    const fetchFilteredFiles = async () => {
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            const response = await axios.get(`${backendURL}/api/files`, {
                params: {
                    room,
                    date,
                    startTime,
                    endTime
                }
            });
            setFiles(response.data);
            resetFilterFields();
        } catch (error) {
            console.error('Error fetching filtered files:', error);
            toast.error('Error fetching filtered files.');
        }
    };

    const resetFilterFields = () => {
        setRoom('');
        setDate('');
        setStartTime('');
        setEndTime('');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <div>
            <h2>Upload File</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                uploadFile(form.file.files[0]);
            }}>
                <input name="file" type="file" required />
                <input
                    name="speakerName"
                    type="text"
                    placeholder="Speaker Name"
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                    required
                />
                <input
                    name="speakerEmail"
                    type="email"
                    placeholder="Speaker Email"
                    value={speakerEmail}
                    onChange={(e) => setSpeakerEmail(e.target.value)}
                    required
                />
                <input
                    name="room"
                    type="text"
                    placeholder="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required
                />
                <input
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    name="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <input
                    name="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
                <button type="submit">Upload</button>
            </form>

            <h2>Filter Files</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchFilteredFiles();
            }}>
                <input
                    name="roomFilter"
                    type="text"
                    placeholder="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <input
                    name="dateFilter"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    name="startTimeFilter"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    name="endTimeFilter"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <button type="submit">Filter</button>
            </form>

            <h2>Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id}>
                        {file.speaker.name} ({file.speaker.email}) - {file.room} - {file.originalFilename} -  {formatTime(file.startTime)}-{formatTime(file.endTime)}
                        <a href={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/files/${file._id}`} target="_blank" rel="noopener noreferrer">Download</a>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default FileManager;
