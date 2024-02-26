import ListVote from "@/components/ListVote";
import { Button } from "@/components/ui/button";
import { listActiveVotes, listExpiredVotes } from "@/lib/db";
import Link from "next/link";

export default function page() {
  return (
    <div className="scroll-m-20">
      <div>
        <h1 className="text-4xl font-bold mb-3">Welcome to Quick Quotient</h1>
        <p className="mb-6">
          Quick Quotient is a simple voting app that allows you to create and
          vote on polls.
        </p>
        <Button variant="outline" className="mb-4">
          <Link href="/vote/create">Create a Vote</Link>
        </Button>
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
