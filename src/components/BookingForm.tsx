import { useEffect, useRef, useState } from "react";
import bsClasses from "../styling/bootstrap-classes";
import { PhoneInputs } from "./PhoneInputs";
import Calendar from "react-calendar";
import { getMinMaxDates } from "../utils";
import TimeDropDown from "./TimeDropDown";
import { API } from "../api/getData";
import {
  Activity,
  Character,
  IncompatibleActivitiesAndPackages,
  Package,
} from "../types";

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const foundUsMethodsArr = [
  "Facebook",
  "Instagram",
  "County Fair",
  "Classic Fun Center",
  "Word of mouth",
  "Other",
];

export default function BookingForm() {
  const initialMinDate = getMinMaxDates().twoDaysInAdvance;
  const initialMaxDate = getMinMaxDates().oneYearInAdvance;
  const minDateRef = useRef<Date>(initialMinDate);
  const maxDateRef = useRef<Date>(initialMaxDate);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [parentFirstName, setParentFirstName] = useState<string>("");
  const [parentLastName, setParentLastName] = useState<string>("");
  const [childFirstName, setChildFirstName] = useState<string>("");
  const [childLastName, setChildLastName] = useState<string>("");
  const [childAge, setChildAge] = useState<number>("");
  const [hours, setHours] = useState<string>("12");
  const [minutes, setMinutes] = useState<string>("00");
  const [period, setPeriod] = useState<string>("PM");
  const [date, setDate] = useState<DateValue>(initialMinDate);
  const [outdoors, setOutdoors] = useState<boolean>(false);
  const [charSelection, setCharSelection] = useState<string[]>([]);
  const [activitySelection, setActivitySelection] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package>({
    id: -1,
    name: "",
    activityCount: 0,
  });
  const [incompatibleActivityIds, setIncompatibleActivityIds] = useState<
    number[]
  >([]);
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [firstEncounter, setFirstEncounter] = useState<string>("");
  const [foundUsMethod, setFoundUsMethod] = useState<string>("");
  const [otherInput, setOtherInput] = useState<string | null>(null);

  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [allIncompatiblePairs, setAllIncompatiblePairs] = useState<
    IncompatibleActivitiesAndPackages[]
  >([]);

  const multiSelectionHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    currSelectionArr: string[],
    setSelectionArrState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const itemIsSelected = currSelectionArr.find(
      (itemName) => itemName === e.target.id
    );
    setSelectionArrState((prev) =>
      !itemIsSelected
        ? [...prev, e.target.id]
        : prev.filter((itemName) => itemName !== e.target.id)
    );
  };

  // Display "face paint" last.
  const sortActivities = (activities: Activity[]) => {
    return activities.sort((a, b) => {
      if (a.name === "face paint") return 1;
      if (b.name === "face paint") return -1;
      return a.name.localeCompare(b.name);
    });
  };

  useEffect(() => {
    setOtherInput(null);
  }, [foundUsMethod]);

  useEffect(() => {
    // Reset the activity selection.
    setActivitySelection([]);

    // Update the list of activities that are not compatible with the
    // current selected package.
    const incompatibleActivityIds = allIncompatiblePairs
      .filter((item) => item.packageId === selectedPackage.id)
      .map((item) => item.activityId);
    setIncompatibleActivityIds(incompatibleActivityIds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage]);

  useEffect(() => {
    API.getCharacters().then((allCharacters) => {
      setAllCharacters(
        allCharacters.sort((a, b) => a.name.localeCompare(b.name))
      );
    });
    API.getPackages().then((allPackages) => {
      setAllPackages(allPackages);
    });
    API.getActivities().then((allActivities) => {
      setAllActivities(sortActivities(allActivities));
    });
    API.getIncompatibleActivitiesAndPackages().then((allData) => {
      setAllIncompatiblePairs(allData);
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
              Parent Name:
              <span className="text-danger ps-2">*</span>
            </label>
            <div className="row">
              <div className={"col-md-6 col-12" + bsClasses.inputWrapper}>
                <input
                  className={
                    "singleLineTextInput" + bsClasses.singleLineTextInput
                  }
                  type="text"
                  name="parentFirstName"
                  placeholder="First..."
                  value={parentFirstName}
                  onChange={(e) => {
                    setParentFirstName(e.target.value);
                  }}
                />
              </div>
              <div className={"col-md-6 col-12" + bsClasses.inputWrapper}>
                <input
                  className={
                    "singleLineTextInput" + bsClasses.singleLineTextInput
                  }
                  type="text"
                  name="parentLastName"
                  placeholder="Last..."
                  value={parentLastName}
                  onChange={(e) => {
                    setParentLastName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 d-flex flex-column flex-sm-row">
            <div className={"col-sm-6 col-12" + bsClasses.inputCard}>
              <label className={bsClasses.label} htmlFor="emailInput">
                Email:
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
                Phone:
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
              Date of event:
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
                Time of event:
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
                Address of venue:
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
            <div>Will the party be indoors or outdoors?</div>
            <div className="fs-4">
              Please remember that our costumes can be extra hot in the summer
              and take temperature into consideration.
            </div>
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <div className="radio-wrapper">
              {["yes", "no"].map((item, index) => (
                <div key={"outdoors" + index}>
                  <input
                    type="radio"
                    name="outdoors"
                    id={item}
                    onChange={(e) => {
                      setOutdoors(e.target.id === "yes");
                    }}
                    checked={
                      (item === "yes" && outdoors) ||
                      (item === "no" && !outdoors)
                    }
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="characterInput">
            Character(s):
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
            Package:
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <div className="radio-wrapper">
              {allPackages.map((packageItem) => (
                <div key={packageItem.name}>
                  <input
                    type="radio"
                    name="package"
                    id={packageItem.name}
                    onChange={() => {
                      if (selectedPackage !== packageItem) {
                        setSelectedPackage(packageItem);
                      }
                    }}
                    checked={packageItem.name === selectedPackage.name}
                  />
                  <label htmlFor={packageItem.name}>{packageItem.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="activityInput">
            Select your activity / activities:
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <ol>
              {allActivities.map((activity) => (
                <li key={activity.name}>
                  <input
                    onChange={(e) => {
                      multiSelectionHandler(
                        e,
                        activitySelection,
                        setActivitySelection
                      );
                    }}
                    type="checkbox"
                    name={activity.name}
                    id={activity.name}
                    disabled={
                      // Activity is incompatible with selectedPackage
                      incompatibleActivityIds.includes(activity.id) ||
                      // Maximum number of activities is selected
                      (activitySelection.length ===
                        selectedPackage.activityCount &&
                        !activitySelection.includes(activity.name))
                    }
                    checked={activitySelection.includes(activity.name)}
                  />
                  <label htmlFor={activity.name}>
                    {activity.name === "face paint"
                      ? activity.name + " (not applicable to Wish package)"
                      : activity.name}
                  </label>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="participantInput">
            How many (participating) guests?
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <input
              type="number"
              name="participantCount"
              value={participantCount}
              onChange={(e) => {
                setParticipantCount(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="ageRangeInput">
            What is the age range of the guests?
            <span className="text-danger ps-2">*</span>
            <div className="fs-4">(youngest to oldest)</div>
          </label>
          <div className={bsClasses.inputWrapper}>
            <div>
              <input
                type="number"
                name="minAge"
                value={minAge}
                onChange={(e) => {
                  setMinAge(Number(e.target.value));
                }}
              />
              <span>to</span>
              <input
                type="number"
                name="maxAge"
                value={maxAge}
                onChange={(e) => {
                  setMaxAge(Number(e.target.value));
                }}
              />
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="childNameInput">
            What is the birthday child's name?
            <span className="text-danger ps-2">*</span>
          </label>
          <div className="d-flex flex-column flex-lg-row">
            <div className={bsClasses.inputWrapper}>
              <input
                className={
                  "singleLineTextInput" + bsClasses.singleLineTextInput
                }
                type="text"
                name="childFirstName"
                placeholder="First..."
                value={childFirstName}
                onChange={(e) => {
                  setChildFirstName(e.target.value);
                }}
              />
            </div>
            <div className={bsClasses.inputWrapper}>
              <input
                className={
                  "singleLineTextInput" + bsClasses.singleLineTextInput
                }
                type="text"
                name="childLastName"
                placeholder="Last..."
                value={childLastName}
                onChange={(e) => {
                  setChildLastName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="childAge">
            What is the birthday child's age?
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <input
              type="number"
              name="childAge"
              id="childAge"
              value={childAge}
              onChange={(e) => {
                setChildAge(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="firstEncounterInput">
            Has the birthday child met the character(s) before? We don't want
            the character(s) to forget them!
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <textarea
              name="firstEncounter"
              id="firstEncounter"
              value={firstEncounter}
              onChange={(e) => {
                setFirstEncounter(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="notesInput">
            Any notes for the performer?
          </label>
          <div className={bsClasses.inputWrapper}>
            <textarea
              name="notes"
              id="notes"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="couponInput">
            Coupon code:
          </label>
          <div className={bsClasses.inputWrapper}>
            <input
              type="text"
              name="couponInput"
              id="couponInput"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <label className={bsClasses.label} htmlFor="exposureInput">
            How did you hear about us?
            <span className="text-danger ps-2">*</span>
          </label>
          <div className={bsClasses.inputWrapper}>
            <ul>
              {foundUsMethodsArr.map((method) => (
                <li key={method}>
                  <input
                    type="radio"
                    name="foundUsMethods"
                    id={method}
                    onChange={(e) => {
                      setFoundUsMethod(e.target.id);
                    }}
                  />
                  <span>
                    <label htmlFor={method}>{method}</label>
                    <span>
                      {method.toLowerCase().includes("other") && (
                        <input
                          type="text"
                          name="otherInput"
                          value={otherInput ? otherInput : ""}
                          onChange={(e) => {
                            setOtherInput(e.target.value);
                          }}
                          disabled={foundUsMethod !== method}
                        />
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="btn btn-primary btn-lg">Submit</button>
      </form>
    </section>
  );
}
