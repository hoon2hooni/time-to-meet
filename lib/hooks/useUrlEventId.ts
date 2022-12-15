import { useRouter } from "next/router";

const useUrlEventId = () => {
  const router = useRouter();
  const id = router?.query?.id as string;
  return id;
};

export default useUrlEventId;
