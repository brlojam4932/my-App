import { useEffect, useState } from "react";

import axios from 'axios';

// custom hook

// https://youtu.be/Vspeudp-M9k?t=499

function useFetch(url) { // any url
  const [data, setData] = useState(null); // this can be any type of data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   setLoading(true);
   axios.request(url).then((response) => {
     setData(response.data);
     //console.log(data);
   })
   .catch((err) => {
     setError(err);
   }).finally(() => {
     setLoading(false);
   });
  }, []); // Pedro adds url here as a dependancy but it loops!

  const refetch = () => { // trigger the api call with refetch (re-fresh)
    setLoading(true);
    axios.request(url).then((response) => {
      setData(response.data);
      console.log(data);
    })
    .catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  };

  return { data, loading, error, refetch };

}

export default useFetch;