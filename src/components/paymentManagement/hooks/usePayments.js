import { useState, useEffect, useRef, useCallback } from "react";

const BASE_URL = "https://ids-api-production.up.railway.app";

/**
 *Hook for getting payments
 *
 * @returns {{
 *   payments: any[],
 *   loading: boolean,
 *   error: Error|null,
 *   refetch: () => Promise<void>
 * }}
 */
export default function usePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchPayments = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/payments/unconfirmed`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
}
