import { caller } from "@/trpc/server";

export default async function Home() {
  const data = await caller.hello({
    text: "world",
  });

  return (
    <>
      <div>{data.greeting}</div>
    </>
  );
}
