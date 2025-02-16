import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  let query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();
  // console.table(session);
  console.log(session?.id)
  // let posts = await client.fetch(STARTUPS_QUERY);
  let { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  // console.log(posts);

  // let posts = [
  //   {
  //     _id: "1",
  //     _createAt: new Date(),
  //     viwes: "44",
  //     author: {
  //       _id: "1",
  //       name: "zaneta <3",
  //     },
  //     description: "that is a description",
  //     image:
  //       "https://media.wired.com/photos/6595c546f6145f9ca1309145/4:3/w_2132,h_1599,c_limit/_BC-wired_selmasabanovic_kaylareeferphoto-127.jpg",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup,
          <br />
          connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Supmit Ideas, Vote on Pitches and get noticed in virtual Compititions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
