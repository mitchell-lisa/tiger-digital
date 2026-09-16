import type { SchemaTypeDefinition } from "sanity";
import { landingPage } from "./landingPage";
import { richText } from "./richText";
import { siteDefaults } from "./siteDefaults";

export const schemaTypes: SchemaTypeDefinition[] = [landingPage, siteDefaults, richText];
