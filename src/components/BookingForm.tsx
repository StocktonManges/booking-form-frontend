import { useEffect, useRef, useState } from "react";
import bsClasses from "../styling/bootstrap-classes";
import { PhoneInputs } from "./PhoneInputs";
import Calendar from "react-calendar";
import { getMinMaxDates } from "../utils.";
import TimeDropDown from "./TimeDropDown";
import { API } from "../api/getData";
import { Character, Package } from "../types";
import RadioInputs from "./RadioInputs";

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

export default function BookingForm() {
  const initialMinDate = getMinMaxDates().twoDaysInAdvance;
  const initialMaxDate = getMinMaxDates().oneYearInAdvance;

  const [hours, setHours] = useState<string>("12");
  const [minutes, setMinutes] = useState<string>("00");
  const [period, setPeriod] = useState<string>("PM");
  const [date, setDate] = useState<DateValue>(initialMinDate);
  const minDateRef = useRef<Date>(initialMinDate);
  const maxDateRef = useRef<Date>(initialMaxDate);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [outdoors, setOutdoors] = useState<string>("no");
  const [charSelection, setCharSelection] = useState<string[]>([]);
  const [packageName, setPackageName] = useState<string>("");

  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allPackages, setAllPackages] = useState<Package[]>([]);

  const multiSelectionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    currSelectionArr: string[],
    setSelectionArrState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const itemIsSelected = currSelectionArr.find(
      (itemName) => itemName === e.target.value
    );
    setSelectionArrState((prev) =>
      !itemIsSelected
        ? [...prev, e.target.value]
        : prev.filter((itemName) => itemName !== e.target.value)
    );
  };

  useEffect(() => {
    API.getCharacters().then((allCharacters) => {
      setAllCharacters(allCharacters);
    });
    API.getPackages().then((allPackages) => {
      setAllPackages(allPackages);
    });

    // Set min and max date prop values for the calendar.
    if (calendarRef.current) {
      calendarRef.current.id = "react-calendar";
    }
    const { twoDaysInAdvance, oneYearInAdvance } = getMinMaxDates();
    if (
      minDateRef.current.getDate() < twoDaysInAdvance.getDate() &&
      minDateRef.current.getFullYear() === twoDaysInAdvance.getFullYear() &&
      minDateRef.current.getMonth() === twoDaysInAdvance.getMonth()
    ) {
      minDateRef.current = twoDaysInAdvance;
    }
    maxDateRef.current = oneYearInAdvance;
  }, []);

  return (
    <section className={"container" + bsClasses.flexColumnCentered}>
      <form
        className={"" + bsClasses.flexColumnCentered}
        action="_blank"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={"p-5 bg-primary" + bsClasses.inputCard}>
          <h2>Booking Form</h2>
          <div>
            Please fill out the form below as accurately as possible. We will
            send an invoice to the email provided within 48 hours of booking,
            within our office hours! All bookings require a $50 booking fee to
            secure the time slot for your party, the rest of the payment is due
            within 48 hours of your event date!
          </div>
        </div>

        <div className="row d-flex w-100">
          <div className={"col-lg-6 col-12" + bsClasses.inputCard}>
            <label className={bsClasses.label} htmlFor="nameInput">
              Parent Name
              <span className="text-danger ps-2">*</span>
            </label>
            <div className="row">
              <div className={"col-md-6 col-12" + bsClasses.inputWrapper}>
                <input
                  className={
                    "singleLineTextInput" + bsClasses.singleLineTextInput
                  }
                  type="text"
                  name="nameInput"
                  id="nameInput"
                  placeholder="First..."
                />
              </div>
              <div className={"col-md-6 col-12" + bsClasses.inputWrapper}>
                <input
                  className={
                    "singleLineTextInput" + bsClasses.singleLineTextInput
                  }
                  type="text"
                  name="nameInput"
                  id="nameInput"
                  placeholder="Last..."
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 d-flex flex-column flex-sm-row">
            <div className={"col-sm-6 col-12" + bsClasses.inputCard}>
              <label className={bsClasses.label} htmlFor="emailInput">
                Email
                <span className="text-danger ps-2">*</span>
              </label>
              <div className={bsClasses.inputWrapper}>
                <input
                  className={
                    "singleLineTextInput" + bsClasses.singleLineTextInput
                  }
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  placeholder="Email..."
                />
              </div>
            </div>

            <div className={"col-sm-6 col-12" + bsClasses.inputCard}>
              <label className={bsClasses.label} htmlFor="phoneInput">
                Phone
                <span className="text-danger ps-2">*</span>
              </label>
              <div className={bsClasses.inputWrapper}>
                <PhoneInputs />
              </div>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-between w-100">
          <div className={"col-12 col-lg-6" + bsClasses.inputCard}>
            <label className={bsClasses.label} htmlFor="dateInput">
              Date of event
              <span className="text-danger ps-2">*</span>
            </label>
            <Calendar
              inputRef={calendarRef}
              onChange={setDate}
              value={date}
              minDate={minDateRef.current}
              maxDate={maxDateRef.current}
              minDetail="month"
              calendarType="gregory" // Makes Sunday the first day of the week.
              tileDisabled={({ date }) => date.getDay() === 0} // Disables Sunday tiles.
            />
          </div>

          <div className="col-12 col-lg-6 d-flex flex-column">
            <div className="my-3 mx-2 d-flex">
              <label className={bsClasses.label} htmlFor="timeInput">
                Time of event
                <span className="text-danger ps-2">*</span>
              </label>
              <div>
                <TimeDropDown
                  hours={hours}
                  setHours={setHours}
                  minutes={minutes}
                  setMinutes={setMinutes}
                  period={period}
                  setPeriod={setPeriod}
                />
              </div>
            </div>

            <div className={bsClasses.inputCard}>
              <label className={bsClasses.label} htmlFor="addressInput">
                Address of venue
                <span className="text-danger ps-2">*</span>
              </label>
              <div className="d-flex flex-column">
                <div className={bsClasses.inputWrapper}>
                  <input
                    className={
                      "singleLineTextInput" + bsClasses.singleLineTextInput
                    }
                    type="text"
                    name="nameInput"
                    id="nameInput"
                    placeholder="Street address..."
                  />
                </div>
                <div
                  className={
                    "d-flex border-bottom border-secondary border-3" +
                    bsClasses.inputWrapper
                  }
                >
                  <input
                    className="singleLineTextInput fs-5 w-100"
                    type="text"
                    name="nameInput"
                    id="nameInput"
                    placeholder="City..."
                  />
                  <span className="fs-4 px-2">Utah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="outdoorsInput">
            Outdoors
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <RadioInputs
              inputName="outdoors"
              arr={["yes", "no"]}
              state={outdoors}
              setState={setOutdoors}
            />
          </div>
        </div>

        <h2>Character Selection</h2>
        <ol>
          {charSelection.map((char) => (
            <li key={char}>{char}</li>
          ))}
        </ol>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="characterInput">
            Character Selection
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <ol>
              {allCharacters.map((character) => (
                <li key={character.name}>
                  <input
                    onChange={(e) => {
                      multiSelectionHandler(e, charSelection, setCharSelection);
                    }}
                    value={character.name}
                    type="checkbox"
                    name={character.name}
                    id={character.name}
                  />
                  <label htmlFor={character.name}>{character.name}</label>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="packageInput">
            Package
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <RadioInputs
              inputName="package"
              arr={allPackages.map((eventPackage) => eventPackage.name)}
              state={packageName}
              setState={setPackageName}
            />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="activityInput">
            Activity
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="participantInput">
            How many participants
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="ageRangeInput">
            Age range
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="childNameInput">
            Child Name
            <span className="text-danger ps-2">*</span>
          </label>
          <div className="d-flex flex-column flex-lg-row">
            <div className={bsClasses.inputWrapper}>
              <input
                className={
                  "singleLineTextInput" + bsClasses.singleLineTextInput
                }
                type="text"
                name="nameInput"
                id="nameInput"
                placeholder="First..."
              />
            </div>
            <div className={bsClasses.inputWrapper}>
              <input
                className={
                  "singleLineTextInput" + bsClasses.singleLineTextInput
                }
                type="text"
                name="nameInput"
                id="nameInput"
                placeholder="Last..."
              />
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="firstEncounterInput">
            First encounter
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="notesInput">
            Notes
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="couponInput">
            Coupon code
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="referralInput">
            Referral code
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="exposureInput">
            How did you find us
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}></div>
        </div>

        <button className="btn btn-primary btn-lg">Submit</button>
      </form>
    </section>
  );
}
