import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import FeedClient from "./FeedClient";

const FeedPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <FeedClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FeedPage;
