import type { z } from "zod";

import type { FieldErrors } from "./types";

/**
 * Parses zod errors into a more readable and easy to handle format.
 */
const parseErrors = (error: z.ZodError): FieldErrors => {
    const errors: FieldErrors = {};

    const issues: z.ZodIssue[] = error.issues;
    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i]!;

        for (let i = 0; i < issue.path.length; i++) {
            const part = issue.path[i]!;

            if (i === issue.path.length - 1) {
                const message = `Invalid ${part}`;
                errors[part] = message;
            } else errors[part] = errors[part] ?? {};
        }
    }

    return errors;
};

export { parseErrors };
