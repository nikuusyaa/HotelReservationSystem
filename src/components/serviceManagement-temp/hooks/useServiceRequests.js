import { useState, useEffect, useRef, useCallback } from "react";

// Хук для загрузки списка запросов с возможностью повторного запроса (refetch)
const REQUESTS_URL =
  "https://ids-api-production.up.railway.app/concierge/requests";

export default function useServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef();

  const fetchRequests = useCallback(async () => {
    // отменяем предыдущий запрос, если он ещё в процессе
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(REQUESTS_URL, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    return () => abortRef.current?.abort();
  }, [fetchRequests]);

  return { requests, loading, error, refetch: fetchRequests };
}
