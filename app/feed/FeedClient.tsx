"use client";

import React, { useEffect, useRef, useState } from "react";
import { SafeUser } from "../types";
import SinglePost from "../components/SinglePost/SinglePost";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FormattedFullPost } from "../interfaces/post.interface";
import { useIntersection } from "@mantine/hooks";
import { INFINITE_SCROLL_LIMIT } from "../constants/feed.constants";
import { Loader2 } from "lucide-react";
import CountryFilter from "../components/Filters/CountryFilter";
import SinglePostSkeleton from "../components/SinglePost/SinglePostSkeleton";
import _ from "lodash";
import HeaderContent from "./HeaderContent";
import {
  FormattedCity,
  FormattedCountry,
} from "../interfaces/country.interface";
import CityFilter from "../components/Filters/CityFilter";

interface Props {
  currentUser?: SafeUser | null;
  initialPosts: FormattedFullPost[];
}
const FeedClient: React.FC<Props> = ({ currentUser, initialPosts }) => {
  const [country, setCountry] = useState<FormattedCountry | null>(null);
  const [city, setCity] = useState<FormattedCity | null>(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  const lastPostRef = useRef<HTMLElement>(null);

  // https://mantine.dev/hooks/use-intersection/
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const fetchPosts = async ({ pageParam = 1 }) => {
    let query = `/api/post?limit=${INFINITE_SCROLL_LIMIT}&page=${pageParam}`;
    if (country) {
      query += `&country=${country.name}`;
    }
    if (city && country) {
      query += `&city=${city.name}`;
    }
    if (content) {
      query += `&content=${content}`;
    }
    if (categories.length > 0) {
      for (let category of categories) {
        query += `&category=${category}`;
      }
    }
    const { data } = await axios.get(query);
    return data as FormattedFullPost[];
  };

  // need to order the query
  const { data, fetchNextPage, isFetchingNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      [
        "infinite-query-post",
        country !== null ? country.name : undefined,
        city !== null ? city.name : undefined,
      ].filter((val) => val !== undefined),
      fetchPosts,
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialPosts], pageParams: [1] },
      }
    );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const FilterContainer = (
    <aside className="hidden md:block w-1/4 h-screen bg-white fixed left-0 top-0 border-x-[1px] border-slate-200">
      <div className="flex flex-col gap-2">
        <div className="bg-emerald-400 pb-2 pt-[5.5rem]">
          <h1 className="px-2 text-white text-sm">
            Apply filters here to narrow down the search for travel tips at your
            next destination. You can choose to filter by country, city, and
            content of the post.
          </h1>
        </div>
        <div className="px-4">
          <CountryFilter
            setCountry={setCountry}
            setCity={setCity}
            country={country}
          />
        </div>
        <div className="px-4">
          <CityFilter country={country} city={city} setCity={setCity} />
        </div>
      </div>
    </aside>
  );

  // when data has not been fetched
  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;
  if (isLoading) {
    return null;
  }

  return (
    <main>
      <div className="py-14 flex" />
      {FilterContainer}
      <div className="sm:w-full md:w-3/4 md:ml-auto sm:overflow-y-0 md:overflow-y-auto">
        {/* <div className="mx-6 md:mx-12 w-3/4 ml-auto overflow-y-auto"> */}
        <div className="flex items-center justify-center">
          <HeaderContent />
        </div>
        {isFetching && !isFetchingNextPage ? (
          <ul className="flex flex-col gap-3">
            <li>
              <SinglePostSkeleton />
            </li>
            <li>
              <SinglePostSkeleton />
            </li>
            <li>
              <SinglePostSkeleton />
            </li>
            <li>
              <SinglePostSkeleton />
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-3">
            {posts &&
              posts?.map((post, index) => {
                if (index === posts.length - 1) {
                  return (
                    <li key={post.id} ref={ref}>
                      <SinglePost
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li key={post.id}>
                      <SinglePost post={post} currentUser={currentUser} />
                    </li>
                  );
                }
              })}
            {isFetchingNextPage && (
              <li className="flex justify-center mb-5">
                <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
              </li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
};

export default FeedClient;
