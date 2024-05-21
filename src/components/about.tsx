import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="flex items-center justify-center bg-neutral-900 text-white"
    >
      <div className="mx-auto max-w-xs space-y-5 py-20 text-left sm:max-w-2xl lg:max-w-3xl">
        <h2 className=" text-2xl font-semibold">About Me</h2>
        <p className="mt-4  text-base text-slate-300">
          Certified AWS Solutions Architect with excellent communication and
          problem-solving skills. Over 5 years of experience in the AWS
          environment, encompassing a wide range of activities from deploying
          software solutions on existing infrastructure to building new,
          multi-account Landing Zones. Expertise includes serverless backend
          deployment, AWS consultancy, Next.js React development, and full-stack
          development. Proficient in managing the entire lifecycle of cloud
          applications, from initial discussions and architecture design to
          deploying and maintaining complex applications on the cloud. Skilled
          in leveraging AWS services to create scalable, reliable, and
          cost-effective solutions, ensuring optimal performance and security.
        </p>
        <h2 className="flex flex-col text-2xl font-semibold">Contact</h2>
        <p className="mt-0 flex text-base text-slate-300">Peter Kaskonas</p>
        <p className="mt-0 flex text-base text-slate-300">United Kingdom</p>
        <Link
          href="mailto:contact@peterkaskonas.com"
          className="mt-0 flex text-base text-slate-300"
        >
          contact@peterkaskonas.com
        </Link>
      </div>
    </section>
  );
}
