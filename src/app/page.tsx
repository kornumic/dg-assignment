import { auth } from "@/lib/next-auth/auth";

const Home = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
};

export default Home;
