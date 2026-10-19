import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex">
      <div className="flex  items-center justify-center p-8 bg-bg-base">
        <SignIn />
      </div>
    </main>
  );
}
