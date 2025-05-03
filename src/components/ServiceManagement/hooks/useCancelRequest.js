import { useState, useCallback } from "react";
const BASE_URL = "https://ids-api-production.up.railway.app/concierge/requests";

export function useCancelRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRequest = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    const ctrl = new AbortController();
    const signal = ctrl.signal;

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteRequest, loading, error };
}
