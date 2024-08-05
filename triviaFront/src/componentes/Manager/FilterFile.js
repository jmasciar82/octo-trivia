import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const FileFilter = () => {
    const [files, setFiles] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterRoom, setFilterRoom] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStartTime, setFilterStartTime] = useState('');
    const [filterEndTime, setFilterEndTime] = useState('');
    const [conflicts, setConflicts] = useState([]);
    const [downloadQueue, setDownloadQueue] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const backendURL = process.env.NODE_ENV === 'production' ?
            `${process.env.REACT_APP_PROD_BACKEND_URL}` :
            `http://localhost:5000`;
        try {
            const response = await axios.get(`${backendURL}/api/files`);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            toast.error('Error fetching files.');
        }
    };

    const fetchFilteredFiles = async () => {
        const backendURL = process.env.NODE_ENV === 'production' ?
            `${process.env.REACT_APP_PROD_BACKEND_URL}` :
            `http://localhost:5000`;
        try {
            const response = await axios.get(`${backendURL}/api/files`, {
                params: {
                    name: filterName.toUpperCase(),
                    email: filterEmail.toUpperCase(),
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
        setFilterEmail('');
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
        return `${day}-${month}-${year}`;
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}${minutes}`;
    };

    const getFileExtension = (filename) => {
        return filename.substring(filename.lastIndexOf('.') + 1);
    };

    const addToDownloadList = (file) => {
        const extension = getFileExtension(file.originalFilename);
        const fileName = `${file.speaker.name}_${file.speaker.email}_${file.room}_${formatDate(file.date)}_${formatTime(file.startTime)}.${extension}`;

        // Verificar si hay conflicto por email en la lista de descargas
        const conflictFile = selectedFiles.find(f => f.speaker.email === file.speaker.email && f.originalFilename !== file.originalFilename);
        
        if (conflictFile) {
            setConflicts(prevConflicts => [...prevConflicts, { file, fileName }]);
        } else {
            setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, file]);
        }
    };

    const removeFromDownloadList = (fileId) => {
        setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(file => file._id !== fileId));
    };

    const downloadAllFiles = async () => {
        const downloadedFiles = JSON.parse(localStorage.getItem('downloadedFiles')) || {};
        const conflicts = [];

        for (const file of selectedFiles) {
            const extension = getFileExtension(file.originalFilename);
            const fileName = `${file.speaker.name}_${file.speaker.email}_${file.room}_${formatDate(file.date)}_${formatTime(file.startTime)}.${extension}`;

            if (downloadedFiles[fileName]) {
                conflicts.push({ file, fileName });
            } else {
                downloadQueue.push({ file, fileName });
            }
        }

        if (conflicts.length > 0) {
            setConflicts(conflicts);
        } else {
            await processDownloadQueue(downloadQueue);
        }
    };

    const handleConflict = async (action, conflict) => {
        const { file, fileName } = conflict;

        if (action === 'replace' || action === 'copy') {
            await downloadFile(file, fileName);
        }

        if (action === 'copy') {
            let copyNumber = 1;
            let newFileName;
            const extension = getFileExtension(file.originalFilename);
            do {
                newFileName = `${file.speaker.name}_${file.speaker.email}_${file.room}_${formatDate(file.date)}_${formatTime(file.startTime)}_copy${copyNumber}.${extension}`;
                copyNumber++;
            } while (localStorage.getItem('downloadedFiles')[newFileName]);

            await downloadFile(file, newFileName);
        }

        const remainingConflicts = conflicts.filter(c => c.file._id !== conflict.file._id);
        setConflicts(remainingConflicts);

        if (remainingConflicts.length === 0) {
            await processDownloadQueue(downloadQueue);
        }
    };

    const downloadFile = async (file, fileName) => {
        const response = await fetch(file.path);
        if (!response.ok) {
            throw new Error(`Could not fetch file ${file.path}`);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        const downloadedFiles = JSON.parse(localStorage.getItem('downloadedFiles')) || {};
        downloadedFiles[fileName] = true;
        localStorage.setItem('downloadedFiles', JSON.stringify(downloadedFiles));
    };

    const processDownloadQueue = async (queue) => {
        for (const item of queue) {
            await downloadFile(item.file, item.fileName);
        }
        setDownloadQueue([]);
    };

    return (
        <div className="container mt-4">
            <Link to='/fileUpload' style={{ display: 'flex', justifyContent: 'left' }}>
            <Button variant="primary">Upload Files</Button></Link>

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
                        name="emailFilter"
                        type="text"
                        placeholder="Email"
                        value={filterEmail}
                        onChange={(e) => setFilterEmail(e.target.value.toUpperCase())}
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
                            <td>
                                <a href={file.path} target="_blank" rel="noopener noreferrer">
                                    {file.originalFilename}
                                </a>
                            </td>
                            <td>{file.speaker.name}</td>
                            <td>{file.speaker.email}</td>
                            <td>{file.room}</td>
                            <td>{formatDate(file.date)}</td>
                            <td>{formatTime(file.startTime)} - {formatTime(file.endTime)}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => addToDownloadList(file)}>Add to Download List</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="mt-4">Download List</h2>
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
                    {selectedFiles.map(file => (
                        <tr key={file._id}>
                            <td>
                                <a href={file.path} target="_blank" rel="noopener noreferrer">
                                    {file.originalFilename}
                                </a>
                            </td>
                            <td>{file.speaker.name}</td>
                            <td>{file.speaker.email}</td>
                            <td>{file.room}</td>
                            <td>{formatDate(file.date)}</td>
                            <td>{formatTime(file.startTime)} - {formatTime(file.endTime)}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => removeFromDownloadList(file._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={downloadAllFiles} className="btn btn-success mt-4">Download All Selected Files</button>
            {conflicts.length > 0 && (
                <div className="mt-4">
                    <h3>File Conflicts</h3>
                    {conflicts.map(conflict => (
                        <div key={conflict.file._id} className="alert alert-warning">
                            <p>Conflict for file: {conflict.fileName}</p>
                            <button className="btn btn-primary" onClick={() => handleConflict('replace', conflict)}>Replace</button>
                            <button className="btn btn-secondary" onClick={() => handleConflict('omit', conflict)}>Omit</button>
                            <button className="btn btn-success" onClick={() => handleConflict('copy', conflict)}>Copy</button>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default FileFilter;
