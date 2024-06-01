import { ChangeEventHandler, useRef } from "react";
import bsClasses from "../styling/bootstrap-classes";
import { PhoneInputState } from "../types";

export const PhoneInputs = ({
  phoneInput,
  setPhoneInput,
}: {
  phoneInput: PhoneInputState;
  setPhoneInput: React.Dispatch<React.SetStateAction<PhoneInputState>>;
}) => {
  // The length of each string of numbers between hyphens.
  const phoneInputLengths = [3, 3, 4];
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const phoneInputCount = phoneInputLengths.length;
      const currentMaxLength = phoneInputLengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      const shouldGoToNextRef =
        currentMaxLength === value.length &&
        index < phoneInputCount - 1 &&
        !isNaN(Number(value) + 1);
      const shouldGoToPrevRef = value.length === 0 && index > 0;

      // Maps through phoneInput and assigns the input value to the state.
      const newState = phoneInput.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex && !isNaN(Number(value) + 1)
          ? value.slice(0, phoneInputLengths[index]).trim()
          : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }
      setPhoneInput(newState);
    };

  return (
    <div className="phone-inputs">
      <div id="phone-inputs-wrapper">
        {phoneInputLengths.map((length, index) => {
          const isLastIteration = index === phoneInputLengths.length - 1;
          return (
            <span key={index}>
              <input
                className={bsClasses.singleLineTextInput}
                type="text"
                ref={refs[index]}
                id={`phone-input-${index + 1}`}
                value={phoneInput[index]}
                placeholder={`${"0".repeat(length)}`}
                onChange={createOnChangeHandler(index)}
              />
              {!isLastIteration && (
                <div className="mx-1 text-secondary fs-3">-</div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
