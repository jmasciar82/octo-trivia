import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const FileManager = () => {
    const [files, setFiles] = useState([]);
    const [speakerName, setSpeakerName] = useState('');
    const [speakerEmail, setSpeakerEmail] = useState('');
    const [room, setRoom] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [filterName, setFilterName] = useState('');
    const [filterRoom, setFilterRoom] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStartTime, setFilterStartTime] = useState('');
    const [filterEndTime, setFilterEndTime] = useState('');

    const fileInputRefs = useRef({});

    useEffect(() => {
        fetchFiles();
    }, []);

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('speakerName', speakerName.toUpperCase());
        formData.append('speakerEmail', speakerEmail.toUpperCase());
        formData.append('room', room.toUpperCase());
        formData.append('date', date);
        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            const res = await axios.post(`${backendURL}/api/files/upload`, formData);
            fetchFiles();
            toast.success('File uploaded successfully!');
            console.log('File uploaded successfully:', res.data.url);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file.');
        }
    };

    const replaceFile = async (fileId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            const res = await axios.put(`${backendURL}/api/files/replace/${fileId}`, formData);
            fetchFiles();
            toast.success('File replaced successfully!');
            console.log('File replaced successfully:', res.data.url);
        } catch (error) {
            console.error('Error replacing file:', error);
            toast.error('Error replacing file.');
        }
    };

    const deleteFile = async (fileId) => {
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            await axios.delete(`${backendURL}/api/files/${fileId}`);
            fetchFiles();
            toast.success('File deleted successfully!');
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error('Error deleting file.');
        }
    };

    const updateFileDetails = async (fileId, updatedDetails) => {
        const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        try {
            await axios.put(`${backendURL}/api/files/update/${fileId}`, updatedDetails);
            fetchFiles();
            toast.success('File details updated successfully!');
        } catch (error) {
            console.error('Error updating file details:', error);
            toast.error('Error updating file details.');
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
                    name: filterName.toUpperCase(),
                    room: filterRoom.toUpperCase(),
                    date: filterDate,
                    startTime: filterStartTime,
                    endTime: filterEndTime
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
        setFilterName('');
        setFilterRoom('');
        setFilterDate('');
        setFilterStartTime('');
        setFilterEndTime('');
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

    const handleEdit = (file) => {
        setSpeakerName(file.speaker.name);
        setSpeakerEmail(file.speaker.email);
        setRoom(file.room);
        setDate(file.date.slice(0, 10));
        setStartTime(file.startTime);
        setEndTime(file.endTime);
        setFiles((prevFiles) => prevFiles.map((f) => (f._id === file._id ? { ...f, isEditing: true } : f)));
    };

    const handleSave = (fileId) => {
        updateFileDetails(fileId, {
            speakerName: speakerName.toUpperCase(),
            speakerEmail: speakerEmail.toUpperCase(),
            room: room.toUpperCase(),
            date,
            startTime,
            endTime
        });
        setFiles((prevFiles) => prevFiles.map((f) => (f._id === fileId ? { ...f, isEditing: false } : f)));
        setSpeakerName('');
        setSpeakerEmail('');
        setRoom('');
        setDate('');
        setStartTime('');
        setEndTime('');
    };

    const handleCancel = (fileId) => {
        setFiles((prevFiles) => prevFiles.map((f) => (f._id === fileId ? { ...f, isEditing: false } : f)));
        setSpeakerName('');
        setSpeakerEmail('');
        setRoom('');
        setDate('');
        setStartTime('');
        setEndTime('');
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <h2>Upload File</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        if (form.fileUpload.files.length > 0) {
                            uploadFile(form.fileUpload.files[0]);
                        } else {
                            toast.error('Please select a file to upload.');
                        }
                    }} autoComplete="off">
                        <div className="form-group">
                            <input name="fileUpload" type="file" className="form-control" required autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <input
                                name="speakerNameUpload"
                                type="text"
                                placeholder="Speaker Name"
                                value={speakerName}
                                onChange={(e) => setSpeakerName(e.target.value.toUpperCase())}
                                required
                                autoComplete="off"
                                className="form-control"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="speakerEmailUpload"
                                type="email"
                                placeholder="Speaker Email"
                                value={speakerEmail}
                                onChange={(e) => setSpeakerEmail(e.target.value.toUpperCase())}
                                required
                                autoComplete="off"
                                className="form-control"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="roomUpload"
                                type="text"
                                placeholder="Room"
                                value={room}
                                onChange={(e) => setRoom(e.target.value.toUpperCase())}
                                required
                                autoComplete="off"
                                className="form-control"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="dateUpload"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="startTimeUpload"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="endTimeUpload"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h2>Filter Files</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchFilteredFiles();
                    }} autoComplete="off">
                        <div className="form-group">
                            <input
                                name="nameFilter"
                                type="text"
                                placeholder="Name"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value.toUpperCase())}
                                autoComplete="off"
                                className="form-control"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="roomFilter"
                                type="text"
                                placeholder="Room"
                                value={filterRoom}
                                onChange={(e) => setFilterRoom(e.target.value.toUpperCase())}
                                autoComplete="off"
                                className="form-control"
                                style={{ textTransform: 'uppercase' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="dateFilter"
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="startTimeFilter"
                                type="time"
                                value={filterStartTime}
                                onChange={(e) => setFilterStartTime(e.target.value)}
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="endTimeFilter"
                                type="time"
                                value={filterEndTime}
                                onChange={(e) => setFilterEndTime(e.target.value)}
                                autoComplete="off"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Filter</button>
                    </form>
                </div>
            </div>
            <h2 className="mt-4">Files</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Speaker Name</th>
                        <th>Speaker Email</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file._id}>
                            <td>{file.originalFilename}</td>
                            <td>{file.speaker.name}</td>
                            <td>{file.speaker.email}</td>
                            <td>{file.room}</td>
                            <td>{formatDate(file.date)}</td>
                            <td>{formatTime(file.startTime)} - {formatTime(file.endTime)}</td>
                            <td className='botones-accion'>
                                <a href={file.path} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">Download</a>
                                {file.isEditing ? (
                                    <>
                                        <button className="btn btn-sm btn-success" onClick={() => handleSave(file._id)}>Save</button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleCancel(file._id)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(file)}>Edit</button>
                                        <br></br>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteFile(file._id)}>Delete</button>
                                    </>
                                )}
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={ref => fileInputRefs.current[file._id] = ref}
                                    onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            replaceFile(file._id, e.target.files[0]);
                                        }
                                    }}
                                />
                                <button className="btn btn-sm btn-warning" onClick={() => fileInputRefs.current[file._id].click()}>Replace</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default FileManager;
