import { Layout } from "../components/Layout";
import { GetStaticProps } from "next";
import { readContentList } from "../lib/contentLoader";
import Link from "next/link";
import { Post } from "../type/Post";

type PostInfo = {
  posts: Post[];
  hasArchive: boolean;
};

export default function Home(props: PostInfo) {
  const { posts, hasArchive } = props;
  return (
    <Layout>
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-6 rounded-lg hover:bg-[#2B5FEC] prose hover:prose-a:text-white my-6 max-w-xl shadow-neumorphism hover:shadow-blueNeumorphism group"
        >
          <h2>
            <Link
              href="/posts/[id]"
              as={`/posts/${post.slug}`}
              className="text-sm md:text-lg group-hover:text-white"
            >
              {post.title}
            </Link>
          </h2>
          <div>
            <span className="text-xs md:text-sm text-left group-hover:text-white">
              {post.published}
            </span>
          </div>
        </div>
      ))}

      {hasArchive ? (
        <div className="text-right mt-8">
          <Link
            href="/archive/[page]"
            as="/archive/1"
            className="text-xs md:text-sm"
          >
            アーカイブ
          </Link>
        </div>
      ) : (
        ``
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const MAX_COUNT = 5;
  const posts = await readContentList();
  const hasArchive = posts.length > MAX_COUNT;

  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
      hasArchive,
    },
  };
};
