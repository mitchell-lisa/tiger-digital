import type { SchemaTypeDefinition } from "sanity";
import { landingPage } from "./landingPage";
import { siteDefaults } from "./siteDefaults";

export const schemaTypes: SchemaTypeDefinition[] = [landingPage, siteDefaults];
