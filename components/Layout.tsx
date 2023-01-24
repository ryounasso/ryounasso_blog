import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { Profile } from "./Profile";

export const Layout = (props: any) => {
  const { title, children } = props;
  const siteTitle = "ryounasso blog";

  return (
    <div className="container p-4 mx-auto max-w-xl min-h-screen prose sm:prose-sm prose-headings:text-[#333333] prose-a:text-[#333333] prose-a:no-underline prose-strong:text-[#333333]">
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      />

      <header>
        <div className="flex justify-center items-center relative">
          <h1 className="text-center">
            <Link
              href="/"
              className="font-bold text-lg md:text-2xl block pt-3 mb-3 prose"
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
      </header>

      <main>
        <div className="mb-10">
          {title ? <h1 className="text-lg md:text-lg">{title}</h1> : ``}
          <div>{children}</div>
        </div>
        <Profile />
      </main>
      <div className="mt-8" />

      <footer className="font-[16] md:font-[18] text-center text-[#333333]">
        &copy; {siteTitle}
      </footer>
    </div>
  );
};
