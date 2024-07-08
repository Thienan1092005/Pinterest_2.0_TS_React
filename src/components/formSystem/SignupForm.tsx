import RoundedButton from "../customUi/RoundedButton";
interface IProps {
  onclose?: () => void;
}
export default function SignupForm({ onclose }: IProps) {
  return (
    <div className="  rounded-3xl pt-5 px-[10px]  bg-white">
      <RoundedButton onClick={onclose}> tat form</RoundedButton>
    </div>
  );
}
