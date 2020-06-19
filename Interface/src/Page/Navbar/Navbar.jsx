import React, { Component } from 'react';

import { NavbarStyle } from './NavbarStyle';
// import CookieService from 'Service/CookieService';

class Navbar extends Component {
    // constructor(props) {
    //     let cs = new CookieService();
    //     let user = cs.get('login').user
    //     this.userName = user.name
    // }
    render() {
        return (
            <NavbarStyle>
                <div className= "navBarGroup1">
                    <div className="navButton">Home</div>
                    <div className="navButton">Recentes</div>
                    <div className="navButton">Historico</div>
                    <div className="navButton">Estatisticas</div>
                    <div className="navButton">Cameras</div>
                </div>
                <div className="navBarGroup2">
                    <div className="navButton">Perfil</div>
                    <div className="navButton">Sair</div>
                </div>
            </NavbarStyle>
        );
    }
}

export default Navbar;