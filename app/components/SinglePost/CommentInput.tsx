"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { FullComment } from "@/app/interfaces/comment.interface";
import { SafeUser } from "@/app/types";
import axios from "axios";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface Props {
  postId: string;
  currentUser?: SafeUser | null;
  setNewComments: Dispatch<SetStateAction<FullComment[]>>;
}
const CommentInput: React.FC<Props> = ({
  postId,
  currentUser,
  setNewComments,
}) => {
  const disableButton = useRef(false);
  const loginModal = useLoginModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    disableButton.current = true;
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    const { data: createdComment } = await axios.post(`/api/comment`, {
      content: data.comment,
      postId,
    });
    setNewComments((prev) => [...prev, createdComment as FullComment]);
    reset();
    disableButton.current = false;
    return data;
  };

  return (
    <>
      <form>
        <div className="flex items-center px-3 pt-2 pb-[2px] rounded-lg">
          <textarea
            id="comment"
            {...register("comment", { required: true })}
            rows={3}
            className={`block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border outline-none focus:outline-none border-gray-300 focus:ring-black focus:border-black
            ${errors["comment"] ? "border-rose-500" : "border-gray-300"}
            ${
              errors["comment"] ? "focus:border-rose-500" : "focus:border-black"
            }
            `}
            placeholder=" Write your comment"
          />
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={disableButton.current}
            type="submit"
            className="inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-slate-200"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6 rotate-90"
              fill="gray"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            <span className="sr-only">Post Comment</span>
          </button>
        </div>
        {errors["comment"] && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 px-3">
            <span className="font-medium px-2.5">*Required</span>
          </p>
        )}
      </form>
    </>
  );
};

export default CommentInput;
