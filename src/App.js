import React, { useState, useEffect } from "react";

import AppBarTop from "./components/AppBarTop.js";
import CardCollection from "./components/CardCollection.js";
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

function App() {
  const classes = useStyles();

  const [items, setItems] = useState({ files: [], after: null, before: null });
  const [subredditIcon, setSubredditIcon] = useState({
    icon: null,
  });

  const redditCreepyArtAPI = useEffect(() => {
    fetch(
      "https://www.reddit.com/r/CreepyArt+UnusualArt+alternativeart+wtfart+cringe+diWHY/hot.json?count=25"
    )
      .then((res) => res.json())
      .then((data) => {
        setItems({
          files: data.data.children,
          after: data.data.after,
          before: data.data.before,
        });
        // window.scrollTo(0, 0);
      });
  }, []);

  const redditSubredditArtAPI = useEffect(() => {
    fetch("https://www.reddit.com/r/CreepyArt/about.json")
      .then((res) => res.json())
      .then((data) => {
        setSubredditIcon({
          icon: data.data.icon_img,
        });
      });
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <AppBarTop />
        <CardCollection
          files={items.files}
          icon="https://www.reddit.com/r/CreepyArt/about.json"
        />
      </div>
    </div>
  );
}

export default App;
