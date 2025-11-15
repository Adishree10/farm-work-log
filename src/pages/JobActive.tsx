import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pause, Square, Clock, Play } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6 flex flex-col">
      {/* Status Header */}
      <div className="pt-10 pb-6 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className={`w-5 h-5 rounded-full ${isPaused ? 'bg-paused' : 'bg-active animate-pulse'}`}></div>
            {!isPaused && (
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-active/30 animate-ping"></div>
            )}
          </div>
          <h2 className="text-xl font-bold text-muted-foreground">
            {isPaused ? "Paused" : "In Progress"}
          </h2>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          {jobTypeNames[jobType]}
        </h1>
        <p className="text-2xl text-muted-foreground font-semibold">
          {fieldName}
        </p>
      </div>

      {/* Timer Card with glassmorphism */}
      <div className="flex-1 flex items-center justify-center py-10">
        <Card className={`
          glass-card p-12 w-full max-w-sm
          transition-all duration-500 animate-scale-in
          ${isPaused 
            ? 'border-paused/40 border-2' 
            : 'border-active/40 border-2 animate-pulse-glow'
          }
        `}>
          <div className="text-center">
            <div className={`
              w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center
              ${isPaused ? 'gradient-accent' : 'gradient-primary'}
              shadow-lg transition-all duration-500
            `}>
              <Clock className="w-10 h-10 text-white" />
            </div>
            <p className="text-7xl font-bold text-foreground mb-6 tabular-nums tracking-tight">
              {formatTime(seconds)}
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-paused' : 'bg-active animate-pulse'}`}></div>
              <p className="text-lg text-muted-foreground font-semibold">
                {isPaused ? 'Timer Paused' : 'Recording Time'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Control Buttons with modern styling */}
      <div className="space-y-4 pb-8 animate-slide-up">
        <Button
          onClick={() => setIsPaused(!isPaused)}
          size="lg"
          className={`
            w-full h-16 text-xl font-bold rounded-3xl touch-target
            transition-all duration-300 relative overflow-hidden group
            hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl
            ${isPaused 
              ? 'gradient-primary text-white' 
              : 'gradient-accent text-white'
            }
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          {isPaused ? (
            <>
              <Play className="mr-3 h-6 w-6 relative" />
              <span className="relative">Resume Job</span>
            </>
          ) : (
            <>
              <Pause className="mr-3 h-6 w-6 relative" />
              <span className="relative">Pause Job</span>
            </>
          )}
        </Button>

        <Button
          onClick={handleStopJob}
          size="lg"
          className="w-full h-16 text-xl font-bold rounded-3xl touch-target bg-destructive hover:bg-destructive/90 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-2xl"
        >
          <Square className="mr-3 h-6 w-6" />
          Stop & Complete
        </Button>
      </div>
    </div>
  );
};

export default JobActive;
