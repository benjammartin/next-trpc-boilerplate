import request from "@/utils/request";
import { trpc } from "@/utils/trpc";
import { Fragment, useCallback, useEffect, useState } from "react";

const REQUEST_URL = "https://some-random-api.ml/animal/cat";

export default function Home() {
  const example = trpc.example.get.useQuery();
  const [response, setResponse] = useState<APIResponse>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    const response = await request<APIResponse>(REQUEST_URL);
    setResponse(response?.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    request<APIResponse>(REQUEST_URL).then((response) => {
      setResponse(response?.data);
      setLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <button disabled={isLoading} onClick={onSubmit}>
        Demo
      </button>
      <h2>With hook</h2>
      <div>{JSON.stringify(response, null, 16)}</div>
      <h2>With tRPC</h2>
      <div>{JSON.stringify(example, null, 16)}</div>
    </Fragment>
  );
}
