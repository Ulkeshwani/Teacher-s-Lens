interface ButtonProps {
  className?: string | undefined;
  children?: React.ReactNode;
  props?: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  loading? :boolean;
  style?: React.CSSProperties;
  variant?:"text" | "outlined" | "contained" | undefined;
}
