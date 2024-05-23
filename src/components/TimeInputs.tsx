import { ChangeEventHandler, useRef, useState } from "react";

type TripleInputState = [string, string, string];

export const TimeInputs = () => {
  const [timeInput, setTimeInput] = useState<TripleInputState>([
    "12",
    "00",
    "PM",
  ]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const nextRef = inputRefs[index + 1];
      const value = e.target.value;

      // Go to the next input if it's not the last one.
      const goToNextRef = () => {
        if (index !== 2) {
          nextRef.current?.focus();
        }
      };

      const newState = timeInput.map((timeInput, timeInputIndex) => {
        if (timeInputIndex < 2) {
          const currentMinValue = [1, 0][timeInputIndex];
          const currentMaxValue = [12, 59][timeInputIndex];
          const maxFirstDigit = currentMaxValue.toString()[0];

          // Checks if the current value (without leading zeros) fits
          // between the min and max options of each date element and
          // sets it to the min or max depending on if it's above or
          // below the limit.
          const correctTime = (numString: string) => {
            goToNextRef();
            // Removes leading zeros.
            const regex = /^(0+)(?=[1-9])|^(0+)(?=\D|$)/;
            const numStringNoZeros = numString.replace(regex, "");
            if (numStringNoZeros.length === 2) {
              if (Number(numString) > currentMaxValue) {
                return currentMaxValue.toString();
              } else {
                return numString;
              }
            }
            return numString;
          };

          if (
            timeInputIndex === index &&
            !isNaN(Number(value) + 1) &&
            !value.includes(" ")
          ) {
            // If the first number entered is larger than the largest
            // tens digit of all the options for the month or day
            // inputs, it returns a "0" and the number entered then
            // moves to the next input.
            if (index < 2 && value > maxFirstDigit) {
              goToNextRef();
              return "0" + value;
            }

            if (value.length < 2) {
              const zeroCount = 2 - value.length;
              return "0".repeat(zeroCount) + value; // Add a 0 until length is 2.
            } else if (value === "000" || value === "00") {
              goToNextRef();
              return "0" + currentMinValue.toString(); // Return "01" or "00" if 0 is entered twice.
            } else if (value.length > 2 && value[0] === "0") {
              const newValue = value.slice(1);
              return correctTime(newValue); // Return the last 2 digits if the first digit is 0.
            } else if (value.length > 2) {
              const newValue = value.slice(0, 2);
              return correctTime(newValue); // Return the first two digits if more than 2 digits are entered
            }
          } else {
            // If a number isn't entered or the current index isn't
            // equal to the index of the input being edited, it returns
            // the original value.
            return timeInput;
          }
        }

        if (timeInputIndex === index && timeInputIndex === 2) {
          // If "AM" or "PM" is already selected, trying to type adds
          // one more letter to the end of the entered value that is
          // unseen. The state is still only set to "AM" or "PM".
          if (
            value.toLowerCase() === "a" ||
            (value.length > 2 && value[2].toLowerCase() === "a")
          ) {
            return "AM";
          } else if (
            value.toLowerCase() === "p" ||
            (value.length > 2 && value[2].toLowerCase() === "p")
          ) {
            return "PM";
          } else if (value.length > 2 || value.length < 2) {
            return "";
          }
        }
        return timeInput;
      }) as TripleInputState;

      setTimeInput(newState);
    };

  const setPlaceholder = (index: number) => {
    switch (index) {
      case 0:
        return "hr";
      case 1:
        return "min";
      case 2:
        return "--";
    }
  };

  const createTimeOptionArr = (startNum: number, endNum: number) => {
    const numArr = [];
    for (let i = startNum; i <= endNum; i++) {
      numArr.push(i);
    }
    return numArr;
  };

  const createDatalist = (timeElm: string, index: number) => {
    const startNum = 1;
    const endNum = index === 0 ? 12 : 59;
    return (
      <datalist id={timeElm} key={index}>
        {createTimeOptionArr(startNum, endNum).map((num, i) => (
          <option value={num} key={i}>
            {num}
          </option>
        ))}
      </datalist>
    );
  };

  return (
    <>
      <label htmlFor="time">Time: </label>
      <div
        id="timeInputWrapper"
        style={{ width: "fit-content", display: "flex", flexDirection: "row" }}
      >
        {["hour", "minute", "meridiem"].map((timeElm, index) => {
          const insertColon = index === 0;
          return (
            <span
              key={index}
              style={
                insertColon
                  ? { display: "flex", flexGrow: "1" }
                  : { display: "flex" }
              }
            >
              {index < 2 ? (
                createDatalist(timeElm, index)
              ) : (
                <datalist id={timeElm}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </datalist>
              )}
              <input
                list={timeElm}
                name="time"
                onChange={createOnChangeHandler(index)}
                value={timeInput[index]}
                ref={inputRefs[index]}
                onFocus={(e) => {
                  // This makes it so the entire value of the input is
                  // selected when focus is put on the input.
                  e.target.select();
                }}
                placeholder={setPlaceholder(index)}
                style={{
                  border: "none",
                  width: "50px",
                  textAlign: "center",
                }}
                required
              />
              {insertColon ? <div>:</div> : null}
            </span>
          );
        })}
      </div>
    </>
  );
};
