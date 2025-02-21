import { Link } from 'react-router-dom';
import '../styles/index.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="header-title">League United</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/leagues">Leagues</Link>
                    <Link to="/teams">Teams</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;