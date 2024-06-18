import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const LocalFileManager = () => {
    const [localFiles, setLocalFiles] = useState([]);

    const openFileDialog = async () => {
        const files = await window.electron.openFileDialog();
        setLocalFiles(files);
    };

    const openFile = (filePath) => {
        window.electron.openFile(filePath);
    };

    return (
        <div className="container mt-4">
            <h2>Local Files</h2>
            <button className="btn btn-primary" onClick={openFileDialog}>Open Files</button>
            <ul className="list-group mt-3">
                {localFiles.map((file, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {file}
                        <button className="btn btn-sm btn-primary" onClick={() => openFile(file)}>Open</button>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
};

export default LocalFileManager;
