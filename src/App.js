import React from "react";

import AppBarTop from "./components/AppBarTop.js";
import Card from "./components/Card.js";
import renAndStimpy from "./assets/renAndStimpy.png";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "60px",
    marginTop: "60px",
    marginBottom: "60px",
  },
  container: {
    backgroundImage: `url(${renAndStimpy})`,
    position: "absolute",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    overflow: "auto",
    zIndex: "-1",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <AppBarTop />
        <div className={classes.root}>
          <Container>
            <Grid
              container
              alignItems="flex-start"
              justify="space-between"
              spacing={3}
            >
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
              <Grid item>
                <Card />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
