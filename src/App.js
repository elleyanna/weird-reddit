import React, { useState, useEffect } from "react";

import AppBarTop from "./components/AppBarTop.js";
import CardCollection from "./components/CardCollection.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import renAndStimpy from "./assets/renAndStimpy.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${renAndStimpy})`,
    position: "absolute",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    overflow: "auto",
    zIndex: "-1",
  },
}));

// const [subredditIcon, setSubredditIcon] = useState({
//   icon: null,
// });

// const redditSubredditArtAPI = useEffect(() => {
//   fetch("https://www.reddit.com/r/CreepyArt/about.json")
//     .then((res) => res.json())
//     .then((data) => {
//       setSubredditIcon({
//         icon: data.data.icon_img,
//       });
//     });
// }, []);

const App = () => {
  const classes = useStyles();

  const redditUrl = "https://www.reddit.com/r/";

  const [items, setItems] = useState({
    currentSubreddit: "CreepyArt+UnusualArt+alternativeart+wtfart",
    sort: "hot",
    files: [],
    after: null,
    before: null,
    page: 1,
  });

  const initialFetch = useEffect(() => {
    fetch(redditUrl + items.currentSubreddit + "/" + items.sort + ".json")
      .then((res) => res.json())
      .then((data) => {
        setItems({
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        });
        window.scrollTo(0, 0);
      });
    // .catch(console.log);
  }, []);

  const nextPage = () => () => {
    window.scrollTo(0, 0);
    fetch(
      redditUrl +
        items.currentSubreddit +
        "/" +
        items.sort +
        ".json?count=" +
        items.page * 5 +
        "&after=" +
        items.after
    )
      .then((res) => res.json())
      .then((data) => {
        setItems({
          ...items,
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
          page: items.page + 1,
        });
        // window.scrollTo(0, 0);
      })
      .catch(console.log);
  };

  const prevPage = () => () => {
    window.scrollTo(0, 0);
    fetch(
      redditUrl +
        items.currentSubreddit +
        "/" +
        items.sort +
        ".json?count=" +
        ((items.page - 1) * 25 - 1) +
        "&after=" +
        items.before
    )
      .then((res) => res.json())
      .then((data) => {
        // window.scrollTo(0, 0);
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
      })
      .catch(console.log);
  };

  // const changeSubreddit = (sub) => () => {
  //   if (sub === null || "undefined") {
  //     sub = items.currentSubreddit;
  //   }
  //   setItems({
  //     ...items,
  //     files: [],
  //     currentSubreddit: sub,
  //     page: 1,
  //   });
  //   fetch(redditUrl + items.currentSubreddit + "/" + items.sort + ".json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItems({
  //         files: data.data.children,
  //         after: data.data.after,
  //         before: data.data.before,
  //       });
  //       window.scrollTo(0, 0);
  //     });
  //   // .catch(console.log);
  // };

  return (
    <div className={classes.container}>
      <AppBarTop />
      <CardCollection files={items.files} icon={renAndStimpy} />
      <Button onClick={prevPage()}>Prev</Button>
      <Typography>Page {items.page}</Typography>
      <Button onClick={nextPage()}>Next</Button>
      {/* <Button onClick={changeSubreddit()}>Next</Button> */}
    </div>
  );
};

export default App;
