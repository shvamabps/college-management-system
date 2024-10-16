"use client";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-teal-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}
