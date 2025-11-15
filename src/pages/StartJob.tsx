import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tractor, Sprout, Droplets } from "lucide-react";
import { useState } from "react";

const jobTypes = [
  {
    id: "ploughing",
    name: "Ploughing",
    icon: Tractor,
    color: "bg-primary",
    description: "Prepare soil"
  },
  {
    id: "sowing",
    name: "Sowing",
    icon: Sprout,
    color: "bg-success",
    description: "Plant seeds"
  },
  {
    id: "spraying",
    name: "Spraying",
    icon: Droplets,
    color: "bg-accent",
    description: "Apply treatment"
  }
];

const StartJob = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const handleContinue = () => {
    if (selectedJob) {
      navigate(`/job-details?type=${selectedJob}`);
    }
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
          Select Job Type
        </h1>
      </div>

      {/* Job Type Cards */}
      <div className="space-y-4 mb-8">
        {jobTypes.map((job) => {
          const Icon = job.icon;
          const isSelected = selectedJob === job.id;
          
          return (
            <Card
              key={job.id}
              onClick={() => handleJobSelect(job.id)}
              className={`
                p-6 job-card cursor-pointer transition-all
                ${isSelected 
                  ? 'border-primary border-4 shadow-lg scale-[1.02]' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`${job.color} p-4 rounded-xl`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {job.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {job.description}
                  </p>
                </div>
                <div className={`
                  w-7 h-7 rounded-full border-4 transition-all
                  ${isSelected 
                    ? 'bg-primary border-primary' 
                    : 'border-muted'
                  }
                `}>
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedJob}
        size="lg"
        className="w-full h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl disabled:opacity-50 touch-target"
      >
        Continue
      </Button>
    </div>
  );
};

export default StartJob;
