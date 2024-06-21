import { Bias } from "@/models/job-description";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractSentence(input: string): string {
  const sentenceMatch = input.match(/[^.!?]+[.!?]/);
  const extracted = sentenceMatch ? sentenceMatch[0] : input;
  const newlines = extracted.replaceAll("\n", "<br/>");

  return newlines.length > 125 ? newlines.substring(0, 125) + "..." : newlines;
}

export function biasCheck(jd: string, bias: Bias | undefined): string {
  let formatted_jd = "";

  jd = jd.replaceAll("\n", "<br/>");

  if (bias != undefined) {
    bias.masculine_words.forEach((masculine) => {
      if (jd.includes(masculine))
        jd = jd.replaceAll(
          masculine,
          `<span style="background-color:#F9D689">${masculine}</span>`
        );
    });

    bias.feminine_words.forEach((feminine) => {
      if (jd.includes(feminine))
        jd = jd.replaceAll(
          feminine,
          `<span style="background-color:#F9D689">${feminine}</span>`
        );
    });

    bias.warning_words.forEach((warning) => {
      if (jd.includes(warning))
        jd = jd.replaceAll(
          warning,
          `<span style="background-color:#FB6D48">${warning}</span>`
        );
    });

    bias.banned_words.forEach((banned) => {
      if (jd.includes(banned))
        jd = jd.replaceAll(
          banned,
          `<span style="background-color:#A91D3A">${banned}</span>`
        );
    });
  }

  formatted_jd = jd;

  return formatted_jd;
}

export function removeHTMLFormat(jd: string): string {
  jd = jd.replaceAll("<br/>", "\n");
  jd = jd.replaceAll('<span style="background-color:#F9D689">', "");
  jd = jd.replaceAll('<span style="background-color:#FB6D48">', "");
  jd = jd.replaceAll('<span style="background-color:#A91D3A">', "");
  jd = jd.replaceAll("</span>", "");

  return jd;
}
