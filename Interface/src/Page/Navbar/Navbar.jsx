import React, { Component } from 'react';
import { NavbarStyle } from './NavbarStyle';
import { Link } from 'react-router-dom';
import { logoutUser } from 'Service/LoginService';
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    const verifyStatisticsPage = () => {
        if (location.pathname == '/statistics') {
            window.location.reload()
        }
    }
    return (
        <NavbarStyle>
            <div className= "navBarGroup1">
                {/* <Link to={'/'} ><div className="navButton">Home</div></Link> */}
                {/* <Link to={'/recent-detections'} ><div className="navButton">Detecções</div></Link> */}
                {console.log(Math.random())}
                <Link to={'/'}><div className="navButton">Detecções</div></Link>
                <Link to={'/history'} ><div className="navButton">Histórico</div></Link>
                <Link to={'/statistics'} onClick={verifyStatisticsPage}><div className="navButton">Estatísticas</div></Link>
                <Link to={'/camera'} ><div className="navButton">Câmeras</div></Link>
            </div>
            <div className="navBarGroup2">
                <Link to={'/profile'} ><div className="navButton">Perfil</div></Link>
                <Link to={'/login'} onClick={logoutUser}><div className="navButton">Sair</div></Link>
            </div>
        </NavbarStyle>
    );
}

export default Navbar;