"use client";
import { useEffect, useState } from "react";
import Header from "../dashboard/_components/Header";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "./context/ResumeInfoContext";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { isFreeTrialExpired } from "@/utils/dateUtil";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const [resumeInfo, setResumeInfo] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [freeTrialExpired, setFreeTrialExpired] = useState(false);

  useEffect(() => {
    //Adding payment check
    if (user?.createdAt && user.id) {
      getSubscriptionByUserId(user.id).then((res) => {
        console.log("@@@SUBSCRIPTION: ", res);
        const userRegistrationDate = new Date(user.createdAt);
        if (
          (!res || res.length === 0) &&
          isFreeTrialExpired(userRegistrationDate)
        )
          setFreeTrialExpired(true);
        else setFreeTrialExpired(false);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div>
      <Header />
      <div className="p-1 md:px-20 lg:px-32">
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
        {freeTrialExpired &&
          !loading && (
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
        {!freeTrialExpired &&
          !loading && (
            <>
              <div className="p-10">
                <h2 className="font-bold text-3xl text-primary">My Resume</h2>
                <h2 className="text-gray-500">
                  Start Creating AI resume to your next Job role
                </h2>
              </div>
              <div>
                <ResumeInfoContext.Provider
                  value={{ resumeInfo, setResumeInfo }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                    {/* Form Section  */}
                    <FormSection />
                    {/* Preview Section  */}
                    <ResumePreview />
                  </div>
                </ResumeInfoContext.Provider>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default Dashboard;
