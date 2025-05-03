import { useState, useCallback } from "react";
const BASE_URL = "https://ids-api-production.up.railway.app/concierge/requests";

export function useConfirmRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postRequest = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);

    const ctrl = new AbortController();
    const signal = ctrl.signal;

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { postRequest, loading, error };
}
