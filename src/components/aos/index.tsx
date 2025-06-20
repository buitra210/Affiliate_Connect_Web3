import AOS from "aos";
import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return null;
}
