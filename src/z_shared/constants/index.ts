export enum Routes {
  home = "/",
  //--------------------------------------------------------doc routes-------------------------------------------------------------//
  docs = "/docs",
  docsconcept = "/docs/concept",
  //--------------------------------------------------------tts routes-------------------------------------------------------------//
  docstts = "/docs/tts",
  docsttsoverview = "/docs/tts/overview",
  docsttssingle = "/docs/tts/single",
  docsttsmixed = "/docs/tts/mixed",
  docsttsstreaming = "/docs/tts/streaming",
  //--------------------------------------------------------stt routes-------------------------------------------------------------//
  docsstt = "/docs/stt",
  docssttoverview = "/docs/stt/overview",
  docssttshort = "/docs/stt/short",
  docssttlong = "/docs/stt/long",
  //--------------------------------------------------------page routes-------------------------------------------------------------//
  pricing = "/pricing",
  explanataion = "/explanataion",
  contact = "/contact",
  terms = "/terms",
  privacy = "/privacy",
}

//-------------------------------------------------------- language -------------------------------------------------------------//

export enum language {
  uz = "uz",
  ru = "ru",
  en = "en",
}

//-------------------------------------------------------- theme -------------------------------------------------------------//

export enum theme {
  dark = "dark",
  light = "light",
}

export const defaultText = `Haqiqat niholin o’stirmas gardun, Xohi befarq bo’lgil, xohi ko’p kuyun. Falak aylanishi o’zgarmas jindek, Bugunni kecha bil, ertani bugun.`;
