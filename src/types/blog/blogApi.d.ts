import type IBlogMutation from "./blogMutation";

interface IBlogApi {
  [key: string]: IBlogMutation;
}

export default IBlogApi;
