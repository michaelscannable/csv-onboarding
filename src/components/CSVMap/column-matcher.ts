import stringSimilarity from "string-similarity";

export const columnMatcher = ({
  templateColumns,
  toImportColumns,
}: {
  templateColumns: { label: string }[];
  toImportColumns: { key: string }[];
}) => {
  if (!templateColumns || !toImportColumns) {
    return [];
  }

  const saasTemplateLabels = templateColumns.map(({ label }) => label);

  return toImportColumns.map((validationItem) => {
    const bestMatch = stringSimilarity.findBestMatch(
      validationItem.key,
      saasTemplateLabels
    );
    const bestMatchLabel = bestMatch.bestMatch.target;

    const matchedSaasTemplate = templateColumns.find(
      ({ label }) => label === bestMatchLabel
    );

    return {
      ...matchedSaasTemplate,
      key: validationItem.key,
      is_imported: true,
    };
  });
};
