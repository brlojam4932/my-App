import { useEffect, useState } from "react";

import axios from 'axios';

// custom hook

function useFetch(url) {
  const [data, setData] = useState(null);
  const [newsLoading, newsSetLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   newsSetLoading(true);
   axios.request(url).then((response) => {
     setData(response.data);
     //console.log(data);
   })
   .catch((err) => {
     setError(err);
   }).finally(() => {
     newsSetLoading(false);
   });
  }, []);

  const refetch = () => {
    newsSetLoading(true);
    axios.request(url).then((response) => {
      setData(response.data);
      console.log(data);
    })
    .catch((err) => {
      setError(err);
    }).finally(() => {
      newsSetLoading(false);
    });
  };

  return { data, newsLoading, error, refetch };

}

export default useFetch;