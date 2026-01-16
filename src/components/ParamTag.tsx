type ParamTagProps = {
  onClick: () => void;
  condition: boolean;
  children: React.ReactNode;
};

export default function ParamTag({
  condition,
  children,
  onClick,
}: ParamTagProps) {
  return (
    <span
      onClick={onClick}
      className={`${
        condition && "bg-terra-accent-bg text-terra font-bold"
      } bg-terra-white p-2 capitalize text-terra text-xs text-center border border-terra rounded-lg cursor-pointer active:bg-terra-accent-bg active:text-terra lg:hover:bg-terra-accent-bg lg:hover:text-terra`}
    >
      {children}
    </span>
  );
}
