import axios from "axios";
export default async (req, res) => {
  // Destructure incoming request
  const { method } = req;
  if (method != "GET") {
    return res.status(405).send();
  }
  try {
    // gets attractions based on lat long variables
    const response = await axios({
      method: "POST",
      url: "https://reddit-graphql-proxy.p.rapidapi.com/graphql",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "reddit-graphql-proxy.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        accept: "application/json",
      },
      data: {
        query: `query BigQuery($name: String!){
                    reddit {
                        subreddit(name: $name){
                            newListings(limit: 4) {
                                title
                                url
                            }
                        }
                    }
                }
                `,
        operationName: "BigQuery",
        variables: {
          name: "Coronavirus",
        },
      },
    });
    res.send(response.data);
  } catch (e) {
    // returns bad request error if something goes wrong
    res.status(400).send();
  }
};
