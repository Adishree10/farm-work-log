import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, Tractor, Home, Sparkles } from "lucide-react";
import { toast } from "sonner";

const JobSummary = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobType = searchParams.get("type") || "ploughing";
  const fieldName = searchParams.get("field") || "Unknown Field";
  const duration = parseInt(searchParams.get("duration") || "0");

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleSubmit = () => {
    toast.success("Job Submitted Successfully!", {
      description: "Your work has been recorded.",
      duration: 3000,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const jobTypeNames: Record<string, string> = {
    ploughing: "Ploughing",
    sowing: "Sowing",
    spraying: "Spraying"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-success/5 p-6 flex flex-col">
      <div className="pt-10 pb-8 text-center animate-scale-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl gradient-success flex items-center justify-center shadow-lg glow-effect">
          <CheckCircle2 className="w-14 h-14 text-white animate-bounce" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <h1 className="text-4xl font-bold text-foreground">Job Completed!</h1>
          <Sparkles className="w-6 h-6 text-success animate-pulse" />
        </div>
        <p className="text-xl text-muted-foreground font-medium">Review your details</p>
      </div>

      <div className="flex-1 space-y-5 mb-8">
        <Card className="glass-card p-6 border-primary/20 hover:scale-[1.01] transition-all duration-300 animate-slide-up">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg flex-shrink-0">
              <Tractor className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Job Type</p>
              <p className="text-3xl font-bold text-foreground">{jobTypeNames[jobType]}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-accent/20 hover:scale-[1.01] transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg flex-shrink-0">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Field Name</p>
              <p className="text-3xl font-bold text-foreground">{fieldName}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-success/20 hover:scale-[1.01] transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center shadow-lg flex-shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Duration</p>
              <p className="text-3xl font-bold text-foreground">{formatDuration(duration)}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-muted bg-muted/20 hover:scale-[1.01] transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-md flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-semibold mb-2 uppercase tracking-wide">Completed At</p>
              <p className="text-xl font-bold text-foreground">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4 pb-8 animate-scale-in" style={{ animationDelay: "0.4s" }}>
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full h-16 text-xl font-bold gradient-success hover:scale-[1.02] active:scale-[0.98] rounded-3xl touch-target shadow-lg hover:shadow-2xl glow-effect relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <CheckCircle2 className="mr-3 h-6 w-6 relative group-hover:scale-110 transition-transform" />
          <span className="relative">Submit Job</span>
        </Button>

        <Button
          onClick={() => navigate("/")}
          size="lg"
          variant="outline"
          className="w-full h-14 text-lg font-semibold rounded-3xl touch-target glass-card border-border hover:border-primary hover:scale-[1.02] transition-all duration-300"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default JobSummary;
