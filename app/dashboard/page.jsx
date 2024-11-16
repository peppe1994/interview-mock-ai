'use client';
import { useUser } from "@clerk/nextjs";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { useEffect, useState } from "react";
import { isFreeTrialExpired } from "@/utils/dateUtil";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { user } = useUser();
  const [freeTrialExpired, setFreeTrialExpired] = useState(false);

  useEffect(() => {
    //Adding payment check
    if (user?.createdAt) {
      const userRegistrationDate = new Date(user.createdAt);
      const isExpired = isFreeTrialExpired(userRegistrationDate);
      setFreeTrialExpired(isExpired);
    }
  }, [user]);

  return (
    <>
      {freeTrialExpired && (
        <div className="p-10 flex flex-col gap-4 items-center justify-center">
          <h2 className="font-bold text-3xl text-primary">Warning</h2>
          <h2 className="text-gray-500 text-xl">
            Your trial period has expired. Upgrade your plan to continue.
          </h2>
          <Button className="mt-6" type="button">
            Upgrade your plan
          </Button>
        </div>
      )}
      {!freeTrialExpired && (
        <div className="p-10">
          <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
          <h2 className="text-gray-500">
            Create and Start your AI Mockup Interview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
            <AddNewInterview />
          </div>

          {/* Previous Interview List  */}
          <InterviewList />
        </div>
      )}
    </>
  );
}

export default Dashboard;
