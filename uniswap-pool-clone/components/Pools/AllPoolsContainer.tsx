import usePools from "../../hooks/usePools";
import PoolsTable from "./PoolsTable";

const AllPoolsContainer = () => {
  const { data, loading, error, incrementPage, decrementPage } = usePools();
  return (
    <PoolsTable
      title={"All Pools"}
      pools={data?.pools}
      loading={loading}
      error={error}
      decrementPage={decrementPage}
      incrementPage={incrementPage}
    />
  );
};

export default AllPoolsContainer;
