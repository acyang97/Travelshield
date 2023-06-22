"use client";

const CommentBubble = () => {
  return (
    <>
      <div className="bg-white text-black px-4 py-2 antialiased flex">
        <img
          className="rounded-full h-8 w-8 mr-2 mt-1 "
          src="https://picsum.photos/id/1027/200/200"
        />
        <div>
          <div className="bg-gray-100 rounded-3xl px-4 pt-2 pb-2">
            <div className="font-semibold text-sm leading-relaxed">Jon Doe</div>
            <div className="text-sm leading-snug md:leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
          <div className="text-sm ml-4 mt-0.5 text-gray-500 ">14 w</div>
        </div>
      </div>
    </>
  );
};

export default CommentBubble;
