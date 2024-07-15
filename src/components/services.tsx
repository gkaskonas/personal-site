import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Image from "next/image";

interface IService {
  title: string;
  shortDescription: string;
  image?: string;
}

export default function Services() {
  const services: IService[] = [
    {
      title: "Web Development",
      shortDescription:
        "I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS.",
      image: "/img/web-development.jpeg",
    },
    {
      title: "Full Stack Developer",
      shortDescription:
        "I build full-stack applications using technologies like SST, Next.js, and more. I have experience in using NoSQL, SQL and other databases.",
      image: "/img/wp10167050.jpg",
    },
    {
      title: "Cloud Consulting",
      shortDescription:
        "I provide consulting services for a wide range of topics, including web development, design, AWS, Kubernetes and more.",
      image: "/img/cloud.jpg",
    },
  ];
  return (
    <main className="mx-auto max-w-6xl py-5">
      <h1 className="pb-5 text-center text-3xl font-semibold">Services</h1>
      <h2 className="mx-auto max-w-lg pb-10 text-center text-xl text-slate-800">
        Transform your vision into reality with expert full stack development
        and cutting-edge AWS cloud solutions.
      </h2>
      <div className="grid grid-flow-row auto-rows-max grid-cols-3 grid-rows-1 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col gap-0 transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="relative h-60 w-full">
              <Image
                className="absolute object-cover "
                src={service.image!}
                alt="Service image"
                fill
              />
            </div>
            <Card className="max-w-2xl rounded-none  bg-slate-50 shadow-md">
              <CardHeader className="flex flex-col">
                <CardTitle className="w-full text-2xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-4 text-base">
                {service.shortDescription}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
