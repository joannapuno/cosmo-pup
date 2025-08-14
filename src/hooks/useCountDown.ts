import { useEffect, useState, useMemo } from "react";

export const useCountDown = (target: string) => {
  const countdownDate = useMemo(() => new Date(target).getTime(), [target]);
  const isValidDate = !isNaN(countdownDate);
  const [countDown, setCountDown] = useState<number>(
    isValidDate ? countdownDate - Date.now() : 0
  );

  useEffect(() => {
    if (!isValidDate) return;

    // subtracting remaining with current
    const interval = setInterval(() => {
      setCountDown(countdownDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate, isValidDate]);

  // adding some padding
  const formatUnit = (value: number) =>
    isNaN(value) ? '00' : String(value).padStart(2, '0');

  const days = formatUnit(Math.floor(countDown / (1000 * 60 * 60 * 24)));
  const hours = formatUnit(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = formatUnit(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = formatUnit(Math.floor((countDown % (1000 * 60)) / 1000));
  const isDone = countDown <= 0;

  return {
    days,
    hours,
    minutes,
    seconds,
    isDone
  };
};
