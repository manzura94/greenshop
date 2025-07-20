import { useState, useEffect } from "react";
import parseJwt from "@/utils/parseJwt";

export const useParseJwt = () => {
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = token ? parseJwt(token) : null;
    setUserid(decoded?.id ?? null);
  }, []);

  return userid;
};
