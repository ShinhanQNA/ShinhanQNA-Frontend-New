import { getAccessToken } from "@/lib/auth-cookies";
import { Feed } from "./_components/feed";
import { Landing } from "./_components/landing";

export default async function HomePage() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return <Landing />;
  }

  return <Feed />;
}
