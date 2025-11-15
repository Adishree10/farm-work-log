import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="touch-target"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          Job Details
        </h1>
      </div>

      {/* Selected Job Type Display */}
      <Card className="p-6 mb-6 job-card border-primary/30 bg-primary/5">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Job Type</p>
          <p className="text-2xl font-bold text-primary">
            {jobTypeNames[jobType]}
          </p>
        </div>
      </Card>

      {/* Form */}
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="fieldName" className="text-lg font-semibold">
            Field Name *
          </Label>
          <Input
            id="fieldName"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="e.g., North Field"
            className="h-14 text-lg rounded-xl"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="notes" className="text-lg font-semibold">
            Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Add any additional details..."
            className="min-h-[120px] text-lg rounded-xl resize-none"
          />
        </div>
      </div>

      {/* Start Button */}
      <div className="mt-12">
        <Button
          onClick={handleStartJob}
          disabled={!fieldName.trim()}
          size="lg"
          className="w-full h-16 text-xl font-bold bg-active hover:bg-active/90 text-active-foreground rounded-2xl disabled:opacity-50 touch-target"
        >
          Start Job
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
