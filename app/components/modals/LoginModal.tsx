"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { AiFillGoogleCircle } from "react-icons/ai";

const LoginModal = () => {
  const loginModal = useLoginModal();
  if (!loginModal.isOpen) {
    return null;
  }
  const onGoogleLogin = () => {
    signIn("google");
    loginModal.onClose();
  };
  return (
    <div
      aria-hidden="true"
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => loginModal.onClose()}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Login to use this feature!
            </h3>
            <form className="space-y-6" action="#">
              <div
                className="w-full text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row justify-between cursor-pointer"
                onClick={onGoogleLogin}
              >
                <AiFillGoogleCircle size={20} color="white" />
                <div>Google Login</div>
                <span />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginModal;
