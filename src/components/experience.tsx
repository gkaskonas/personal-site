"use client";
import React from "react";
import { Separator } from "./ui/separator";
import { Progress } from "@/components/ui/progress";

export default function Experience() {
  const [progressAWS, setProgressAWS] = React.useState(13);
  const [progressKubernetes, setProgressKubernetes] = React.useState(13);
  const [progressTypeScript, setProgressTypeScript] = React.useState(13);
  const [progressDevops, setProgressDevops] = React.useState(13);
  const [progressCDK, setProgressCDK] = React.useState(13);

  const skills = [
    { name: "AWS", progress: progressAWS },
    { name: "CDK", progress: progressCDK },
    { name: "Devops", progress: progressDevops },
    { name: "Kubernetes", progress: progressKubernetes },
    { name: "Typescript", progress: progressTypeScript },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgressAWS(90);
      setProgressKubernetes(80);
      setProgressTypeScript(70);
      setProgressDevops(85);
      setProgressCDK(88);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="resume"
      className="mx-auto mt-10 flex max-w-xs flex-col space-y-5 sm:max-w-2xl lg:max-w-3xl"
    >
      <div className="flex flex-col justify-between space-y-5  text-left sm:flex-row sm:space-y-0">
        <h2 className="flex text-xl font-semibold uppercase underline decoration-cyan-500 decoration-4 underline-offset-8">
          Education
        </h2>
        <li className="flex basis-1/2 flex-col justify-between">
          <ul className="flex flex-col">
            <h3 className="text-xl font-semibold">Bsc in Games Technologies</h3>
            <p className="text-base italic">Convetry University</p>
            <p className="text-base">2013-2017</p>
          </ul>
        </li>
      </div>
      <Separator />
      <div className="flex flex-col justify-between space-y-5  text-left sm:flex-row sm:space-y-0">
        <h2 className="flex text-xl font-semibold uppercase underline decoration-cyan-500 decoration-4 underline-offset-8">
          Experience
        </h2>
        <li className="flex basis-1/2 list-outside flex-col  justify-between space-y-4">
          <ul className="flex flex-col">
            <h3 className="text-xl font-semibold">Lumar</h3>
            <p className="text-base italic">Devops Lead</p>
            <p className="text-base">Dec 2022 - </p>
          </ul>
          <ul className="flex flex-col">
            <p className="text-base italic">Senior Devops Engineer</p>
            <p className="text-base">Jul 2021 - Dec 2022</p>
          </ul>
          <ul className="flex flex-col">
            <h3 className="text-xl font-semibold">Inawisdom</h3>
            <p className="text-base italic">Cloud Engineer</p>
            <p className="text-base">Sep 2020 - Jul 2021</p>
          </ul>
          <ul className="flex flex-col">
            <h3 className="text-xl font-semibold">Ocado</h3>
            <p className="text-base italic">Devops Engineer</p>
            <p className="text-base">Sep 2019 - Sep 2020</p>
          </ul>
        </li>
      </div>
      <Separator />
      <div className="flex flex-col justify-between space-y-5  text-left sm:flex-row sm:space-y-0">
        <h2 className="flex text-xl font-semibold uppercase underline decoration-cyan-500 decoration-4 underline-offset-8">
          Skills
        </h2>
        <li className="flex basis-1/2 list-outside flex-col  justify-between space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col">
              <h3 className="mb-2 text-lg font-semibold">{skill.name}</h3>
              <Progress
                value={skill.progress}
                className="h-10  sm:w-3/4 md:w-full"
              />
            </div>
          ))}
        </li>
      </div>
    </section>
  );
}
