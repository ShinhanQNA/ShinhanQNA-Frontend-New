import { getAccessToken } from "@/lib/auth-cookies";
import { MainLayoutShell } from "./_components/main-layout-shell";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const accessToken = await getAccessToken();
  const isAuthenticated = !!accessToken;

  return (
    <MainLayoutShell isAuthenticated={isAuthenticated}>
      {children}
    </MainLayoutShell>
  );
}
