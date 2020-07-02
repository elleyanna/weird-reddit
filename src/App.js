import React, { useState, useEffect } from "react";

import AppBarTop from "./components/AppBarTop.js";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardCollection from "./components/CardCollection.js";
import Typography from "@material-ui/core/Typography";

import renAndStimpy from "./assets/renAndStimpy.png";
import ren from "./assets/ren.jpg";
import theEnd from "./assets/theEnd.gif";
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
    alignItems: "center",
    marginTop: theme.spacing(8),
    height: "100%",
  },
  spinner: {
    width: "65%",
    height: "65%",
  },
  theEndContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(6),
  },
  theEnd: {
    width: "400px",
  },
}));

const App = () => {
  const classes = useStyles();

  const redditUrlPath = "https://www.reddit.com/r/";

  const subredditArray = [
    "CreepyArt",
    "UnusualArt",
    "alternativeart",
    "wtfart",
    "atbge",
    "wimmelbilder",
    "surrealmemes",
    "AnimalsWithoutNecks",
  ];

  const sortArray = ["hot", "top", "new", "rising"];

  const [selectedSubreddit, setSelectedSubreddit] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState({
    currentSubreddit:
      selectedSubreddit === "" ? subredditArray.join("+") : selectedSubreddit,
    sort: selectedSort === "" ? "hot" : selectedSort,
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

    let currentSort;
    if (selectedSort === "") {
      currentSort = items.sort;
    } else {
      currentSort = selectedSort;
    }

    fetch(redditUrlPath + currentSubreddit + "/" + currentSort + ".json")
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
    let currentSort;
    if (selectedSort === "") {
      currentSort = items.sort;
    } else {
      currentSort = selectedSort;
    }

    fetch(
      redditUrlPath +
        currentSubreddit +
        "/" +
        currentSort +
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
    let currentSort;
    if (selectedSort === "") {
      currentSort = items.sort;
    } else {
      currentSort = selectedSort;
    }

    fetch(
      redditUrlPath +
        currentSubreddit +
        "/" +
        currentSort +
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
    fetch(redditUrlPath + sub + "/" + items.sort + ".json")
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
  const changeSort = (sort) => {
    setIsLoading(true);
    setSelectedSort(sort);
    let currentSubreddit;
    if (selectedSubreddit === "") {
      currentSubreddit = items.currentSubreddit;
    } else {
      currentSubreddit = selectedSubreddit;
    }
    setItems({
      ...items,
      files: [],
      currentSubreddit: currentSubreddit,
      sort: sort,
    });
    fetch(redditUrlPath + currentSubreddit + "/" + sort + ".json")
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
        sortOptions={sortArray}
        onSubredditMenuItemSelected={changeSubreddit}
        onSortOptionSelected={changeSort}
      />
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <img src={spinner} className={classes.spinner} />
        </div>
      ) : (
        <div>
          {items.files.length > 0 ? (
            <CardCollection files={items.files} icon={ren} />
          ) : (
            <div className={classes.theEndContainer}>
              <img classes={classes.theEnd} src={theEnd} />
            </div>
          )}

          <div className={classes.buttonContainer}>
            {items.page > 1 && (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={prevPage()}
              >
                prev
              </Button>
            )}
            <Typography variant="h3" className={classes.pageNumber}>
              <Box fontFamily="Monospace" m={1}>
                Page {items.page}
              </Box>
            </Typography>

            {items.files.length > 0 && (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={nextPage()}
              >
                next
              </Button>
            )}
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
