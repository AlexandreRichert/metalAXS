import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

// Configuration de la CLI Sanity (typegen, déploiement du Studio, etc.).
export default defineCliConfig({
  api: { projectId, dataset },
  // Le Studio est embarqué dans Next.js : on désactive le routeur auto-updates
  // (incompatible avec un Studio servi par Next.js).
  autoUpdates: false,
});
