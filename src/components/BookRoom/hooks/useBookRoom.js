import { useState, useCallback } from "react";

const BOOKING_URL = "https://ids-api-production.up.railway.app/booking";

/**
 * Hook for creating reservation
 *
 * Data format type:
 * {
 *   g_name: string,
 *   surname: string,
 *   phone_num: number,
 *   room_type: string
 * }
 *
 * @returns {{
 *   bookRoom: (payload: {g_name: string, surname: string, phone_num: number, room_type: string}) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null,
 *   response: any
 * }}
 */
export default function useBookRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const bookRoom = useCallback(async (payload) => {
    const formattedPayload = {
      ...payload,
      phone_num: Number(payload.phone_num),
      room_type: payload.room_type.toLowerCase(),
    };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedPayload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Booking error response:", text);
        throw new Error(`Ошибка HTTP ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { bookRoom, loading, error, response };
}
