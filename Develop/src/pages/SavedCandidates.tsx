import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface'; // Import the interface
import { getSavedCandidates, removeCandidate } from '../utlis/localStorage'; // Import utils for localStorage handling

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  useEffect(() => {
    const storedCandidates = getSavedCandidates(); // Load from utility
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove a candidate from the saved list
  const handleRemoveCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    removeCandidate(login); // Call the utility to update localStorage
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        savedCandidates.map((candidate) => (
          <div key={candidate.login}>
            <img src={candidate.avatar_url} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'Not Available'}</p>
            <p>Email: {candidate.email || 'Not Available'}</p>
            <p>Company: {candidate.company || 'Not Available'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
            <button onClick={() => handleRemoveCandidate(candidate.login)}>-</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
