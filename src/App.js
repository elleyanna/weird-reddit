import React, { useState, useEffect } from "react";

import AppBarTop from "./components/AppBarTop.js";
import CardCollection from "./components/CardCollection.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import renAndStimpy from "./assets/renAndStimpy.png";
import ren from "./assets/ren.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  renAndStimpy: {
    position: "fixed",
    left: 0,
    bottom: 0,
    zIndex: "-1",
    height: "100%",
    width: "auto",
    minWidth: "100%",
    opacity: 0.7,
  },
}));

const App = () => {
  const classes = useStyles();

  const redditUrl = "https://www.reddit.com/r/";

  const subredditArray = [
    "CreepyArt",
    "UnusualArt",
    "alternativeart",
    "wtfart",
  ];

  const [selectedSubreddit, setSelectedSubreddit] = useState("");

  const [items, setItems] = useState({
    currentSubreddit:
      selectedSubreddit === "" ? subredditArray.join("+") : selectedSubreddit,
    // sort: "hot",
    files: [],
    after: null,
    before: null,
    page: 1,
  });

  useEffect(() => {
    let currentSubreddit;
    if (selectedSubreddit === "") {
      currentSubreddit = items.currentSubreddit;
    } else {
      currentSubreddit = selectedSubreddit;
    }

    fetch(redditUrl + items.currentSubreddit + "/" + "hot" + ".json")
      .then((res) => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        setItems({
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        });
      });
  }, []);

  const nextPage = () => () => {
    let currentSubreddit;
    if (selectedSubreddit === "") {
      currentSubreddit = items.currentSubreddit;
    } else {
      currentSubreddit = selectedSubreddit;
    }

    fetch(
      redditUrl +
        currentSubreddit +
        "/" +
        "hot" +
        ".json?count=" +
        items.page * 5 +
        "&after=" +
        items.after
    )
      .then((res) => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        setItems({
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
          page: items.page + 1,
        });
      });
  };

  const prevPage = () => () => {
    let currentSubreddit;
    if (selectedSubreddit === "") {
      currentSubreddit = items.currentSubreddit;
    } else {
      currentSubreddit = selectedSubreddit;
    }

    fetch(
      redditUrl +
        currentSubreddit +
        "/" +
        "hot" +
        ".json?count=" +
        items.page / 5 +
        "&after=" +
        items.before
    )
      .then((res) => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        let newState = {
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        };
        if (items.page > 1) {
          newState.page = items.page - 1;
        }
        setItems(newState);
      });
  };

  const changeSubreddit = (sub) => {
    setSelectedSubreddit(sub);
    setItems({
      ...items,
      files: [],
      currentSubreddit: sub,
      // page: 1,
    });
    fetch(redditUrl + sub + "/" + "hot" + ".json")
      .then((res) => res.json())
      .then((data) => {
        setItems({
          ...items,
          page: 1,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        });
        window.scrollTo(0, 0);
      });
  };

  return (
    <div className={classes.container}>
      <AppBarTop
        subreddits={subredditArray}
        onMenuItemSelected={changeSubreddit}
      />

      <CardCollection files={items.files} icon={ren} />
      {items.page > 1 && <Button onClick={prevPage()}>Prev</Button>}

      <Typography>Page {items.page}</Typography>
      <Button onClick={nextPage()}>Next</Button>
      <img
        alt="background"
        className={classes.renAndStimpy}
        src={renAndStimpy}
      />
    </div>
  );
};

export default App;
