import { auth } from "@clerk/nextjs/server";
import "server-only";

import { db } from "~/server/db";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { asc }) => asc(model.id),
  });
}

// In next js 14
// 'use server'; means this file only runs on server
// 'use client'; means this file runs only on client
// neither of this is true

// 'use client'; means it ships js to the client but the code still runs on the server
// 'use server'; means exposing a endpoint for the client ahead
