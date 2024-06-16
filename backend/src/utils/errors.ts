import { FieldErrors } from "@/utils/validation/types";

class NotFoundError extends Error {
    constructor(message = "Not found") {
        super(message);
        this.message = message;
    }
}

class ValidationError extends Error {
    fieldErrors?: FieldErrors;

    constructor(message = "", fieldErrors?: FieldErrors) {
        super(message);
        this.message = message;
        this.fieldErrors = fieldErrors;
    }
}

export { NotFoundError, ValidationError };
