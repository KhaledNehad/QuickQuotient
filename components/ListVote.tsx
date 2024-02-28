import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ListVote({
  votes,
  isExpired,
}: {
  votes: {
    title: string;
    end_date: string;
    created_at: string;
    users: any;
    id: string;
  }[];
  isExpired?: boolean;
}) {
  return (
    <div className="flex flex-row mb-12 flex-wrap">
      {votes?.map(({ title, end_date, created_at, users, id }) => (
        <div className="w-1/3 px-2" key={id}>
          <Card
            className={`${
              isExpired ? "bg-rose-600" : "bg-green-500"
            } "p-2 rounded-2xl mb-2 relative`}
          >
            <CardHeader>
              <div className="flex flex-row justify-between items-center">
                <Link href={`/user/${users?.id}`} className="z-10">
                  <div className="flex flex-row items-center space-x-2">
                    <Image
                      src={users?.avatar}
                      alt="avatar"
                      width="25"
                      height="25"
                    />
                    <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
                      {users?.username}
                    </h3>
                  </div>
                </Link>

                <div className="text-xs font-medium leading-none">
                  {formatDistanceToNowStrict(new Date(created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                {title}
              </CardTitle>
              {isExpired ? (
                <Badge variant="secondary">Expired</Badge>
              ) : (
                <p className="text-xs">
                  Until {new Date(end_date).toDateString()}
                </p>
              )}
            </CardContent>
            <CardFooter>
              {isExpired ? (
                <Button variant="outline" className="w-full">
                  View Results{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H10a1 1 0 01-1-1v-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  Vote Now
                </Button>
              )}
            </CardFooter>
            <Link
              href={`/vote/${id}`}
              className="absolute top-0 left-0 h-full w-full opacity-0"
            ></Link>
          </Card>
        </div>
      ))}
    </div>
  );
}
