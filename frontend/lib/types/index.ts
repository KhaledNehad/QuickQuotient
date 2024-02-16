export type IVotes =
  | {
      created_at: string;
      created_by: string;
      end_date: string;
      id: string;
      title: string;
      users: {
        created_at: string;
        avatar: string | null;
        id: string;
        username: string | null;
      } | null;
    }[]
  | null;

export type IVote = {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  created_by: string;
  end_date: string;
};
