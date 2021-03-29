import "./../App.css";
import Context from "./../Context";
import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  Input,
  NavbarText,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { isLoggedIn } = useContext(Context);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          Fan Art
        </NavbarBrand>
        <Nav className="ml-auto ">
          <NavItem>
            <InputGroup size="sm" id="search">
              <InputGroupAddon addonType="prepend">
                <BsSearch
                  style={{ color: "white", padding: "2px" }}
                  size="2rem"
                />
              </InputGroupAddon>
              <Input placeholder="Search" />
            </InputGroup>
          </NavItem>
        </Nav>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavbarText>
                <Link className="Alk">Components</Link>
              </NavbarText>
            </NavItem>
            <NavItem>
              <NavbarText>
                {isLoggedIn || (
                  <>
                    <FiLogIn
                      style={{ color: "white", padding: "2px" }}
                      size="1.1rem"
                    />

                    <Link to="/login" className="Alk">
                      Login / Register
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <FiLogOut
                      style={{ color: "white", padding: "2px" }}
                      size="1.1rem"
                    />
                    <Link to="/logout" className="Alk">
                      {"Logout"}
                    </Link>
                  </>
                )}
              </NavbarText>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
