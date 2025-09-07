import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full border-b border-b-foreground/10 h-16 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
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
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
