const PostPage = () => {
  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Post a Travel Tip!</h2>
      <div className="mt-5">
        <p className="sm:text-base text-lg">
          Welcome to our vibrant travel community, TravelShield, a platform
          dedicated to sharing valuable insights from personal adventures.
          Whether you've encountered scams to beware of, mastered the art of
          city exploration, or discovered clever money-saving techniques, your
          experiences can now be a guiding light for fellow travelers. Our
          user-friendly website fosters an inclusive and collaborative
          environment, enabling a seamless exchange of travel wisdom. Join us in
          building a resource that empowers others to make the most of their
          journeys, while expanding your own horizons!
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="py-14" />
      <div className="mx-6 md:mx-12">
        <div className="flex items-center justify-center">{headerContent}</div>
      </div>
    </>
  );
};

export default PostPage;
