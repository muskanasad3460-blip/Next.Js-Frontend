type Props = {
  subtitle: string;
  title: string;
  button?: boolean;
};

export default function SectionHeader({ subtitle, title, button }: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col gap-1">
        {/* Red label */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-[#DB4444] rounded-sm" />

          <p className="text-[#DB4444] text-sm font-semibold tracking-[0.12em] uppercase">
            {subtitle}
          </p>
        </div>

        {/* Main heading (smaller now) */}
        <h2 className="text-2xl md:text-3xl font-semibold text-black leading-snug">
          {title}
        </h2>
      </div>

      {button && (
        <button className="bg-[#DB4444] text-white px-6 py-3 rounded-md hover:bg-[#c93a3a] transition">
          View All
        </button>
      )}
    </div>
  );
}
