import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pause, Square, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const JobActive = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobType = searchParams.get("type") || "ploughing";
  const fieldName = searchParams.get("field") || "Unknown Field";
  
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStopJob = () => {
    navigate(`/job-summary?type=${jobType}&field=${encodeURIComponent(fieldName)}&duration=${seconds}`);
  };

  const jobTypeNames: Record<string, string> = {
    ploughing: "Ploughing",
    sowing: "Sowing",
    spraying: "Spraying"
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Status Header */}
      <div className="pt-8 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className={`w-4 h-4 rounded-full ${isPaused ? 'bg-paused' : 'bg-active animate-pulse'}`}></div>
          <h2 className="text-lg font-semibold text-muted-foreground">
            {isPaused ? "Paused" : "Job In Progress"}
          </h2>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {jobTypeNames[jobType]}
        </h1>
        <p className="text-xl text-muted-foreground">
          {fieldName}
        </p>
      </div>

      {/* Timer Card */}
      <div className="flex-1 flex items-center justify-center py-8">
        <Card className={`
          p-12 job-card w-full max-w-sm
          ${isPaused ? 'border-paused border-4' : 'border-active border-4'}
        `}>
          <div className="text-center">
            <Clock className={`w-16 h-16 mx-auto mb-6 ${isPaused ? 'text-paused' : 'text-active'}`} />
            <p className="text-6xl font-bold text-foreground mb-4 tabular-nums">
              {formatTime(seconds)}
            </p>
            <p className="text-lg text-muted-foreground">
              Duration
            </p>
          </div>
        </Card>
      </div>

      {/* Control Buttons */}
      <div className="space-y-4 pb-6">
        <Button
          onClick={() => setIsPaused(!isPaused)}
          size="lg"
          variant="outline"
          className={`
            w-full h-16 text-xl font-bold rounded-2xl border-2 touch-target
            ${isPaused 
              ? 'bg-active hover:bg-active/90 text-active-foreground border-active' 
              : 'bg-paused hover:bg-paused/90 text-paused-foreground border-paused'
            }
          `}
        >
          <Pause className="mr-3 h-6 w-6" />
          {isPaused ? "Resume Job" : "Pause Job"}
        </Button>

        <Button
          onClick={handleStopJob}
          size="lg"
          variant="destructive"
          className="w-full h-16 text-xl font-bold rounded-2xl touch-target"
        >
          <Square className="mr-3 h-6 w-6" />
          Stop & Complete
        </Button>
      </div>
    </div>
  );
};

export default JobActive;
