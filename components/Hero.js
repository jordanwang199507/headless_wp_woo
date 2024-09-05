import Link from "next/link";
import Image from "next/image";

import { client } from "../utils/apollo";
import { gql } from "@apollo/client";
export default async function Hero() {
  const GET_SITEINFO = gql`
    query GetSiteInfos {
      generalSettings {
        title
        description
      }
    }
  `;

  const { data } = await client.query({
    query: GET_SITEINFO,
  });
  console.log(data);
  return (
    <section className="hero column">
      <div className="row hero_row">
        <div className="hero_content">
          <h1 className="hero_primary primary_title">
            {data.generalSettings.title}
          </h1>
          <h3 className="hero_secondary secondary_title">
            {data.generalSettings.description}
          </h3>
          <p className="hero_text primary_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            vero. Id ducimus ex sed! Soluta natus veniam animi nesciunt vitae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            vero. Id ducimus ex sed! Soluta natus veniam animi nesciunt vitae.
          </p>
          <Link href="/shop" className="primary_btn">
            Do not shop
          </Link>
        </div>
      </div>
      <div className="hero_bg">
        {/* <Image
            src="/assets/images/hero.png"
            alt="Animetopia Logo"
            width={550}
            height={500}
            className="object-contain hero_image"
          /> */}
      </div>
    </section>
  );
}
