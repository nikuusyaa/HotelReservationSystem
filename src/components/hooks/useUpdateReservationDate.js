import { useState, useCallback } from "react";

const BASE_URL = "https://ids-api-production.up.railway.app";

/**
 * Updating check-in/ check-out date
 *
 * @returns {{
 *   updateDates: (reservationId: number|string, checkIn: string, checkOut: string) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useUpdateReservationDates() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDates = useCallback(async (reservationId, checkIn, checkOut) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/reservations/${reservationId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            check_in_date: checkIn,
            check_out_date: checkOut,
          }),
        }
      );

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

  return { updateDates, loading, error };
}

/**
 * Вариант: хук инициализируется с reservationId, не нужно передавать его при вызове
 *
 * @param {number|string} reservationId
 * @returns {{
 *   update: (checkIn: string, checkOut: string) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useUpdateReservationDatesById(reservationId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = useCallback(
    async (checkIn, checkOut) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}/reservations/${reservationId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              check_in_date: checkIn,
              check_out_date: checkOut,
            }),
          }
        );

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
    },
    [reservationId]
  );

  return { update, loading, error };
}
