import { ChangeEvent } from "react";

import AuthInput from "./AuthInput";

type Props = {
  isSignIn: boolean;
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthForm({
  inputs,
  handleChangeInput,
  isSignIn,
}: Props) {
  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex jestify-between text-sm">
          <AuthInput
            placeholder="First Name"
            type="text"
            width="w-[49%]"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChangeInput}
          />
          <AuthInput
            placeholder="Last Name"
            type="text"
            width="w-[49%]"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="my-3 flex jestify-between text-sm">
        <AuthInput
          placeholder="Email"
          type="email"
          width="w-full"
          name="email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex jestify-between text-sm">
          <AuthInput
            placeholder="Phone"
            type="text"
            width="w-[49%]"
            name="phone"
            value={inputs.phone}
            onChange={handleChangeInput}
          />
          <AuthInput
            placeholder="City"
            type="text"
            width="w-[49%]"
            name="city"
            value={inputs.city}
            onChange={handleChangeInput}
          />
        </div>
      )}

      <div className="my-3 flex jestify-between text-sm">
        <AuthInput
          placeholder="Password"
          type="password"
          width="w-full"
          name="password"
          value={inputs.password}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}
