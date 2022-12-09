export function SendmagnetEmailInput({
  name = "email",
  onChange,
  id = "email",
  value,
  cardname = null,
}) {
  return (
    <span className="emailFieldWithSuffix flex max-w-[450px]  gap-1 overflow-hidden rounded border border-black bg-white focus-within:border-blue-600 ">
      <input
        type="search"
        onChange={onChange}
        name={name}
        id={id}
        className="remove-default inline flex-1 appearance-none bg-transparent bg-none p-[10px] focus:outline-transparent"
        style={{ textAlign: "right" }}
        value={value || ""}
        data-cardname={cardname ?? ""}
        autoComplete="off"
      />
      <span className="suffix flex-0 m-0 block bg-gray-100 p-[10px] text-gray-600">
        @sendmagnet.com
      </span>
    </span>
  );
}
