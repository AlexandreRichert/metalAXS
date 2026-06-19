"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Configuration du Studio Sanity (back-office) monté sur /studio.
export default defineConfig({
  name: "default",
  title: "Metalaxs — Administration",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision : terrain de jeu GROQ, utile en développement.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
});
