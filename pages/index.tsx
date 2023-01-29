import request from "@/utils/request";
import { trpc } from "@/utils/trpc";
import { Fragment, useCallback, useEffect, useState } from "react";

const REQUEST_URL = "https://some-random-api.ml/animal/cat";

export default function Home() {
  const example = trpc.example.get.useQuery();
  const [response, setResponse] = useState<APIResponse>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const onSubmit = useCallback(async () => {
    const response = await request<APIResponse>(REQUEST_URL);
    setResponse(response?.data);
  }, []);

  useEffect(() => {
    request<APIResponse>(REQUEST_URL).then((response) => {
      setResponse(response?.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <button onClick={onSubmit}>Demo</button>
      <div>{JSON.stringify(response, null, 16)}</div>
    </Fragment>
  );
}
