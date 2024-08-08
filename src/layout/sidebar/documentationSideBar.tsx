"use client";
import { Routes } from "@/z_shared/constants";
import { useLinkHook } from "@/z_shared/hooks/link.hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/z_shared/ui/Accordion";
import Link from "next/link";

export const SideBar = () => {
  const { passiveLink } = useLinkHook();

  return (
    <div className="h-[calc(100vh-50px)] w-[264px] pt-12 border-r-2 dark:border-neutral-700">
      <div className="w-full flex flex-col gap-2 px-10">
        <Link
          href={Routes.docs}
          className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
            Routes.docs,
            true
          )}`}
        >
          Introduction
        </Link>
        <Link
          href={Routes.docsconcept}
          className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
            Routes.docsconcept
          )} `}
        >
          Concept
        </Link>
        <Accordion type="single" collapsible className="w-full !border-b-0">
          <AccordionItem value="item-1" className="!border-b-0">
            <AccordionTrigger
              className={`p-2 hover:text-accent-foreground rounded-md text-sm font-cold !no-underline ${passiveLink(
                Routes.docstts
              )}`}
            >
              Text To Speech
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 !border-b-0">
              <Link
                href={Routes.docsttsoverview}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docsttsoverview
                )}`}
              >
                Overview
              </Link>
              <Link
                href={Routes.docsttssingle}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docsttssingle
                )}`}
              >
                Single query
              </Link>

              <Link
                href={Routes.docsttsstreaming}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docsttsstreaming
                )}`}
              >
                Streaming
              </Link>
              <Link
                href={Routes.docsttsmixed}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docsttsmixed
                )}`}
              >
                Mixed
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="!border-b-0">
            <AccordionTrigger
              className={`p-2 hover:text-accent-foreground rounded-md text-sm font-cold !no-underline ${passiveLink(
                Routes.docsstt
              )} `}
            >
              Speech To Text
            </AccordionTrigger>
            <AccordionContent className="flex flex-col px-2 !border-b-0">
              <Link
                href={Routes.docssttoverview}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docssttoverview
                )}`}
              >
                Overview
              </Link>
              <Link
                href={Routes.docssttlong}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docssttlong
                )}`}
              >
                Long Audio
              </Link>
              <Link
                href={Routes.docssttshort}
                className={`p-2  hover:bg-neutral-600 hover:text-accent-foreground rounded-md text-sm font-cold ${passiveLink(
                  Routes.docssttshort
                )}`}
              >
                Short Audio
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
