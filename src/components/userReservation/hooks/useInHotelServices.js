import { useState, useEffect, useRef, useCallback } from "react";

const IH_SERVICES_URL =
  "https://ids-api-production.up.railway.app/concierge/ih_services";

/**
 * Hook for getting InHotel services
 *
 * @returns {{
 *   services: any[],
 *   loading: boolean,
 *   error: Error|null,
 *   refetch: () => Promise<void>
 * }}
 */
export function useInHotelServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchServices = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(IH_SERVICES_URL, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      if (err.name !== "AbortError") setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
    return () => abortRef.current?.abort();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
