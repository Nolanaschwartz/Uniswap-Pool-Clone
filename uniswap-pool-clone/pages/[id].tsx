import { useRouter } from "next/router";

const TokenPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default TokenPage;
