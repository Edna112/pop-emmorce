export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-gray-50/80">
      <div className="relative flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full border-4 border-[#FF6B35]/20 border-t-[#FF6B35] animate-spin"
          aria-hidden
        />
        <span className="absolute text-[#FF6B35] text-xl font-bold">Y</span>
      </div>
      <div className="text-center space-y-1">
        <p className="text-gray-700 font-medium">Loading</p>
        <p className="text-sm text-gray-500">Please wait a moment...</p>
      </div>
      <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full w-10 bg-[#FF6B35] rounded-full animate-loading-bar"
        />
      </div>
    </div>
  );
}
