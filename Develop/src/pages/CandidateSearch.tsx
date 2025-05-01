import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { getSavedCandidates, saveCandidate } from '../utlis/localStorage';
import { FaExternalLinkAlt } from 'react-icons/fa'
import '../styles/CandidateSearch.css';



const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await searchGithub();
      console.log('SEARCH_CANDIDATES<', data);

      const savedLogins = getSavedCandidates().map(c => c.login);
      // const fresh = data.filter(u => !savedLogins.includes(u.login));
      // setCandidates(fresh);

      let fresh = data.filter(u => !savedLogins.includes(u.login));

      // If we got none (or too few), try one more time
      if (fresh.length === 0) {
        data = await searchGithub();
        fresh = data.filter(u => !savedLogins.includes(u.login));
      }

      if (fresh.length === 0) {
        // truly no new candidates
        setCandidates([]);
      } else {
        setCandidates(fresh);
      }


    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleSaveCandidate = () => {
    saveCandidate(candidates[currentIndex]);
    setCurrentIndex(idx => idx + 1);
  };

  const rejectCandidate = () => setCurrentIndex(idx => idx + 1);

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="loaderContainer">
        <p className="info" style={{ color: '#e74c3c' }}>Error: {error}</p>
        <button
          onClick={loadCandidates}
          className="button"
          style={{ background: '#3498db', marginTop: '1rem' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const isOut = currentIndex >= candidates.length;
  const current = candidates[currentIndex] || ({} as Candidate);

  return (
    <div className="container">
      <h1 className="title">Candidate Search</h1>

      {isOut ? (
        <p className="info" style={{ color: '#fff', fontSize: '1.25rem' }}>
          No more candidates available.
        </p>
      ) : (
        <div className='card'>
          <div className="innerCard">
            <img
              src={current.avatar_url}
              alt={current.login}
              className="avatar"
            />
            <h2 className="name">
              {current.name || "Un Known"} ({current.login})
            </h2>
            <p className="info">
              Location: {current.location || 'Not Available'}
            </p>
            <p className="info">
              Email: {current.email || 'Not Available'}
            </p>
            <p className="info">
              Company: {current.company || 'Not Available'}
            </p>

            {
              current?.html_url
                ? (
                  <p className="info">
                    <a
                      href={current.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Profile
                      <FaExternalLinkAlt
                        style={{ marginLeft: '0.25rem', verticalAlign: 'text-bottom' }}
                        aria-label="(opens in a new tab)"
                      />
                    </a>
                  </p>
                )
                : <p className="info">'Not Available'</p>

            }


          </div>
          <div className="controls">
            <button
              onClick={rejectCandidate}
              className="button reject"
            >
              <FaMinus />
            </button>
            <button
              onClick={handleSaveCandidate}
              className="button accept"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
