import { useRouter } from "next/router";
import React from "react";
import DetailsPage from "../../components/templates/DetailsPage";

function Details({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();
  const paths = data
    .slice(0, 10)
    .map((food) => ({ params: { id: food.id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const res = await fetch(`http://localhost:4000/data/${id}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 10,
  };
}
