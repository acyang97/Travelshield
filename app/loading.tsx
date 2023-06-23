import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/Navbar/NavBar";

export default async function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <NavBar currentUser={currentUser} />
      <LoadingSpinner />
    </ClientOnly>
  );
}
