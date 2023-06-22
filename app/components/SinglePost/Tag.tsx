"use client";

interface Props {
  tag: string;
}
const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <div className="mr-3 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border">
      {tag}
    </div>
  );
};

export default Tag;
