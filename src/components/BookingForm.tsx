import bsClasses from "../styling/bootstrap-classes";
import { PhoneInputs } from "./PhoneInputs";

export default function BookingForm() {
  return (
    <section className={"container" + bsClasses.flexColumnCentered}>
      <form
        className={"w-75" + bsClasses.flexColumnCentered}
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
            within our office hours! 9All bookings require a $50 booking fee to
            secure the time slot for your party, the rest of the payment is due
            within 48 hours of your event date!
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="emailInput">
              Email
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <input
              className={"singleLineTextInput" + bsClasses.singleLineTextInput}
              type="email"
              name="emailInput"
              id="emailInput"
              placeholder="Email..."
            />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="nameInput">
              Parent Name
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
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
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="phoneInput">
              Phone
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="dateInput">
              Date of event
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="timeInput">
              Time of event
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="addressInput">
              Address of venue
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="indoorsInput">
              Indoors
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="characterInput">
              Character Selection
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="packageInput">
              Package
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="activityInput">
              Activity
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="participantInput">
              How many participants
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="ageRangeInput">
              Age range
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="childNameInput">
              Child Name
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
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
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="firstEncounterInput">
              First encounter
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="notesInput">
              Notes
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="couponInput">
              Coupon code
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="referralInput">
              Referral code
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <div className={bsClasses.inputCard}>
          <div className="bg-primary py-3 px-5">
            <label className={bsClasses.label} htmlFor="exposureInput">
              How did you find us
              <span className="text-danger ps-2">*</span>
            </label>
          </div>
          <div className={bsClasses.inputWrapper}>
            <PhoneInputs />
          </div>
        </div>

        <button className="btn btn-primary btn-lg">Submit</button>
      </form>
    </section>
  );
}
