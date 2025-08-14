"use client";

import { Launch } from "@/queries/types";
import LaunchesList from "@/components/LaunchesList";
import { useEffect, useState } from "react";
import CountdownPanel from "@/components/CountdownPanel";
import RocketContainer from "@/components/RocketContainer";
import LaunchControlModal from "@/components/LaunchControlModal";
import { useUpcomingLaunch } from "@/hooks/useUpcomingLaunch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const { nextLaunch, setNextLaunch } = useUpcomingLaunch();

  useEffect(() => {
    setShowInfoModal(true);
  }, []);

  useEffect(() => {
    if (nextLaunch) handleLaunchSelect(nextLaunch);
  }, [nextLaunch]);

  const handleLaunchSelect = (selected: Launch) => {
    setNextLaunch(selected);

    // If selecting past, trigger launch
    const isInPast = new Date(selected.launchDate) < new Date();
    setIsLaunching(isInPast ? true : false);
  };
  return (
    <>
      {/* About modal*/}
      <button
        className="text-indigo-600 flex items-center gap-1 justify-self-end"
        onClick={() => setShowInfoModal(true)}
      >
        <FontAwesomeIcon icon={faPaw} />
        <p>About Cosmo Pup</p>
      </button>
      <LaunchControlModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      <div className="grid gap-12 my-auto">
        <section>
          <CountdownPanel
            selectedLaunch={nextLaunch}
            onTimerDone={() => setIsLaunching(true)}
          />
        </section>

        <section>
          <LaunchesList
            selectedLaunch={nextLaunch}
            onSelectLaunch={(selected) => handleLaunchSelect(selected)}
          />
        </section>
      </div>

      {/* ROCKET! :D */}
      {isLaunching && <RocketContainer key={nextLaunch?.slug} />}
    </>
  );
}
