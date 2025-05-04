import { useState, useEffect, useRef, useCallback } from "react";

const BASE_URL = "https://ids-api-production.up.railway.app";

/**
 * Hook for getting all existing reservations
 *
 * @returns {{
 *   reservations: any[],
 *   loading: boolean,
 *   error: Error|null,
 *   refetch: () => Promise<void>
 * }}
 */
export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchReservations = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/reservations`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchReservations]);

  return { reservations, loading, error, refetch: fetchReservations };
}
