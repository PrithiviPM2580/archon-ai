import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-base px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,212,0.1),transparent_42%)]" />
      <div className="relative w-full max-w-100 overflow-hidden rounded-2xl border border-border-default bg-bg-surface/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm [&_.cl-card]:w-full [&_.cl-card]:max-w-none [&_.cl-card]:shadow-none">
        <Suspense fallback={<AuthLoadingState />}>
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/editor"
          />
        </Suspense>
      </div>
    </main>
  );
}

function AuthLoadingState() {
  return (
    <div className="h-130 w-full animate-pulse rounded-xl bg-bg-elevated/60" />
  );
}
