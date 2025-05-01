import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link to="/">Candidate Search</Link>
        </li>
        <li>
          <Link to="/saved-candidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;