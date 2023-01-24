import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "../../components/Layout";
import { getContentFileList, readContent } from "../../lib/contentLoader";
import { Post } from "../../type/Post";
import Head from "next/head";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function PostContent(params: Post) {
  const content =
    process.env.NEXT_PUBLIC_OG_IMAGE_URL +
    params.title +
    ".png?theme=dark&md=1&fontSize=100px";
  return (
    <>
      <Head>
        <title>{params.title}</title>
        <meta property="og:image" content={content} />
        <meta name="og:title" content={params.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={content} />
        <meta name="twitter:title" content={params.title} />
      </Head>
      <Layout title={params.title}>
        <div className="post-meta">
          <span>{params.published}</span>
        </div>
        <div
          className="post-body prose prose-sm  text-[#333333] prose-headings:text-[#333333] marker:prose-li:text-[#333333] prose-em:text-[#333333]"
          dangerouslySetInnerHTML={{ __html: params.content }}
        />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Post, Params> = async ({
  params,
}) => {
  const content = await readContent(params!.slug);

  return {
    props: {
      ...content,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getContentFileList().map((filename) => ({
    params: {
      slug: path.parse(filename).name,
    },
  }));

  return { paths, fallback: false };
};
