import { Candidate } from "../interfaces/Candidate.interface";

const STORAGE_KEY = "savedCandidates";

export const getSavedCandidates = (): Candidate[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCandidate = (candidate: Candidate): void => {
  const existing = getSavedCandidates();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, candidate]));
};

export const removeCandidate = (login: string): void => {
  const filtered = getSavedCandidates().filter(c => c.login !== login);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
