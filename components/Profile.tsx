import Image from "next/image";
import Link from "next/link";

export const Profile = () => {
  return (
    <div className="flex items-center">
      <div className="avatar">
        <div className="w-24 h-24">
          <Image
            src="/static/img/profile.png"
            className="rounded-full"
            width={200}
            height={200}
            alt="profile"
            style={{ margin: 0 }}
          />
        </div>
      </div>
      <div className="px-8" style={{ width: "fit-content" }}>
        <p className="text-base md:text-xl text-[#333333] font-semibold">
          ryounasso
        </p>
        <p className="text-sm md:text-lg text-[#333333]">
          I am a graduate student.
        </p>
        <div className="flex flex-col">
          <Link
            href="https://ryounasso-portfolio.vercel.app/"
            className="text-sm md:text-lg w-max"
          >
            portfolio page
          </Link>
          <Link
            href="https://twitter.com/ryounasso"
            className="text-sm md:text-lg w-max"
          >
            twitter
          </Link>
        </div>
      </div>
    </div>
  );
};
