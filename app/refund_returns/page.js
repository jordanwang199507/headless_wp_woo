import { client } from "../../utils/apollo";
import { gql } from "@apollo/client";

export default async function RefundReturns() {
  const GET_PAGE_CONTENT = gql`
    query GET_PAGE_CONTENT {
      page(id: "", idType: URI) {
        content
        title
      }
    }
  `;
  const { data } = await client.query({
    query: GET_PAGE_CONTENT,
  });
  console.log(data.page.content);
}
