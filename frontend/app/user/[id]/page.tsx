import createSupabaseServerClient from "@/lib/supabase/server";
import UserTable from "../UserTable";
import UserInfo from "../UserInfo";
import { IUser } from "@/lib/types";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data: votes, error: votesError } = await supabase
    .from("vote")
    .select("*")
    .eq("created_by", params.id);

  if (votesError) {
    console.error(votesError);
    return <div>error</div>;
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div>
      <div
        className="flex items-center space-x-4"
        style={{ marginBottom: "2rem" }}
      >
        <UserInfo user={user as IUser} />
      </div>
      <div className="space-y-10">
        <UserTable votes={votes} userId={params.id} />
      </div>
    </div>
  );
}
