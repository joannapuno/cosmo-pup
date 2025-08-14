"use client";

import { Launch } from "@/types";
import { useCountDown } from "@/hooks/useCountDown";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDownLeftRight,
  faRocket,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { capitalize, padZero } from "@/utils";

interface Props {
  onTimerDone: () => void;
  selectedLaunch?: Launch | null;
}

export default function CountdownPanel({ selectedLaunch, onTimerDone }: Props) {
  const launchDate = selectedLaunch?.launchDate ?? "";
  const [finalMessage, setFinalMessage] = useState<string>("");
  const { days, hours, minutes, seconds, isDone } = useCountDown(launchDate);

  const labelStyle =
    "text-sm text-indigo-600 uppercase tracking-[.15em] sm:tracking-[.25em]";

  const countdownClock: { label: string; value: string }[] = [
    { label: "Days", value: days },
    { label: "Hours", value: padZero(hours) },
    { label: "Minutes", value: padZero(minutes) },
    { label: "Seconds", value: padZero(seconds) },
  ];

  // Check timer
  useEffect(() => {
    if (isDone) onTimerDone();
  }, [isDone]);

  // Setting messages
  useEffect(() => {
    setFinalMessage("🐾 Calculating paw-rameters...");
  }, [selectedLaunch]);

  useEffect(() => {
    if (!selectedLaunch || !isDone) return;

    const timeout = setTimeout(() => {
      setFinalMessage(`🎉 ${selectedLaunch.name} has lifted off!`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isDone, selectedLaunch]);

  return (
    <>
      {/* Main countdown wall */}
      {selectedLaunch && !isDone ? (
        <div className="flex flex-col gap-4">
          <span className={labelStyle}>Upcoming launch in</span>
          <div className="flex gap-6 flex-wrap sm:gap-8">
            {countdownClock.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-4xl sm:text-6xl">{value}</span>
                <span className={labelStyle}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl sm:text-4xl">{finalMessage}</div>
      )}

      {/* More info */}
      {selectedLaunch && (
        <div className="text-violet-100 flex flex-col sm:flex-row gap-2 sm:gap-8 py-6">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faRocket} className="text-indigo-500" />
            <span>{selectedLaunch.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faArrowsUpDownLeftRight}
              className="text-indigo-500"
            />
            <span>{capitalize(selectedLaunch.rocketType)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserGroup} className="text-indigo-500" />
            <span>{selectedLaunch.organization}</span>
          </div>
        </div>
      )}
    </>
  );
}
