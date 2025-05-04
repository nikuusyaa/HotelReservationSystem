import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const BASE_URL = "https://ids-api-production.up.railway.app";

/**
 * Hook for getting user requests by ID
 *
 * @param {string | number} userId - userID
 * @returns {{
 *   requests: any[],
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: () => Promise<void>
 * }}
 */
export default function useUserRequests() {
  let userId = useAuth().response;
  userId = userId.guest_id;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchRequests = useCallback(async () => {
    if (!userId) {
      setRequests([]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/users/${userId}/requests`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });
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
  }, [userId]);

  useEffect(() => {
    fetchRequests();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchRequests]);

  return { requests, loading, error, refetch: fetchRequests };
}
