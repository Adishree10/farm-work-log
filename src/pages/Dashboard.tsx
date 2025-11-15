import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Clock, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Field Work Logger
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your daily tasks
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-6 job-card border-primary/20">
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle2 className="w-10 h-10 text-success" />
            <p className="text-3xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground text-center">
              Jobs Today
            </p>
          </div>
        </Card>

        <Card className="p-6 job-card border-primary/20">
          <div className="flex flex-col items-center justify-center gap-2">
            <Clock className="w-10 h-10 text-accent" />
            <p className="text-3xl font-bold text-foreground">8.5h</p>
            <p className="text-sm text-muted-foreground text-center">
              Total Hours
            </p>
          </div>
        </Card>
      </div>

      {/* Current Status */}
      <Card className="p-6 mb-6 job-card border-muted">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Status: Ready
          </h2>
        </div>
        <p className="text-muted-foreground">
          No active job. Start a new task below.
        </p>
      </Card>

      {/* Main Action Button */}
      <Button
        onClick={() => navigate("/start-job")}
        size="lg"
        className="w-full h-20 text-2xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl shadow-lg touch-target"
      >
        <Play className="mr-3 h-8 w-8" />
        Start New Job
      </Button>

      {/* Recent Jobs (simplified) */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Jobs
        </h3>
        <div className="space-y-3">
          <Card className="p-4 job-card border-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">North Field</p>
                <p className="text-sm text-muted-foreground">Ploughing • 2.5h</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </Card>

          <Card className="p-4 job-card border-muted">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">East Field</p>
                <p className="text-sm text-muted-foreground">Sowing • 3.2h</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
