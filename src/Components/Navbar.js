import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../Context/CurrentUser';

const Navbar = props => {
    const [currentUser] = useContext(CurrentUserContext)

    const logOut = () => {
        localStorage.removeItem('id')
        props.history.push('/login')
    }

    return(
        <div className="header">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <Link to ='/' className="navbar-brand">Style Me</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown active">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Browse
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to='/tops' className="dropdown-item">Tops</Link> 
                            <Link to='/bottoms' className="dropdown-item">Bottoms</Link> 
                            <Link to='/shoes' className="dropdown-item">Shoes</Link> 
                            <div className="dropdown-divider"></div>
                            <Link to='/outfits' className="dropdown-item">Outfits</Link> 
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to='/outfits/new' className="nav-link">Create Outfit</Link>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <span className="navbar-text">Hi {currentUser.name}!</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={logOut}>Log Out</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar



