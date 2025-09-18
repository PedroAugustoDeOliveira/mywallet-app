import React from "react";
import styled from "styled-components";
import {
  AiFillEye as EyeIconType,
  AiFillEyeInvisible as EyeInvisibleIconType,
} from "react-icons/ai";

const AiFillEye = EyeIconType as unknown as React.FC<{ size?: number }>;
const AiFillEyeInvisible = EyeInvisibleIconType as unknown as React.FC<{
  size?: number;
}>;

type inputProps = {
  type: string;
  placeholder: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
}: inputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  return (
    <InputWrapper>
      <StyledInput
        type={isPassword && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <EyeIcon onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <AiFillEyeInvisible size={22} />
          ) : (
            <AiFillEye size={22} />
          )}
        </EyeIcon>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
`;

const StyledInput = styled.input`
  width: 326px;
  height: 56px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-weight: 400;
  padding-left: 10px;
  font-family: "Raleway", sans-serif;
`;
