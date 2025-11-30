interface IconCardProps {
  icon: string;
  label: string;
}

export function IconCard({ icon, label }: IconCardProps) {
  return (
    <div className="bg-white border-l-3 border-b-3 border-t border-r border-black p-8 flex flex-col justify-between items-start gap-6 h-full">
      <img src={icon} alt="Icon" className="w-[200px]" />
      <h3 className="text-4xl font-semibold text-black">{label}</h3>
    </div>
  );
}
