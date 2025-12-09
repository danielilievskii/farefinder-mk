import {useServerHealth} from "@/hooks/useServerHealth.ts";

export const ServerStatusBanner = () => {
  const { isOnline, isChecking } = useServerHealth();

  if (isOnline && !isChecking) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-5 flex items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-ping absolute"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full relative"></div>
        </div>
        <div className="text-md font-medium">
          {isChecking ? 'Checking server status...' : 'Server is starting up, this will take a few seconds...'}
        </div>
      </div>
    </div>
  );
};