import React, { useState, useEffect } from "react";

import AppBarTop from "./components/AppBarTop.js";
import CardCollection from "./components/CardCollection.js";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import renAndStimpy from "./assets/renAndStimpy.png";
import ren from "./assets/ren.jpg";
import spinner from "./assets/eyeball.gif";
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
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(8),
  },
  pageNumber: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  spinner: {
    width: "60%",
    height: "60%",
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
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState({
    currentSubreddit:
      selectedSubreddit === "" ? subredditArray.join("+") : selectedSubreddit,
    sort: "hot",
    files: [],
    after: null,
    before: null,
    page: 1,
  });

  useEffect(() => {
    setIsLoading(true);
    let currentSubreddit;
    if (selectedSubreddit === "") {
      currentSubreddit = items.currentSubreddit;
    } else {
      currentSubreddit = selectedSubreddit;
    }

    fetch(redditUrl + currentSubreddit + "/" + items.sort + ".json")
      .then((res) => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        setItems({
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        });
        setIsLoading(false);
      });
  }, []);

  const nextPage = () => () => {
    setIsLoading(true);
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
        items.sort +
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
        setIsLoading(false);
      });
  };

  const prevPage = () => () => {
    setIsLoading(true);
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
        items.sort +
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
        setIsLoading(false);
      });
  };

  const changeSubreddit = (sub) => {
    setIsLoading(true);
    setSelectedSubreddit(sub);
    setItems({
      ...items,
      files: [],
      currentSubreddit: sub,
    });
    fetch(redditUrl + sub + "/" + items.sort + ".json")
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
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.container}>
      <AppBarTop
        subreddits={subredditArray}
        onMenuItemSelected={changeSubreddit}
      />

      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <img src={spinner} className={classes.spinner} />
        </div>
      ) : (
        <div>
          <CardCollection files={items.files} icon={ren} />
          <div className={classes.buttonContainer}>
            {items.page > 1 && (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={prevPage()}
              >
                Prev
              </Button>
            )}
            <Typography variant="h3" className={classes.pageNumber}>
              <Box fontFamily="Monospace" m={1}>
                Page {items.page}
              </Box>
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={nextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <img
        alt="background"
        className={classes.renAndStimpy}
        src={renAndStimpy}
      />
    </div>
  );
};

export default App;
