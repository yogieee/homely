import LoadingMark from "@/components/LoadingMark";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200]">
      <LoadingMark />
    </div>
  );
}
