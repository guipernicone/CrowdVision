import React, { Component } from 'react';
import { NavbarStyle } from './NavbarStyle';
import { Link } from 'react-router-dom';
import { logoutUser } from 'Service/LoginService';

class Navbar extends Component {
    render() {
        return (
            <NavbarStyle>
                <div className= "navBarGroup1">
                    <Link to={'/'} ><div className="navButton">Home</div></Link>
                    <Link to={'/recent-detections'} ><div className="navButton">Detecções</div></Link>
                    <Link to={'/history'} ><div className="navButton">Histórico</div></Link>
                    <Link to={'/statistics'} ><div className="navButton">Estatísticas</div></Link>
                    {/* <div className="navButton">Câmeras</div> */}
                </div>
                <div className="navBarGroup2">
                    <div className="navButton">Perfil</div>
                    <Link to={'/login'} onClick={logoutUser}><div className="navButton">Sair</div></Link>
                </div>
            </NavbarStyle>
        );
    }
}

export default Navbar;