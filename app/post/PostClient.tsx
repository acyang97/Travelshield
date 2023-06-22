"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import CountrySelect from "../components/CountrySelect";
import { SafeUser } from "../types";
import React from "react";
import CitySelect from "../components/CitySelect";
import {
  FormattedCity,
  FormattedCountry,
} from "../interfaces/country.interface";
import TagSelect from "../components/TagSelect";
import { TAG_OPTIONS } from "../constants/tags.constants";
import { Tag } from "../interfaces/tag.interface";

interface PostClientProps {
  currentUser?: SafeUser | null;
}
const PostClient: React.FC<PostClientProps> = ({ currentUser }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      images: [],
      tags: [TAG_OPTIONS[25]],
      country: null, // will pass an object
      city: null,
      content: "",
    },
  });
  console.log(errors);
  const city = watch("city") as FormattedCity;
  const tags = watch("tags") as Tag[];
  const country = watch("country") as FormattedCountry;

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const headerContent = (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold">Post a Travel Tip!</h2>
      {/* Move the bottom to home page later */}
      {/* <div className="mt-5">
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
      </div> */}
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const postForm = (
    <div className="flex flex-col gap-4 mx-5 md:mx-20 mt-10">
      <Input
        id="title"
        label="Title"
        placeholder="Title of your post"
        register={register}
        errors={errors}
      />
      <TagSelect
        register={register}
        errors={errors}
        value={tags}
        onChange={(value) => setCustomValue("tags", value)}
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
          className="w-full md:w-[30%] text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-center cursor-pointer"
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
      {/* Body content */}
      {postForm}
    </>
  );
};

export default PostClient;
