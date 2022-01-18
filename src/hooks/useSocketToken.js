import useSWR from "swr";

function useSocketToken() {
  const { data, mutate } = useSWR("socketToken", () => window.$socketToken);

  return {
    socketTokenData: data || false,
    socketTokenMutate: ($socketToken) => {
      window.$socketToken = $socketToken;
      return mutate();
    },
  };
}

export default useSocketToken;
