import { useState, useCallback } from "react";

const BASE_URL = "https://ids-api-production.up.railway.app/payments";

/**
 * Hook for deleting payment (DELETE /payments/:id)
 *
 * @returns {{
 *   deletePayment: (paymentId: number|string) => Promise<void>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useDeletePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePayment = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/${paymentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deletePayment, loading, error };
}
