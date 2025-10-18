import { ClassValidatorFields } from '../validator/class-validator-fields';
import { EntityValidationError } from '../validator/validation.error';
import { FieldsErrors } from '../validator/validator-fields-interface';

type Expect =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expect, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated: boolean = validator.validate(data);
      if (validated) {
        return isValid();
      }
      return assertContainsErrorMessages(validator.errors ?? {}, received);
    }
  },
});

function assertContainsErrorMessages(
  expected: FieldsErrors,
  received: FieldsErrors,
) {
  // Use Jest's expect API to check if expected contains received
  const pass = expect(expected).toEqual(expect.objectContaining(received));

  return pass === undefined
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The received error message: ${JSON.stringify(received)}. Current : ${JSON.stringify(expected)}`,
      };
}

function isValid() {
  return {
    pass: true,
    message: () => '',
  };
}
