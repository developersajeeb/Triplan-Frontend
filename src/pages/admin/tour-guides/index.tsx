import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const TourGuides = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tour Guides</h1>
                <p className="text-muted-foreground mt-2">Manage and monitor all tour guides</p>
            </div>

            {/* Coming Soon Alert */}
            <Card className="border-2 border-blue-200 bg-blue-50 p-6">
                <div className="flex gap-4">
                    <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-blue-900 text-lg">Coming Soon</h3>
                        <p className="text-sm text-blue-800 mt-2">
                            The tour guides management feature is currently under development. 
                            This section will allow you to view, manage, and monitor all tour guides 
                            associated with your tours.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Feature Preview Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-2">View Tour Guides</h3>
                    <p className="text-sm text-muted-foreground">
                        Browse and search through all registered tour guides with their profiles and ratings.
                    </p>
                </Card>

                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Manage Assignments</h3>
                    <p className="text-sm text-muted-foreground">
                        Assign tour guides to tours and manage their schedules and availability.
                    </p>
                </Card>

                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Performance Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                        Monitor tour guide performance, ratings, and customer reviews.
                    </p>
                </Card>

                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Communication</h3>
                    <p className="text-sm text-muted-foreground">
                        Send notifications and communicate important information to tour guides.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default TourGuides;