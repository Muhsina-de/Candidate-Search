// src/components/SavedCandidates.tsx
import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import { getSavedCandidates, removeCandidate } from '../utlis/localStorage';




// Add a new style object:
const cellTruncate: React.CSSProperties = {

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};


const tableContainer: React.CSSProperties = {
  width: '100%',
  overflowX: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thTdStyle: React.CSSProperties = {
  padding: '12px 8px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
};



const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '16px',
  color: '#fff',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '24px',
  fontSize: '32px',
};




const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    setSavedCandidates(getSavedCandidates());
  }, []);

  const handleRemove = (login: string) => {
    const updated = savedCandidates.filter(c => c.login !== login);
    setSavedCandidates(updated);
    removeCandidate(login);
  };

  return (

    <div style={pageStyle}>
      <h1 style={titleStyle}>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>
          No candidates have been saved yet.
        </p>
      ) : (
        <div style={tableContainer}>
          <table style={tableStyle}>
            <thead style={headerStyle}>
              <tr>
                {['Image', 'Name', 'Location', 'Email', 'Company', 'Bio', 'Actions'].map(col => (
                  <th key={col} style={thTdStyle}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {savedCandidates.map(candidate => (
                <tr key={candidate.login}>
                  <td style={thTdStyle}>
                    <img
                      src={candidate.avatar_url}
                      alt={`Avatar of ${candidate.login}`}
                      width={48}
                      height={48}
                      style={{ borderRadius: '20%', border: "2px solid white" }}
                    />
                  </td>
                  <td style={{ ...thTdStyle, ...cellTruncate }}><span title={`${candidate.name} (${candidate.login})`} >{candidate.name || "—"}</span> <div style={{ fontStyle: "italic" }}>({candidate.login})</div></td>



                  <td style={{ ...thTdStyle, ...cellTruncate }}><span title={candidate.location || '—'}>{candidate.location || '—'}</span></td>
                  <td style={{ ...thTdStyle, ...cellTruncate }}><span title={candidate.email || '—'}>{candidate.email || '—'}</span></td>
                  <td style={{ ...thTdStyle, ...cellTruncate }}><span title={candidate.company || '—'}>{candidate.company || '—'}</span></td>
                  <td style={{ ...thTdStyle, ...cellTruncate }}><span title={candidate.bio || '—'}>{candidate.bio || '—'}</span></td>
                  <td style={{ ...thTdStyle, ...cellTruncate }}>
                    <button
                      onClick={() => handleRemove(candidate.login)}

                    >
                      −
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
