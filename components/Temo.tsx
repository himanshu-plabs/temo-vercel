"use client";
import { useRef, useEffect } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";

export default function TemoPlayer({
  recordedEvents,
}: {
  recordedEvents: any[];
}) {
  const playerRef = useRef<rrwebPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const replayEvents = async (eventsArray: any[]) => {
    const playerElement = playerContainerRef.current;
    if (playerElement) {
      if (playerRef.current) {
        playerRef.current.pause();
        playerElement.innerHTML = "";
        playerRef.current = null;
      }

      if (eventsArray.length > 2) {
        const rect = playerElement.getBoundingClientRect();
        let customWidth = rect.width;
        let customHeight = rect.height;

        playerRef.current = new rrwebPlayer({
          target: playerElement,
          props: {
            events: eventsArray,
            width: customWidth,
            height: customHeight,
            showController: false,
            showDebug: false,
            autoPlay: true,
          },
        });
      }
    }
  };

  useEffect(() => {
    replayEvents(recordedEvents);
  }, [recordedEvents]); // Added dependency to useEffect to re-run when recordedEvents changes

  return (
    <div ref={playerContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
