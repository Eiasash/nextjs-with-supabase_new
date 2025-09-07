import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeriatricsPlatform } from "@/components/geriatrics-platform";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"} className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                🏥 Geriatrics Fellowship Platform
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Shaare Zedek Medical Center
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <AuthButton />
            </div>
          </div>
        </nav>
        
        <div className="flex-1 w-full max-w-7xl p-6">
          <GeriatricsPlatform />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8 bg-white/50 dark:bg-gray-800/50">
          <p className="text-gray-600 dark:text-gray-400">
            Geriatrics Fellowship Platform - Shaare Zedek Medical Center
          </p>
        </footer>
      </div>
    </main>
  );
}
