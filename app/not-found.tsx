import Image from "next/image";
import Link from "next/link";
import ArticleIcon from "@mui/icons-material/Article";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import GroupsIcon from "@mui/icons-material/Groups";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function ErrorPage() {
  return (
    <div className="flex flex-col w-screen h-fit items-center py-8">
      <Image
        alt={"scholarly-icon"}
        src={"/images/sizedCircularScholarlyIcon.png"}
        width={80}
        height={80}
      />
      <h3 className="text-4xl bg-gradient-to-br from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent mt-5 text-center">
        404
      </h3>
      <h2 className="text-5xl font-light mt-2 text-center px-7">
        This page doesn&apos;t exist
      </h2>
      <h5 className="text-xl opacity-80 font-thin mt-2 text-center px-4">
        Sorry we couldn&apos;t find the page you are looking for
      </h5>
      <div className="flex flex-col w-full max-w-xl h-fit px-8">
        <Link
          href={"/go/about"}
          className="flex flex-row items-start justify-start mt-12 pb-5 transition hover:translate-x-2.5"
        >
          <div className="p-0.5 border-2 border-zinc-400 rounded-md mt-1">
            <ArticleIcon fontSize="large" />
          </div>
          <div className="flex flex-col w-full max-w-sm ml-7">
            <h4 className="text-2xl text-left font-light">About</h4>
            <h6 className="text-lg text-left opacity-75 font-thin">
              Why did we create Scholarly?
            </h6>
          </div>
          <div className="flex-grow" />
          <KeyboardArrowRightIcon className="self-center" fontSize="large" />
        </Link>
        <div className="w-full h-0.5 bg-zinc-400 bg-opacity-20" />
        <Link
          href={"/go/contact"}
          className="flex flex-row items-start justify-start py-5 transition hover:translate-x-2.5"
        >
          <div className="p-0.5 border-2 border-zinc-400 rounded-md mt-1">
            <ConnectWithoutContactIcon fontSize="large" />
          </div>
          <div className="flex flex-col w-full max-w-sm ml-7">
            <h4 className="text-2xl text-left font-light">Contact Us</h4>
            <h6 className="text-lg text-left opacity-75 font-thin">
              Interested in Scholarly? Have questions?
            </h6>
          </div>
          <div className="flex-grow" />
          <KeyboardArrowRightIcon className="self-center" fontSize="large" />
        </Link>
        <div className="w-full h-0.5 bg-zinc-400 bg-opacity-20" />
        <Link
          href={"/go/team"}
          className="flex flex-row items-start justify-start py-5 transition hover:translate-x-2.5"
        >
          <div className="p-0.5 border-2 border-zinc-400 rounded-md mt-1">
            <GroupsIcon fontSize="large" />
          </div>
          <div className="flex flex-col w-full max-w-sm ml-7">
            <h4 className="text-2xl text-left font-light">Our Team</h4>
            <h6 className="text-lg text-left opacity-75 font-thin">
              We swear, we are actually semi-interesting.
            </h6>
          </div>
          <div className="flex-grow" />
          <KeyboardArrowRightIcon className="self-center" fontSize="large" />
        </Link>
        <div className="w-full h-0.5 bg-zinc-400 bg-opacity-20" />
        <Link
          href={"/login"}
          className="flex flex-row items-start justify-start py-5 transition hover:translate-x-2.5"
        >
          <div className="p-0.5 border-2 border-zinc-400 rounded-md mt-1">
            <LoginIcon fontSize="large" />
          </div>
          <div className="flex flex-col w-full max-w-sm ml-7">
            <h4 className="text-2xl text-left font-light">Login</h4>
            <h6 className="text-lg text-left opacity-75 font-thin">
              Sign in to your Scholarly account!
            </h6>
          </div>
          <div className="flex-grow" />
          <KeyboardArrowRightIcon className="self-center" fontSize="large" />
        </Link>
        <div className="w-full h-0.5 bg-zinc-400 bg-opacity-20" />
        <Link
          href={"/"}
          className="flex flex-row self-center w-fit h-fit mt-5 transition hover:-translate-x-3 items-center justify-center mb-3"
        >
          <KeyboardBackspaceIcon fontSize="medium" />
          <h5 className="text-xl ml-2 bg-gradient-to-tr text-clip text-transparent bg-clip-text from-lime-400 via-teal-400 to-sky-400">
            Back to home
          </h5>
        </Link>
      </div>
    </div>
  );
}
