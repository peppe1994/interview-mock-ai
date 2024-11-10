"use client";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "./context/ResumeInfoContext";
import Header from "../dashboard/_components/Header";

function Dashboard() {
  const { user } = useUser();
  const [resumeInfo, setResumeInfo] = useState();

  return (
    <div>
      {" "}
      <Header />
      <div className="p-10 md:px-20 lg:px-32">
        <h2 className="font-bold text-3xl">My Resume</h2>
        <p>Start Creating AI resume to your next Job role</p>
        <div>
          <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
              {/* Form Section  */}
              <FormSection />
              {/* Preview Section  */}
              <ResumePreview />
            </div>
          </ResumeInfoContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
