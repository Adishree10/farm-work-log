import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, Tractor, Home } from "lucide-react";
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
    // Show success toast
    toast.success("Job Submitted Successfully!", {
      description: "Your work has been recorded.",
      duration: 3000,
    });

    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const jobTypeNames: Record<string, string> = {
    ploughing: "Ploughing",
    sowing: "Sowing",
    spraying: "Spraying"
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Success Header */}
      <div className="pt-8 pb-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Job Completed!
        </h1>
        <p className="text-lg text-muted-foreground">
          Review your details below
        </p>
      </div>

      {/* Summary Cards */}
      <div className="flex-1 space-y-4 mb-6">
        <Card className="p-6 job-card border-muted">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tractor className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Job Type</p>
              <p className="text-2xl font-bold text-foreground">
                {jobTypeNames[jobType]}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 job-card border-muted">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Field Name</p>
              <p className="text-2xl font-bold text-foreground">
                {fieldName}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 job-card border-muted">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-2xl font-bold text-foreground">
                {formatDuration(duration)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 job-card border-muted bg-muted/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
              <p className="text-lg font-semibold text-foreground">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pb-6">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full h-16 text-xl font-bold bg-success hover:bg-success/90 text-success-foreground rounded-2xl touch-target"
        >
          <CheckCircle2 className="mr-3 h-6 w-6" />
          Submit Job
        </Button>

        <Button
          onClick={() => navigate("/")}
          size="lg"
          variant="outline"
          className="w-full h-14 text-lg font-semibold rounded-2xl touch-target"
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default JobSummary;
