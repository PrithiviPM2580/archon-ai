import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex">
      <div className="flex  items-center justify-center p-8 bg-bg-base">
        <SignUp />
      </div>
    </main>
  );
}
