export default function RadioInputs({
  inputName,
  arr,
  state,
  setState,
}: {
  inputName: string;
  arr: string[];
  state: string | boolean;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="radio-wrapper">
      {arr.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            name={inputName}
            id={item}
            onChange={(e) => {
              if (state !== item) {
                setState(e.target.id);
              }
            }}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  );
}
