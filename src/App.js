import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        // Load and parse the CSV file
        Papa.parse('/LawsistViewMetadata.csv', {
            download: true,
            complete: (results) => {
                const data = results.data;
                const formattedComplaints = [];

                // Process each odd/even column pair to create a complaint card
                for (let i = 0; i < data[0].length; i += 2) {
                    formattedComplaints.push({
                        title: data[0][i],                     // Complaint title
                        description: data[1][i],               // Complaint description
                        links: {
                            folder: data[3][i + 1] || "",      // Full Folder link
                            docx: data[4][i + 1] || "",        // Complaint docx link
                            exhibit: data[5][i + 1] || "",     // Exhibit A link
                            trackChanges: data[6][i + 1] || "",// Track Changes link
                            sourceData: data[7][i + 1] || ""   // Source Data link
                        }
                    });
                }

                setComplaints(formattedComplaints);
            }
        });
    }, []);

    return (
        <div className="App">
            <img src="/Logo.png" alt="Logo" className="logo" />
            <h1>Lawsist View</h1>
            <div className="complaint-container">
                {complaints.map((complaint, index) => (
                    <div className="complaint-card" key={index}>
                        <h2>{complaint.title}</h2>
                        <p>{complaint.description}</p>
                        <ul>
                            {complaint.links.folder && <li><a href={complaint.links.folder} target="_blank" rel="noopener noreferrer">File Link (Folder)</a></li>}
                            {complaint.links.docx && <li><a href={complaint.links.docx} target="_blank" rel="noopener noreferrer">File Link (Docx)</a></li>}
                            {complaint.links.exhibit && <li><a href={complaint.links.exhibit} target="_blank" rel="noopener noreferrer">File Link (Exhibit)</a></li>}
                            {complaint.links.trackChanges && <li><a href={complaint.links.trackChanges} target="_blank" rel="noopener noreferrer">File Link (Track Changes)</a></li>}
                            {complaint.links.sourceData && <li><a href={complaint.links.sourceData} target="_blank" rel="noopener noreferrer">File Link (Source Data)</a></li>}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
