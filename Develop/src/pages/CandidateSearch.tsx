import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Import the interface
import { saveCandidate, getSavedCandidates } from '../utlis/localStorage'; // Add utility functions for localStorage

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch candidates from GitHub API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub(); // Fetch candidate data from API
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
    setSavedCandidates(getSavedCandidates()); // Load saved candidates from localStorage
  }, []);

  // Save the current candidate
  const handleSaveCandidate = () => {
    if (candidates[currentIndex]) {
      const candidateToSave = candidates[currentIndex];
      saveCandidate(candidateToSave); // Save to localStorage
      setSavedCandidates((prev) => [...prev, candidateToSave]);
      nextCandidate();
    }
  };

  // Skip the current candidate (Reject button)
  const rejectCandidate = () => {
    nextCandidate();
  };

  // Move to the next candidate
  const nextCandidate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Check if there are no more candidates
  const isOutOfCandidates = currentIndex >= candidates.length;

  return (
    <div>
      <h1>Candidate Search</h1>
      {isOutOfCandidates ? (
        <p>No more candidates available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={candidates[currentIndex]?.avatar_url} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              </td>
              <td>{candidates[currentIndex]?.login || 'Unknown'}</td>
              <td>{candidates[currentIndex]?.location || 'Not Available'}</td>
              <td>{candidates[currentIndex]?.email || 'Not Available'}</td>
              <td>{candidates[currentIndex]?.company || 'Not Available'}</td>
              <td>{candidates[currentIndex]?.bio || 'Not Available'}</td>
              <td>
                <button onClick={handleSaveCandidate}>Save</button>
                <button onClick={rejectCandidate}>Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidateSearch;
