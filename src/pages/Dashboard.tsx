import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Clock, CheckCircle2, Sparkles } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 pb-24">
      {/* Header with gradient text */}
      <div className="mb-10 pt-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Field Logger
          </h1>
        </div>
        <p className="text-lg text-muted-foreground font-medium">
          Track your work seamlessly
        </p>
      </div>

      {/* Quick Stats with glassmorphism */}
      <div className="grid grid-cols-2 gap-4 mb-10 animate-slide-up">
        <Card className="glass-card p-6 border-success/20 hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center glow-effect">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <p className="text-4xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground text-center font-medium">
              Jobs Today
            </p>
          </div>
        </Card>

        <Card className="glass-card p-6 border-accent/20 hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <p className="text-4xl font-bold text-foreground">8.5h</p>
            <p className="text-sm text-muted-foreground text-center font-medium">
              Total Time
            </p>
          </div>
        </Card>
      </div>

      {/* Status Card with enhanced styling */}
      <Card className="glass-card p-6 mb-8 border-primary/30 animate-scale-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-success animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-success/30 animate-ping"></div>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Ready to Start
          </h2>
        </div>
        <p className="text-muted-foreground font-medium">
          No active job. Begin a new task below.
        </p>
      </Card>

      {/* Main CTA with gradient and animation */}
      <div className="mb-10 animate-scale-in" style={{ animationDelay: "0.1s" }}>
        <Button
          onClick={() => navigate("/start-job")}
          size="lg"
          className="w-full h-20 text-2xl font-bold gradient-accent hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-lg hover:shadow-2xl touch-target group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-light/0 via-white/20 to-accent-light/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <Play className="mr-3 h-8 w-8 group-hover:scale-110 transition-transform" />
          <span>Start New Job</span>
        </Button>
      </div>

      {/* Recent Jobs with modern cards */}
      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
          Recent Activity
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
        </h3>
        <div className="space-y-4">
          <Card className="glass-card p-5 border-muted hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">North Field</p>
                  <p className="text-sm text-muted-foreground font-medium">Ploughing • 2.5h</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full gradient-success flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass-card p-5 border-muted hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">East Field</p>
                  <p className="text-sm text-muted-foreground font-medium">Sowing • 3.2h</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full gradient-success flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
