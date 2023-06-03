import { useState, useEffect } from "react";

//CREATING A CUSTOM HOOK,
//CUSTOM HOOK MUST START WITH "USE"
//PASSING ENDPOINT INSTEAD URL FOR FETCHING DATA

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setErrors] = useState(null);

  //  FETCHING DATA FROM data/db
  //  setTimeout used to make fetch more realistic with 1sec delay while getting the data.

  // ABORRCONTROLLER ADDED FOR STOPING THE FETCH WHILE SWICHING BETWEEN PAGES BEFORE LOAD

  //                    IMPORTANT !

  // READ THIS ----------------------------------------------------------------------------

  // TO BE ABLE TO FETCH DATA FROM db.json - u should folow next steps
  //  start server and enter in terminal this
  // npx json-server --watch data/db.json --port 8000 --headers "Access-Control-Allow-Origin, *"
  // reload and enjoy in game :)

  // READ THIS ----------------------------------------------------------------------------

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          setData(data);
          setIsPending(false);
          setErrors(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setErrors(err.message);
          }
        });
    }, 1000);

    return () => abortCont.abort();
  }, [url]);

  return { data, setData, isPending, error };
};

export default useFetch;
