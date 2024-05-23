"use client";
import { useRef, useEffect, useState } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";

export default function TemoPlayer() {
  const [recordedEvents, setRecordedEvents] = useState<any[]>([]);
  const playerRef = useRef<rrwebPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/himanshu-plabs/temo-vercel/main/temos/Product_Hunt_%E2%80%93_The_best_new_products_in_tech_-1716501252392/events.json"
      );
      const eventsArray = await response.json();
      setRecordedEvents(eventsArray);
    };

    fetchEvents();
  }, []);

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
    if (recordedEvents.length > 0) {
      replayEvents(recordedEvents);
    }
  }, [recordedEvents]); // Added dependency to useEffect to re-run when recordedEvents changes

  return (
    <div ref={playerContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
