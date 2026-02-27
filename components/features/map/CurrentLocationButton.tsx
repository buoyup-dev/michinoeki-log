"use client";

import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";

type CurrentLocationButtonProps = {
  onAutoLocateComplete?: () => void;
};

export function CurrentLocationButton({ onAutoLocateComplete }: CurrentLocationButtonProps) {
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSupported = typeof window !== "undefined" && "geolocation" in navigator;

  // 位置情報が許可済みなら初回マウント時に自動で現在地に移動
  useEffect(() => {
    if (!isSupported || !navigator.permissions) {
      onAutoLocateComplete?.();
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      if (status.state === "granted") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            map.setView([pos.coords.latitude, pos.coords.longitude], 13);
            onAutoLocateComplete?.();
          },
          () => { onAutoLocateComplete?.(); },
          { enableHighAccuracy: false, timeout: 10000 }
        );
      } else {
        onAutoLocateComplete?.();
      }
    }).catch(() => {
      onAutoLocateComplete?.();
    });
  }, [map, isSupported, onAutoLocateComplete]);

  function handleClick() {
    if (!isSupported) {
      setErrorMessage("お使いのブラウザは位置情報に対応していません");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 13);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setErrorMessage("位置情報の使用が許可されていません");
            break;
          case err.POSITION_UNAVAILABLE:
            setErrorMessage("位置情報を取得できませんでした");
            break;
          case err.TIMEOUT:
            setErrorMessage("位置情報の取得がタイムアウトしました");
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="absolute bottom-6 right-3 z-[1000]">
      {errorMessage && (
        <div className="mb-2 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-700 shadow-md">
          {errorMessage}
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={loading || !isSupported}
        className="rounded-full bg-card p-2.5 shadow-md transition-colors hover:bg-muted disabled:opacity-50"
        aria-label="現在地に移動"
        title={isSupported ? "現在地に移動" : "位置情報に非対応"}
      >
        <svg
          className="h-5 w-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a1 1 0 011 1v2.07A8.002 8.002 0 0118.93 11H21a1 1 0 110 2h-2.07A8.002 8.002 0 0113 18.93V21a1 1 0 11-2 0v-2.07A8.002 8.002 0 015.07 13H3a1 1 0 110-2h2.07A8.002 8.002 0 0111 5.07V3a1 1 0 011-1zm0 5a5 5 0 100 10 5 5 0 000-10zm0 3a2 2 0 110 4 2 2 0 010-4z"
          />
        </svg>
      </button>
    </div>
  );
}
