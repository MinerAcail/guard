// useApiPostRequest.ts
import { useApi } from "@/context/ApiContext";
import { useState } from "react";

interface UseApiPostRequestProps {
  url: string;
  initialData?: any;
}

export const useApiPostRequest = ({ url, initialData }: UseApiPostRequestProps) => {
  const [data, setData] = useState<any>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = useApi();

  const postRequest  = async (requestData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/${url}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const result = await response.json();
      setData(result);  
      return result;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postRequest };
};
