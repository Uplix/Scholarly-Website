import Link from "next/link";

export default function staffRedirect() {
  return (
    <div className="flex flex-col w-full h-full pt-40 justify-center items-center">
      <text className="text-center text-7xl mb-20 underline underline-offset-8 decoration-4 decoration-sky-500">
        Redirect Page
      </text>
      <div className="flex flex-row h-fit max-w-7xl mx-20 flex-wrap gap-x-20 gap-y-16 justify-center items-center">
        <Link
          className="text-center text-5xl transition hover:scale-110 hover:-translate-y-2 decoration-slate-200 decoration-4 hover:underline underline-offset-8"
          href={"/login/staff/students"}
        >
          Students
        </Link>
        <Link
          className="text-center text-5xl transition hover:scale-110 hover:-translate-y-2 decoration-slate-200 decoration-4 hover:underline underline-offset-8"
          href={"/login/staff/upcomingSessions"}
        >
          Sessions
        </Link>
        <Link
          className="text-center text-5xl transition hover:scale-110 hover:-translate-y-2 decoration-slate-200 decoration-4 hover:underline underline-offset-8"
          href={"/login/staff/reports"}
        >
          Reports
        </Link>
      </div>
    </div>
  );
}
