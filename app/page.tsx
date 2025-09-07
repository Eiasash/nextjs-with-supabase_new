import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">📝 Notes Management</h3>
                <p className="text-sm text-muted-foreground">
                  Create, organize, and manage your personal notes with a beautiful interface.
                </p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">✅ Todo Lists</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of your tasks with priority levels, due dates, and completion status.
                </p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">🔐 Secure Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with Supabase Auth and Row Level Security.
                </p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">🌙 Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes for comfortable viewing.
                </p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">⚡ Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Changes are instantly saved and synced across all your devices.
                </p>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg mb-2">📱 Responsive Design</h3>
                <p className="text-sm text-muted-foreground">
                  Works perfectly on desktop, tablet, and mobile devices.
                </p>
              </div>
            </div>
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
