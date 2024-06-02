import { Laptop } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import Image from "next/image";

interface IService {
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
}

export default function Services() {
  const services: IService[] = [
    {
      title: "Web Development",
      description:
        "I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS. With a focus on performance, aesthetics, and user experience, I build web applications that are not only visually appealing but also highly functional and efficient. Whether you need a sleek single-page application or a complex multi-page site, I ensure that every project is tailored to meet your unique requirements. From the initial design to the final deployment, I am dedicated to delivering a seamless and engaging digital experience for your users.",
      shortDescription:
        "I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS.",
      image: "/img/web-development.jpeg",
    },
    {
      title: "Full Stack Development",
      shortDescription:
        "I build full-stack applications using technologies like Node.js, SST, Next.js, and more.",
      description: `I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS. With a focus on performance, aesthetics, and user experience, I build web applications that are not only visually appealing but also highly functional and efficient. Whether you need a sleek single-page application or a complex multi-page site, I ensure that every project is tailored to meet your unique requirements. From the initial design to the final deployment, I am dedicated to delivering a seamless and engaging digital experience for your users.`,
    },
    {
      title: "AWS Consulting",
      shortDescription:
        "I provide consulting services for a wide range of topics, including web development, design, AWS, Kubernetes and more.",
      description: `I specialize in creating dynamic, responsive websites using modern technologies like React, Next.js, and Tailwind CSS. With a focus on performance, aesthetics, and user experience, I build web applications that are not only visually appealing but also highly functional and efficient. Whether you need a sleek single-page application or a complex multi-page site, I ensure that every project is tailored to meet your unique requirements. From the initial design to the final deployment, I am dedicated to delivering a seamless and engaging digital experience for your users.`,
    },
  ];
  return (
    <main className="mx-auto max-w-4xl py-5">
      <h1 className="pb-5 text-center text-3xl font-semibold">Services</h1>
      <h2 className="mx-auto max-w-md pb-10 text-center text-slate-700">
        Transform your vision into reality with expert full stack development
        and cutting-edge AWS cloud solutions.
      </h2>
      <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-10">
        {services.map((service, index) => (
          <Card className="max-w-screen-sm bg-slate-50  shadow-md" key={index}>
            <CardHeader>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription> {service.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="text-base">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Learn More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen-xl">
                  <DialogHeader>
                    <DialogTitle className="text-3xl">
                      {service.title}
                    </DialogTitle>
                    <DialogDescription className="mt-5">
                      <div className="flex flex-row">
                        <div className="relative h-[300px] w-full">
                          <Image
                            src={service.image!}
                            alt="web development"
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <p className="text-xl text-black">
                          {service.description}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
