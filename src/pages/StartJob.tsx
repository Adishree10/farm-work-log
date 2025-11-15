import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tractor, Sprout, Droplets, Sparkles } from "lucide-react";
import { useState } from "react";

const jobTypes = [
  {
    id: "ploughing",
    name: "Ploughing",
    icon: Tractor,
    gradient: "from-primary via-primary-light to-primary-dark",
    description: "Prepare soil"
  },
  {
    id: "sowing",
    name: "Sowing",
    icon: Sprout,
    gradient: "from-success via-success-glow to-success",
    description: "Plant seeds"
  },
  {
    id: "spraying",
    name: "Spraying",
    icon: Droplets,
    gradient: "from-accent via-accent-light to-accent",
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
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">
            Select Task
          </h1>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>
      </div>

      {/* Job Type Cards */}
      <div className="space-y-5 mb-10">
        {jobTypes.map((job, index) => {
          const Icon = job.icon;
          const isSelected = selectedJob === job.id;
          
          return (
            <Card
              key={job.id}
              onClick={() => handleJobSelect(job.id)}
              className={`
                glass-card p-6 cursor-pointer transition-all duration-300 animate-slide-up
                ${isSelected 
                  ? 'border-primary border-2 shadow-xl scale-[1.02] glow-effect' 
                  : 'border-border hover:border-primary/50 hover:scale-[1.01]'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-5">
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br ${job.gradient} 
                  flex items-center justify-center shadow-lg
                  ${isSelected ? 'scale-110' : 'scale-100'}
                  transition-transform duration-300
                `}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {job.name}
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    {job.description}
                  </p>
                </div>
                <div className={`
                  w-8 h-8 rounded-full border-4 transition-all duration-300
                  ${isSelected 
                    ? 'bg-primary border-primary scale-110' 
                    : 'border-muted'
                  }
                `}>
                  {isSelected && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="animate-scale-in">
        <Button
          onClick={handleContinue}
          disabled={!selectedJob}
          size="lg"
          className={`
            w-full h-16 text-xl font-bold rounded-3xl touch-target
            transition-all duration-300 relative overflow-hidden group
            ${selectedJob 
              ? 'gradient-accent hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-2xl' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
            }
          `}
        >
          {selectedJob && (
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light/0 via-white/20 to-accent-light/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          )}
          <span className="relative">Continue</span>
        </Button>
      </div>
    </div>
  );
};

export default StartJob;
