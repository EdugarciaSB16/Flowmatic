import { zodResolver as zodResolverOriginal } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";

/**
 * Typed wrapper around `@hookform/resolvers/zod`.
 *
 * `@hookform/resolvers@5.4.0` pins its zod 4 typings to `_zod.version.minor: 0`,
 * which makes any schema built with `zod@4.4+` fail TypeScript overload
 * resolution (runtime is unaffected).
 *
 * This wrapper accepts any schema shape and preserves the resolver's typed
 * output so `useForm<MyFormValues>` keeps inference for `values` and `errors`.
 *
 * See: https://github.com/react-hook-form/resolvers/issues/813
 */
export const zodResolver = <
  TInput extends FieldValues,
  TContext = unknown,
  TOutput = TInput,
>(
  schema: unknown,
): Resolver<TInput, TContext, TOutput> => {
  return zodResolverOriginal(schema as never) as Resolver<
    TInput,
    TContext,
    TOutput
  >;
};
