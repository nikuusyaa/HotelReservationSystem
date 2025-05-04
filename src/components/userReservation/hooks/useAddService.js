import { useState, useCallback } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const BASE_URL = "https://ids-api-production.up.railway.app";

/**
 * Book Service Hook
 *
 * @returns {{
 *   addUserService: (userId: number|string, serviceId: number|string) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useAddUserService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let userId = useAuth().response;
  userId = userId.guest_id;

  const addUserService = useCallback(
    async (serviceId) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/users/${userId}/requests`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service_id: serviceId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  return { addUserService, loading, error };
}
