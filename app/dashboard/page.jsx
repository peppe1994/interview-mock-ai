"use client";
import { Button } from "@/components/ui/button";
import { isFreeTrialExpired } from "@/utils/dateUtil";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { getSubscriptionByUserId } from "@/utils/db/action";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { user } = useUser();
  const [freeTrialExpired, setFreeTrialExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Adding payment check
    if (user?.createdAt && user.id) {
      getSubscriptionByUserId(user.id).then((res) => {
        console.log("@@@SUBSCRIPTION: ", res);
        setLoading(false);
        const userRegistrationDate = new Date(user.createdAt);
        if (
          (!res || res.length === 0) &&
          isFreeTrialExpired(userRegistrationDate)
        )
          setFreeTrialExpired(true);
        else setFreeTrialExpired(false);
      });
    }
  }, [user]);

  return (
    <>
      {loading && (
        <div className="my-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[110px]" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[110px]" />
          </div>
        </div>
      )}
      {freeTrialExpired && !loading && (
        <div className="p-10 flex flex-col gap-4 items-center justify-center">
          <h2 className="font-bold text-3xl text-primary">Warning</h2>
          <h2 className="text-gray-500 text-xl">
            Your plan period has expired. Upgrade your plan to continue.
          </h2>
          <Link className="mt-6" href="dashboard/upgrade">
            <Button type="button">Upgrade your plan</Button>
          </Link>
        </div>
      )}
      {!freeTrialExpired && !loading && (
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
