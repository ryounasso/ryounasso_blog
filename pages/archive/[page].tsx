import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getContentFileList, readContentList } from "../../lib/contentLoader";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import Pager from "../../components/Pager";
import { Post } from "../../type/Post";

const COUNT_PER_PAGE = 10;

interface Params {
  posts: Post[];
  page: number;
  total: number;
  perPage: number;
}

interface Props extends ParsedUrlQuery {
  page: string;
}

export default function Arcive(props: Params) {
  const { posts, page, total, perPage } = props;
  return (
    <Layout title="アーカイブ">
      {posts!.map((post) => (
        <div
          key={post.slug}
          className="p-6 rounded-lg hover:bg-[#2B5FEC] prose hover:prose-a:text-white my-6 max-w-xl shadow-neumorphism hover:shadow-blueNeumorphism group"
        >
          <h2>
            <Link href="/posts/[id]" as={`/posts/${post.slug}`} legacyBehavior>
              <a className="text-sm md:text-lg group-hover:text-white">
                {post.title}
              </a>
            </Link>
          </h2>
          <div>
            <span className="text-xs md:text-sm text-left group-hover:text-white">
              {post.published}
            </span>
          </div>
        </div>
      ))}

      <Pager
        page={page}
        total={total}
        perPage={perPage}
        href="/archive/[page]"
        asCallback={(page: number) => `/archive/${page}`}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Params, Props> = async ({
  params,
}) => {
  const page = parseInt(params!.page, 10);
  const end = COUNT_PER_PAGE * page;
  const start = end - COUNT_PER_PAGE;
  const posts = await readContentList();

  return {
    props: {
      posts: posts.slice(start, end),
      page,
      total: posts.length,
      perPage: COUNT_PER_PAGE,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  const posts = await getContentFileList();
  const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));
  const paths = pages.map((page) => ({
    params: { page: `${page}` },
  }));

  return { paths: paths, fallback: false };
};

const range = (stop: number) => {
  return Array.from({ length: stop }, (_, i) => i + 1);
};
