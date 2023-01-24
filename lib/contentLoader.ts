import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "../type/Post";
import { formatDate } from "./data";

const DIR = path.join(process.cwd(), "content/posts");
const EXTENSION = ".md";

// マークダウンファイルの一覧を取得
const getContentFileList = () => {
  const filenames = fs.readdirSync(DIR);
  return filenames.filter((filename) => path.parse(filename).ext === EXTENSION);
};

// マークダウンファイルの中身をパースして取得する
const readContent = async (filename: string) => {
  const slug = path.parse(filename).name;
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), "utf8");
  const matterResult = matter(raw);

  const { title, published: rawPublished } = matterResult.data;

  const parsedContent = await remark().use(html).process(matterResult.content);
  const content = parsedContent.toString();

  return { slug, content, title, published: formatDate(rawPublished) };
};

const readContentList = async () => {
  const promisses = getContentFileList().map((filename) =>
    readContent(filename)
  );

  const contents = await Promise.all(promisses);

  return JSON.parse(JSON.stringify(contents.sort(sortwithProp(true))));
};

// カリー化されている関数
const sortwithProp = (reversed: boolean) => (a: Post, b: Post) => {
  if (reversed) {
    return a.published < b.published ? 1 : -1;
  } else {
    return a.published < b.published ? -1 : 1;
  }
};

export { getContentFileList, readContent, readContentList };
