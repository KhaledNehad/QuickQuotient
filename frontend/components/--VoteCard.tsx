import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VoteCard() {
  return (
    <div className="w-1/3 px-2">
      <Card className={customStyle}>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-2">
              <Image
                src=""
                alt="avatar"
                width="40"
                height="40"
                className="rounded-full"
              />
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {vote.created_by}
              </h3>
            </div>
            <div className="text-xs font-medium leading-none">
              {vote.created_at}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            {vote.title}
          </CardTitle>
        </CardContent>
        <CardFooter>
          {/* If vote has result, show the result */}

          {/* {vote.result && (
            <div className="flex flex-row justify-between items-center space-x-1 w-full bg-black bg-opacity-40 p-2 rounded-2xl ">
              <h3 className="text-center text-lg font-bold text-white w-full">
                &quot;{vote.result}&quot; Won 🎉
              </h3>
            </div>
          )} */}
          {/* If vote has no result, show the vote button */}
          {/* {!vote.result && (
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex flex-row w-full justify-between items-center space-x-1">
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
              </div>

              <div className="flex flex-row justify-between w-full items-center space-x-1">
                <Button variant="outline" className="w-full">
                  Vote
                </Button>
              </div>
            </div>
          )} */}
        </CardFooter>
      </Card>
    </div>
  );
}
