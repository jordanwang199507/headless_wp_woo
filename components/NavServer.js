// components/NavServer.js
import { client } from "../utils/apollo";
import { gql } from "@apollo/client";
import Nav from "./Nav";

export default async function NavServer() {
  const GET_MENU = gql`
    query GET_MENU_BY_NAME {
      menuItems(where: { parentId: "0", location: PRIMARY }) {
        nodes {
          id
          label
          url
          path
          childItems {
            edges {
              node {
                id
                label
                url
                path
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_MENU,
  });

  return <Nav menuItems={data.menuItems} />;
}
