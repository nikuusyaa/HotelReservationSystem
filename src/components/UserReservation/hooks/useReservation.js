import { useState, useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

export default function useReservation() {
  let userId = useAuth().response;
  userId = userId?.guest_id;
  const RESERVATION_URL = `https://ids-api-production.up.railway.app/users/${userId}/reservations`;

  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(RESERVATION_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setReservations(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId, RESERVATION_URL]);

  return { reservations, loading, error };
}
