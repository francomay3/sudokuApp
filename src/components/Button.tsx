import styled from "styled-components";

const Wrapper = styled.button<{ active?: boolean }>`
  align-items: center;
  background-color: #eaeef5;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  border-radius: 0.5rem;
  color: #325ab0;
  font-size: 16px;
  border: 2px solid ${({ active }) => (active ? "#92b1e6" : "transparent")};
  text-underline-offset: 0.2rem;

  &:hover {
    background-color: #f4f6f9;
  }
  &:active {
    background-color: #d1d8e3;
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  active?: boolean;
}

const Button = ({
  className,
  style,
  disabled,
  children,
  onClick,
  active,
}: ButtonProps) => {
  return (
    <Wrapper
      active={active}
      className={className}
      onClick={disabled ? undefined : onClick}
      style={style}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
