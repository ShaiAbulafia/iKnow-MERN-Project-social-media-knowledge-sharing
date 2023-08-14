import React from "react";
import { node } from "prop-types";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="lg">{children}</Container>
      </Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
