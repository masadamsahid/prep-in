import Agent from "@/components/Agent";

type Props = {}

const InterviewPage = (props: Props) => {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName="You" userId="user1" type="generate" />
    </>
  );
}

export default InterviewPage;