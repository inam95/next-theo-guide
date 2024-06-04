import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/4b90284a-9498-4fe7-b88f-1d24e8c7cdbd-1d.jpg",
  "https://utfs.io/f/d0579066-9548-407c-a42f-1f727daf6e15-1e.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

async function Images() {
  const images = await db.query.images.findMany({ orderBy: (model, { asc }) => asc(model.id) });
  return (
    <div className="flex flex-wrap gap-4">
      {[...images, ...images].map((image, index) => (
        <div key={index} className="w-48">
          <img src={image.url} alt="" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
