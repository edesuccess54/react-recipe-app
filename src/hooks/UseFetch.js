import { useEffect, useState } from "react";

export const UseFetch = (url, method="GET") => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(null);
    const [options, setOptions] = useState(null)

    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
        setIsPending(true);

       try {
        const response = await fetch(url, {...fetchOptions, signal: controller.signal});
        if (!response.ok) {
                throw new Error("Could not fetch data");
            }
        const json = await response.json();

        setIsPending(false);
        setData(json);
        setIsError(null);

       } catch (error) {

        if(error.name === "AbortError") {
            console.log("Requested was aborted");
        } else {
            console.log(error.message);
            setIsPending(false);
            setIsError(error.message);
        }
       }
    }
    
    if(method === "GET") {
        fetchData();
    }

    if(method === "POST" && options) {
        fetchData(options);
    }

    return () => {
        controller.abort();
    }
  }, [url, options, method]);
  return {data, isError, isPending, postData}
}
