'use client'
import { TC } from "@/components/TranslateContent";
import { useAppStore } from "@/context/appContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const {image,description,cv} = useAppStore((state) => state.about);
  const {data} = useAppStore((state) => state.skills);
  return (
    <div className="p-10">
      <div className="flex justify-center items-center max-sm:flex-col gap-3 mb-4">
        <div className="w-1/2 flex justify-center">
          <Image
            src={image}
            alt="Me"
            width={230}
            height={230}
            className="rounded-lg shadow-[0px_0px_20px_0px_var(--secondary-color)]"
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="text-center">
            {
              description.split('\n').map((item, i) => {
                return <>{item}<br/></>
              })
            }
          </div>
          <Link href={cv} download="CV" target="_blank"
          className={` text-center relative cursor-pointer p-2.5 bg-transparent text-2xl rounded-tr-lg rounded-bl-lg transition-all duration-1000
          before:content-[''] before:w-2.5 before:h-2.5 before:absolute before:transition-all before:duration-1000 before:top-[-1px] before:left-[-1px] before:border-t-[5px] before:border-l-[5px] before:border-[var(--secondary-color)]
          after:content-[''] after:w-2.5 after:h-2.5 after:absolute after:transition-all after:duration-1000 after:bottom-[-1px] after:right-[-1px] after:border-b-[5px] after:border-r-[5px] after:border-[var(--secondary-color)]
          hover:rounded-tr-none hover:rounded-bl-none hover:before:w-[102%] hover:before:h-full hover:after:w-[102%] hover:after:h-full`}
          ><TC>See Resume</TC></Link>
        </div>
      </div>
      <div className="flex gap-3 justify-around flex-wrap">
      {/* {
        [...data, ...data].sort(() => 0.5 - Math.random()).map((item, i) => {
          return (
            
          );
        })
      } */}
      
      </div>
    </div>
  );
}
