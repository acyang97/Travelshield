import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
}
