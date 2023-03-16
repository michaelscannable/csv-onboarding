import Ajv from "ajv";
import addFormats, { type FormatsPluginOptions } from "ajv-formats";
import AjvErrors from "ajv-errors";

import schema from "../../schema/onboarding-schema.json";

type Schema = typeof schema;

export const isNullValueBySchema = (field: string | undefined, value: any) => {
  if (field && !value) {
    return !!(field && !value && schema.required.includes(field));
  }
  return false;
};

export const hasErrorBySchema = (field?: string, value?: unknown): boolean => {
  let errorFlg = false;
  if (field && value) {
    const data = typeof value === "number" ? value : value ?? {};
    const schemaProps = schema.properties;
    if (field in schemaProps) {
      const fieldSchema = schemaProps[field as keyof Schema["properties"]];
      errorFlg = !validateData(fieldSchema, data);
    }
  }

  return errorFlg;
};

const validateData = (
  schema: { type: string; pattern: string },
  value: any
): boolean => {
  const ajv = ajvCompileCustomValidator();
  return ajv.validate(schema, value);
};

const ajvCompileCustomValidator = (): Ajv => {
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });
  addFormats(ajv, ["date", "email"] as FormatsPluginOptions);
  AjvErrors(ajv);

  // validations?.map((el: { name: string; valFunc: any }) => {
  //   ajv.addFormat(el.name, eval(el.valFunc));
  // });

  return ajv;
};
