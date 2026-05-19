"use client";

type Props = {
  show: boolean;
};

export default function OfflineBanner({ show }: Props) {
  if (!show) return null;

  return (
    <div className="w-full text-center bg-[#1E1E1E] text-white py-4">
      You are offline
    </div>
  );
}
