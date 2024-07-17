export default function FullRondedBtn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="flex transition-all duration-500 justify-center items-center text-[20px] rounded-full bg-white hover:bg-gray-300 w-12 h-12">
      {children}
    </button>
  );
}
