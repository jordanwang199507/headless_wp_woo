"use client";
// components/ApolloWrapper.js
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/apollo";

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
