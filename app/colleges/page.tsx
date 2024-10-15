"use client";

import CollegeForm from "@/components/college-form";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const CollegeRegistrationPage = () => {
  const colleges = useQuery(api.college.getColleges);

  if (colleges) console.log("colleges", colleges);

  return <CollegeForm />;
};

export default CollegeRegistrationPage;
