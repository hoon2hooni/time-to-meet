import Head from "next/head";

type ComponentProps = {
  path?: string;
};
export default function MetaOgTwitterUrlTsx({ path = "" }: ComponentProps) {
  return (
    <Head>
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${path}`}
      />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${path}`}
      />
    </Head>
  );
}
