import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import markdownit from "markdown-it";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
export let experimental_ppr = true;
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const md = markdownit();
  let id = (await params).id;
  let post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  let parcedContent = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl"> {post?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumpnail"
          className="rounded-xl w-full h-auto"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`user/${post.author?._id}`} className="flex gap-2">
              <Image
                alt="avatar"
                className="rounded-full drop-shadow-lg"
                src={post.author?.image}
                width={64}
                height={64}
              />
              <p className=""></p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
