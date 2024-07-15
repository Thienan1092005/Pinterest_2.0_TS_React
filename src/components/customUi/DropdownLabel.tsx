import { DropdownItem } from "@nextui-org/react";

export default function DropdownLabel({ labelName }: { labelName: string }) {
  return (
    <DropdownItem>
      <label className=" font-sf-bold">{labelName}</label>
    </DropdownItem>
  );
}
