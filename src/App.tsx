import { useEffect } from "react";
import { listen } from "./redux/listener";
import AppRoute from "./routes/AppRoute";

export default function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <>
      <AppRoute />
    </>
  );
}
