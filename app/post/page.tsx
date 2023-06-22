import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import PostClient from "./PostClient";

const PostPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <PostClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PostPage;
