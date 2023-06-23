"use client";

import { FormattedFullPost } from "@/app/interfaces/post.interface";
import { Country } from "country-state-city";
import React from "react";
import Tag from "./Tag";

interface Props {
  post: FormattedFullPost;
}
const TagsContainer: React.FC<Props> = ({ post }) => {
  return (
    <div className="mb-2 mx-3">
      <Tag
        tag={`${Country.getCountryByCode(post.countryCode)?.flag} ${
          post.country
        }`}
      />
      <Tag tag={`${post.city}`} />
      {post.categories.map((category, index) => (
        <Tag key={index} tag={category} />
      ))}
    </div>
  );
};

export default TagsContainer;
