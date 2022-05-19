// import { defaults } from "lodash";
import fs from "fs/promises";

interface Changes {
  _?: string[];
  Added?: string[];
  Changed?: string[];
  Deprecated?: string[];
  Removed?: string[];
  Fixed?: string[];
  Security?: string[];
}

interface Version {
  version?: string; // version is "Unreleased" if omitted
  date?: string | Date | undefined;
  link?: string;
  parsed?: Changes;
}

interface Changelog {
  title?: string;
  description?: string;
  versions: Version[];
}

async function writeChangelog(
  changelog: Changelog,
  filePath: string
): Promise<void> {
  const links: { [key: string]: string } = {};
  const file = await fs.open(filePath, "w");
  await file.write(`# ${changelog.title ?? "Changelog"}\n`);
  if (changelog.description) {
    await file.write(`\n${changelog.description}\n`);
  }
  for (const version of changelog.versions) {
    const versionStr = version.version ?? "Unreleased";
    if (version.link) {
      links[versionStr] = version.link;
    }
    await file.write(`\n## [${versionStr}]`);
    if (version.date instanceof Date) {
      await file.write(` - ${version.date.toLocaleDateString("en-CA")}\n`);
    } else if (typeof version.date === "string") {
      await file.write(` - ${version.date}\n`);
    } else {
      await file.write(`\n`);
    }
    for (const changeType in version.parsed) {
      if (changeType !== "_") {
        await file.write(`\n### ${changeType}\n\n`);
      } else {
        await file.write(`\n`);
      }
      for (const changeItem of version.parsed[changeType as keyof Changes]!) {
        await file.write(`- ${changeItem}\n`);
      }
    }
  }
  // TODO: write links
  await file.close();
}

export { writeChangelog };
