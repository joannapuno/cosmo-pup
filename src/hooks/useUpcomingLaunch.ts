import { getLaunches } from "@/queries/get-launches";
import { Launch } from "@/types";
import { useEffect, useState } from "react";

export const useUpcomingLaunch = (() => {
  const [nextLaunch, setNextLaunch] = useState<Launch | null>(null)
  useEffect(() => {
    const now = new Date()

    const fetchUpcoming = (async () => {
      // Note: setting limit to 1000 for now since I know this will take all
      const { result: launches } = await getLaunches({ limit: 1000})

      // Getting next upcoming launch out of all
      const upcoming = launches
        .filter((l) => new Date(l.launchDate) > now)
        .sort((a, b) =>
          new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
        )[0]
  
      setNextLaunch(upcoming ?? null)
    })

    fetchUpcoming()

  }, [])

  return { nextLaunch, setNextLaunch }
})