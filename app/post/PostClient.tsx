"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import CountrySelect from "../components/CountrySelect";
import { SafeUser } from "../types";
import React, { useState } from "react";
import CitySelect from "../components/CitySelect";
import {
  FormattedCity,
  FormattedCountry,
} from "../interfaces/country.interface";
import { CATEGORIES_OPTIONS } from "../constants/categories.constants";
import { Category } from "../interfaces/category.interface";
import CategorySelect from "../components/CategoriesSelect";
import { toast } from "react-hot-toast";
import axios from "axios";

interface PostClientProps {
  currentUser?: SafeUser | null;
}
const PostClient: React.FC<PostClientProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      images: [],
      categories: [CATEGORIES_OPTIONS[25]],
      country: null, // will pass an object
      city: null,
      content: "",
    },
  });

  const city = watch("city") as FormattedCity;
  const categories = watch("categories") as Category[];
  const country = watch("country") as FormattedCountry;

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!currentUser) {
      toast.error("Please sign in first in order to share a post");
      return;
    }
    try {
      let formattedTags = [] as string[];
      data.categories.forEach((category: Category) =>
        formattedTags.push(category.value)
      );
      const formattedData = {
        ...data,
        country: data.country.name,
        countryCode: data.country.isoCode,
        city: data.city.name,
        categories: formattedTags,
      };
      setIsLoading(true);
      await axios.post("/api/post", formattedData);
      reset();
      toast.success("Successfully shared your travel tip");
    } catch (error) {
      toast.error((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Post a Travel Tip!</h2>
    </div>
  );

  const postForm = (
    <div className="flex flex-col gap-4 mx-5 md:mx-20 mt-10">
      <Input
        id="title"
        label="Title"
        placeholder="Title of your post"
        register={register}
        errors={errors}
      />
      <CategorySelect
        register={register}
        errors={errors}
        value={categories}
        onChange={(value) => setCustomValue("categories", value)}
      />
      <div className="flex flex-col gap-4">
        <CountrySelect
          register={register}
          errors={errors}
          value={country}
          onChange={(value) => {
            setCustomValue("country", value);
            setCustomValue("city", null);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <CitySelect
          countryCode={country?.isoCode}
          register={register}
          value={city}
          onChange={(value) => setCustomValue("city", value)}
        />
      </div>
      <Input
        id="content"
        label="Content"
        placeholder="Describe your post"
        register={register}
        errors={errors}
        useTextArea={true}
      />
      <div className="flex justify-center mb-10">
        <div
          className={`w-full md:w-[30%] text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-center cursor-pointer`}
          onClick={handleSubmit(onSubmit)}
        >
          <div>Post!</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="py-14" />
      <div className="mx-6 md:mx-12">
        <div className="flex items-center justify-center">{headerContent}</div>
      </div>
      {postForm}
    </>
  );
};

export default PostClient;
