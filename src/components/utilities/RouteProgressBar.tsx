import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigation } from "react-router";

const RouteProgressBar = () => {
  const navigation = useNavigation();
  const location = useLocation();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const lastLocationKey = useRef(location.key);

  const clearTimers = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (navigation.state !== "idle") {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      setVisible(true);
      setIsCompleting(false);
      setProgress((prev) => (prev < 18 ? 18 : prev));

      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(() => {
          setProgress((prev) => {
            if (prev >= 85) return prev;
            const step = Math.max(1, (90 - prev) * 0.08);
            return Math.min(85, prev + step);
          });
        }, 160);
      }

      return;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [navigation.state]);

  useEffect(() => {
    if (lastLocationKey.current === location.key) {
      return;
    }

    lastLocationKey.current = location.key;

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setVisible(true);
    setIsCompleting(true);
    setProgress(100);

    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      setIsCompleting(false);
      setProgress(0);
      hideTimeoutRef.current = null;
    }, 220);
  }, [location.key]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] w-full overflow-hidden" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        style={{
          width: `${progress}%`,
          transition: `width ${isCompleting ? 180 : 220}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms ease`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};

export default RouteProgressBar;
