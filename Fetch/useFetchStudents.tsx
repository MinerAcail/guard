import { useApi } from "@/context/ApiContext";
import { useState, useEffect } from "react";

export function useFetchData(endpoint:string) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = useApi();
  
    useEffect(() => {
      setLoading(true);
      fetch(`${apiUrl}/${endpoint}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })  
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error);
          setLoading(false);
        });
    }, [apiUrl, endpoint]);
  
    return { data, loading, error };
  }
  