import { useState, useCallback } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

const LOGIN_URL = "https://ids-api-production.up.railway.app/login";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { response, setResponse } = useAuth();

  const login = useCallback(
    async (phoneNum) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_num: Number(phoneNum) }),
        });

        if (res.status >= 400) {
          throw new Error(`Error HTTP ${res.status}`);
        }

        const data = await res.json();

        setResponse(data.id);

        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setResponse]
  );

  return { login, loading, error, response };
}
