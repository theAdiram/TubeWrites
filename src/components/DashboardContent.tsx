
import { Link } from "react-router-dom";
import { FileText, History as HistoryIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardContent = () => {
  const stats = [
    { title: "Papers Generated", value: "10,000+" },
    { title: "Hours Saved", value: "32,000+" },
    { title: "Avg. Citations", value: "3.2" }
  ];
  
  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground mt-1">
              Your AI research assistant is ready to help.
            </p>
          </div>
          <Button asChild>
            <Link to="/generate">
              <FileText className="mr-2 h-4 w-4" />
              Generate New Paper
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="glassmorphism bg-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Cards */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glassmorphism bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generate Paper
              </CardTitle>
              <CardDescription>
                Convert YouTube videos into research papers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Extract valuable insights and transform them into academic-quality documents.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/generate">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="glassmorphism bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HistoryIcon className="h-5 w-5" />
                History
              </CardTitle>
              <CardDescription>
                View your previously generated papers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access your research history and revisit past insights.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/history">View History</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="glassmorphism bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About
              </CardTitle>
              <CardDescription>
                Learn more about our AI research assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover how our technology works and the team behind it.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
