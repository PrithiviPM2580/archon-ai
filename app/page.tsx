import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export const instant = false;

export default async function Home() {
  await connection();
  const { userId } = await auth();
  if (userId) {
    redirect("/editor");
  } else {
    redirect("/sign-in");
  }
}
