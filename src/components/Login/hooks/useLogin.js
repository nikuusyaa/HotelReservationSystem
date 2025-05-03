import { useState, useCallback } from "react";

const LOGIN_URL = "https://ids-api-production.up.railway.app/login";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const login = useCallback(async (phoneNum) => {
    const payload = { phone_num: Number(phoneNum) };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Login error response:", text);
        throw new Error(`Ошибка HTTP ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      console.error("Login exception:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, response };
}
