import { useApi } from "@/context/ApiContext";
import { useState, useEffect } from "react";

export interface Parent {
  id: string;
  name: string;
  email: string;
  supervise: string[];
}

export const useParents = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = useApi();
// /parents/all
  const fetchParents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/parents/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch parents');
      }
      const data = await response.json();
      setParents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  return {
    parents,
    loading,
    error,
    refreshParents: fetchParents
  };
};