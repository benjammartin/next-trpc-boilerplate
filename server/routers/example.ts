import useRequest from "@/utils/request";
import { procedure, router } from "server/trpc";

const REQUEST_URL = "https://some-random-api.ml/animal/cat";
export const exampleRouter = router({
  get: procedure.query(async () => {
    const result = await useRequest<APIResponse>(REQUEST_URL);
    return result;
  }),
});
