import { ChangeEvent } from "react";

type Props = {
  placeholder: string;
  width: string;
  type: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthInput(props: Props) {
  return (
    <input
      {...props}
      onChange={e => props.onChange(e)}
      className={`border rounded p-2 py-3 mx-2 px-2 ${props.width}`}    />
  );
}
