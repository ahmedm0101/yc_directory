import { auth } from "@/auth";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import React from "react";
const exprerimental_ppr = true;
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  let session = await auth();
  let user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.name}
            </h3>
          </div>
          <Image
            src={user?.image}
            alt={user?.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="mt-7 text-30-extrabold text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-14-normal text-center">{user?.bio}</p>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id == id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <UserStartups id={id} />
          </ul>
        </div>
      </section>
    </>
  );
}
