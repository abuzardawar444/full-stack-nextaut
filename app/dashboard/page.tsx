import Dashboard from "@/components/dashboard";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";

// Extend the Session type to include user.id
type ExtendedSession = Session & {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const DashboardPage = async () => {
  const session = (await getServerSession()) as ExtendedSession;
  const userId = session?.user?.id;
  console.log(userId);
  return <Dashboard />;
};
export default DashboardPage;
