import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

const JobDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobType = searchParams.get("type") || "ploughing";
  
  const [fieldName, setFieldName] = useState("");

  const handleStartJob = () => {
    if (fieldName.trim()) {
      navigate(`/job-active?type=${jobType}&field=${encodeURIComponent(fieldName)}`);
    }
  };

  const jobTypeNames: Record<string, string> = {
    ploughing: "Ploughing",
    sowing: "Sowing",
    spraying: "Spraying"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pt-6 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="touch-target rounded-2xl hover:bg-primary/10 hover:scale-110 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          Job Details
        </h1>
      </div>

      {/* Selected Job Type Display */}
      <Card className="glass-card p-7 mb-8 border-primary/30 animate-scale-in">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">Selected Task</p>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            {jobTypeNames[jobType]}
          </p>
        </div>
      </Card>

      {/* Form with modern styling */}
      <div className="space-y-7 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="space-y-3">
          <Label htmlFor="fieldName" className="text-lg font-bold text-foreground flex items-center gap-2">
            Field Name
            <span className="text-primary">*</span>
          </Label>
          <Input
            id="fieldName"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="e.g., North Field"
            className="h-16 text-lg rounded-2xl glass-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="notes" className="text-lg font-bold text-foreground">
            Notes <span className="text-sm text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Textarea
            id="notes"
            placeholder="Add any additional details..."
            className="min-h-[140px] text-lg rounded-2xl glass-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-medium"
          />
        </div>
      </div>

      {/* Start Button */}
      <div className="mt-12 animate-scale-in" style={{ animationDelay: "0.2s" }}>
        <Button
          onClick={handleStartJob}
          disabled={!fieldName.trim()}
          size="lg"
          className={`
            w-full h-16 text-xl font-bold rounded-3xl touch-target
            transition-all duration-300 relative overflow-hidden group
            ${fieldName.trim()
              ? 'gradient-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl glow-effect' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          {fieldName.trim() && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-light/0 via-white/20 to-primary-light/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          )}
          <span className="relative">Start Job</span>
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
