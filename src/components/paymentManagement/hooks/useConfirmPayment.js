import { useState, useCallback } from "react";

const BASE_URL = "https://ids-api-production.up.railway.app/payments";

/**
 * Hook for confirming payment (POST /payments/:id)
 *
 * @returns {{
 *   confirmPayment: (paymentId: number|string) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useConfirmPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmPayment = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/${paymentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { confirmPayment, loading, error };
}
