import React, { Fragment } from 'react'

import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './layouts/Home'
import ProductDetail from './layouts/ProductDetail'
import Navbar from './components/common/Navbar'



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }
}));


function App() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container >
        <div className={classes.root}>
          <Navbar />
          <section className={classes.content}>
            <Router>
              <Route path="/" component={Home} exact />
              <Route path="/product/:id" component={ProductDetail} />
            </Router>
          </section>
        </div>
      </Container>
    </Fragment>
  );
}

export default App;
