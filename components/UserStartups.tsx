import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupCardType } from "./StartupCard";

export default async function UserStartups({ id }: { id: string }) {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {startups
        ? startups.map((startup: StartupCardType) => (
            <StartupCard key={startup._id} post={startup} />
          ))
        : <p className="no-result">No startup yet</p>}
    </>
  );
}
