export const schema = {
  required: ["DOM"],
  errorMessage: {
    properties: {
      Manufacturer: "Manufacturer should be of type STRING",
      "Last Inspection Result":
        "Last Inspection Result should be of type STRING",
      DOM: "DOM should be of type STRING",
      Grouping: "Grouping should be of type STRING",
      Photo: "Photo should be of type STRING",
      "Account User Name": "Account User Name should be of type STRING",
      "Last Inspection Date": "Last Inspection Date should be of type STRING",
      "Expiry Date": "Expiry Date should be of type STRING",
      "Part Number": "Part Number should be of type STRING",
      "Customer Reference": "Customer Reference should be of type STRING",
      "Name/Description": "Name/Description should be of type STRING",
      "Serial Number": "Serial Number should be of type STRING",
    },
  },
  additionalProperties: false,
  type: "object",
  properties: {
    Manufacturer: { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Last Inspection Result": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    DOM: { type: "string", pattern: "(?!^\\d+$)^.+$" },
    Grouping: { type: "string", pattern: "(?!^\\d+$)^.+$" },
    Photo: { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Account User Name": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Last Inspection Date": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Expiry Date": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Part Number": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Customer Reference": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Name/Description": { type: "string", pattern: "(?!^\\d+$)^.+$" },
    "Serial Number": { type: "string", pattern: "(?!^\\d+$)^.+$" },
  },
};

// used to match
export const templateColumns = schema.properties
  ? Object.keys(schema.properties).map((key) => ({
      key: key,
      label: key,
      is_imported: true, // changes when checkbox is clicked
    }))
  : [];

// dummy data to match
export const toImportColumns = schema.properties
  ? Object.keys(schema.errorMessage.properties).map((key) => ({
      label: key,
      key,
      is_imported: true, // changes when checkbox is clicked
    }))
  : // .map((value) => ({ value, sort: Math.random() }))
    // .sort((a, b) => a.sort - b.sort)
    // .map(({ value }) => value)
    [];
