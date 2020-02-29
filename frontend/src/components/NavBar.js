import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';

export default class NavBar extends Component{
    render() {
        return(
            <Navbar expand="lg" fixed = "top" className = "navbar">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
            </Navbar>
        )
    }
};