import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

type Props = {}

const InterviewsPage = async (props: Props) => {

  const user = await getCurrentUser() as User;

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </>
  );
}

export default InterviewsPage;