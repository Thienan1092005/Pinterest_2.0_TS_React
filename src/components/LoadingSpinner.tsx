import { Spinner, SpinnerProps } from "@nextui-org/react";

interface IProps extends SpinnerProps {}

export default function LoadingSpinner<P extends IProps>({ ...rest }: P) {
  return (
    <div className="text-center">
      <Spinner color="danger" size="lg" {...rest} />
    </div>
  );
}
