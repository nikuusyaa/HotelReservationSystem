import { useState, useCallback } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const BOOKING_URL = "https://ids-api-production.up.railway.app/booking";

/**
 * Hook for creating reservation
 *  - BookingContext (setBookingResponse)
 *  - AuthContext    (setAuthResponse)
 *
 * @returns {{
 *   bookRoom: (payload: {g_name: string, surname: string, phone_num: number, room_type: string}) => Promise<any>,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export default function useBookRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auth context
  const { setResponse: setAuthResponse } = useAuth();

  const bookRoom = useCallback(
    async (payload) => {
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedPayload),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Booking error response:", text);
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();

        setAuthResponse(data);
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setAuthResponse]
  );

  return { bookRoom, loading, error };
}
