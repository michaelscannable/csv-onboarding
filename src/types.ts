import { type NextPage } from "next";
import type React from "react";

export type ReactTag = keyof JSX.IntrinsicElements;

export type PropsOf<TTag extends ReactTag> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface CsvTemplate {
  key: string;
  label: string;
  data_type: string;
  is_required: boolean;
  custom_validation: string;
  custom_message: string;
  is_imported: boolean;
  pattern: string;
}
