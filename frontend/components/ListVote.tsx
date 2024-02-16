import { IVotes } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { BsSendFill } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ListVote({
  votes,
  isExpired,
}: {
  votes: IVotes;
  isExpired?: boolean;
}) {
  return (
    <div className="flex flex-row mb-12 flex-wrap">
      {votes?.map(({ title, end_date, created_at, users, id }, index) => (
        <>
          <div className="w-1/3 px-2">
            <Link href={"/vote/" + id} key={index}>
              <Card
                className={`${
                  isExpired ? "bg-rose-600" : "bg-green-500"
                } "p-2 rounded-2xl mb-2`}
              >
                <CardHeader>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center space-x-2">
                      <Image
                        src={users?.avatar!}
                        alt="avatar"
                        width="40"
                        height="40"
                        className="rounded-full"
                      />
                      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {users?.username}
                      </h3>
                    </div>
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
                  {!isExpired ? (
                    <div className="flex flex-col space-y-2 w-full">
                      {/* <div className="flex flex-row w-full justify-between items-center space-x-1">
                        <Input
                          type="text"
                          placeholder="Write a comment"
                          className="opacity-70"
                        />
                        <Button
                          variant="outline"
                          className="opacity-70 hover:opacity-80"
                        >
                          <BsSendFill />
                        </Button>
                      </div> */}

                      <div className="flex flex-row justify-between w-full items-center space-x-1">
                        <Button variant="outline" className="w-full">
                          Vote
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-between items-center space-x-1 w-full bg-black bg-opacity-40 p-2 rounded-2xl ">
                      <h3 className="text-center text-lg font-bold text-white w-full">
                        &quot;Winner&quot; Won 🎉
                      </h3>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
}
