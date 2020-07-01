import React from "react";

import Card from "./CardItem.js";

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
}));

const CardCollection = ({ files, icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          alignItems="flex-start"
          justify="space-between"
          spacing={3}
        >
          {files.map((file) => {
            return (
              <Grid item>
                <Card file={file} icon={icon} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default CardCollection;
