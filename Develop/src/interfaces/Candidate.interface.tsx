// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    bio: string;
    id: number; // Unique identifier for the candidate
    name: string; // Full name of the candidate
    username: string; // GitHub username
    avatar_url: string; // URL to the candidate's avatar image
    location: string | null; // Candidate's location (can be null if not provided)
    email: string | null; // Candidate's email (can be null if not provided)
    html_url: string; // GitHub profile URL
    company: string | null; // Candidate's company (can be null if not provided)
  }
