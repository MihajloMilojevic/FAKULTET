import {useState, useEffect} from "react";

const useFetch = (url, options, fetchInitialy = false) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [shoudFetch, setShouldFetch] = useState(fetchInitialy);

  useEffect(() => {
	if(!shoudFetch) return;
    if(!url) return;
    const fetchData = async () => {
      try {
        const response = await fetch(url, options || {});
        const json = await response.json();
        setData(json);
        setError(null)
      } catch (error) {
        setError(error);
        setData(null);
      }
    };

    fetchData();
  }, [url, options]);

  useEffect(() => {
	  setShouldFetch(true);
  }, []);

  return { data, error };
};

export default useFetch;