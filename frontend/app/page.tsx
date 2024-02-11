import VoteCard from "@/components/VoteCard";

export type Vote = {
  id: string;
  title: string;
  description: string;
  endDate: string;
  createdAt: string;
  createdBy: string;
  expired: boolean;
  userAvatar: string;
  result?: string;
};

const VoteCardData = [
  {
    id: "1",
    title: "Which is the best recipe for potato salad?",
    description: "Card Description",
    endDate: " 03 02 2024",
    createdAt: "1 hour ago",
    createdBy: "Willie Spinka",
    expired: false,
    userAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/949.jpg",
  },
  {
    id: "2",
    title: "Are you dog person or a cat person?",
    description: "Card Description",
    endDate: "03 02 2024",
    createdAt: "2 hour ago",
    createdBy: "Willie Spinka",
    expired: true,
    userAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1106.jpg",
    result: "Cat",
  },

  {
    id: "6",
    title: "Which OS you prefer the most?",
    description: "Card Description",
    endDate: " 03 02 2024",
    createdAt: "1 hour ago",
    createdBy: "Willie Spinka",
    expired: true,
    userAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/949.jpg",
    result: "macOS",
  },

  {
    id: "6",
    title: "Are you iPhone or Samsung person?",
    description: "Card Description",
    endDate: " 03 02 2024",
    createdAt: "1 hour ago",
    createdBy: "Willie Spinka",
    expired: true,
    userAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/949.jpg",
    result: "iPhone",
  },

  {
    id: "7",
    title: "Which Javascript framework do you prefer?",
    description: "Card Description",
    endDate: " 03 02 2024",
    createdAt: "1 hour ago",
    createdBy: "Willie Spinka",
    expired: true,
    userAvatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/949.jpg",
    result: "React",
  },
];

export default function page() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Ongoing Votes</h1>

      <div className="flex flex-row mb-12 flex-wrap">
        {VoteCardData.filter((vote) => !vote.expired).map((vote) => (
          <VoteCard
            key={vote.id}
            vote={vote}
            customStyle="bg-emerald-500 p-2 rounded-2xl mb-2"
          />
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-3">Past Votes</h1>
      <div className="flex flex-row mb-12 flex-wrap">
        {VoteCardData.filter((vote) => vote.expired).map((vote) => (
          <VoteCard
            key={vote.id}
            vote={vote}
            customStyle="bg-rose-600 p-2 rounded-2xl mb-2"
          />
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-3"> Upcoming Votes</h1>
    </div>
  );
}
