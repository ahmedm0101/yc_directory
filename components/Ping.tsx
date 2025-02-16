import React from "react";

export default function Ping() {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="size-[11px] inline-flex relative rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
}
