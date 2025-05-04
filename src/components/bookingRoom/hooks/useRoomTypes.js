// src/hooks/useRoomTypes.js
import { useState, useEffect, useRef } from "react";
import { processResponse } from "../utils/processResponse";

const ROOM_TYPES_URL = "https://ids-api-production.up.railway.app/roomtypes";

export default function useRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef();

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);

    fetch(ROOM_TYPES_URL, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // вот здесь приводим к нужному виду
        setRoomTypes(processResponse(data));
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  return { roomTypes, loading, error };
}
