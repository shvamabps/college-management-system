"use client";

import { BarChart, BookOpen, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

const Dashboard = () => {
  const { user } = useUser();
  const totalCollege = useQuery(api.college.getColleges);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user?.firstName || user?.username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Colleges"
          value={totalCollege ? "" + totalCollege?.length : "0"}
          icon={<GraduationCap className="h-8 w-8" />}
          loading={false}
        />
        <DashboardCard
          title="Total Students"
          value="5,234"
          icon={<Users className="h-8 w-8" />}
          loading={false}
        />
        <DashboardCard
          title="Courses Offered"
          value="42"
          icon={<BookOpen className="h-8 w-8" />}
          loading={false}
        />
        <DashboardCard
          title="Upcoming Events"
          value="3"
          icon={<BarChart className="h-8 w-8" />}
          loading={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/colleges">Register New College</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/students">Manage Students</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/courses">Manage Courses</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/events">Schedule Event</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>New college registered: ABC University</li>
              <li>Course update: Introduction to Computer Science</li>
              <li>New event scheduled: Annual Sports Meet</li>
              <li>Student enrollment completed for Fall 2023</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
