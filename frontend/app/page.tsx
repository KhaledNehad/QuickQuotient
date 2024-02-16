import ListVote from "@/components/ListVote";
import { listActiveVotes, listExpiredVotes } from "@/lib/db";
import Link from "next/link";

export default function page() {
  return (
    <div className="scroll-m-20">
      <div className="mt-10 mb-10 text-center space-y-5">
        <h1 className="text-4xl font-bold mb-3">Create a new Vote</h1>
        <p className="text-lg">
          You can create a new vote by clicking the button below.
        </p>
        <div className="mt-5 flex">
          <Link
            href="/vote/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create New Vote
          </Link>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-3">Ongoing Votes</h1>
      <ActiveVote />

      <h1 className="text-4xl font-bold mb-3">Past Votes</h1>
      <ExpiredVote />
    </div>
  );
}

const ActiveVote = async () => {
  const { data: votes, error } = await listActiveVotes();
  if (!votes?.length) {
    return <div> No Active Votes</div>;
  }

  if (error) {
    return <div> Error fetching active votes</div>;
  }

  return <ListVote votes={votes} />;
};

const ExpiredVote = async () => {
  const { data: votes, error } = await listExpiredVotes();
  if (!votes?.length) {
    return <div> No Expired Votes</div>;
  }

  if (error) {
    return <div> Error fetching expired votes</div>;
  }

  return <ListVote votes={votes} isExpired={true} />;
};
