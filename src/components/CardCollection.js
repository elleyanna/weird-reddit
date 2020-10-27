import React from "react";

import CardItem from "./CardItem.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "120px",
    paddingBottom: "60px",
  },
}));

const CardCollection = ({ files, icon }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        spacing={3}
      >
        {files.map((file, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <CardItem file={file} icon={icon} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardCollection;
