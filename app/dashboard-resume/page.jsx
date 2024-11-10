"use client";
import { useState } from "react";
import Header from "../dashboard/_components/Header";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";
import { ResumeInfoContext } from "./context/ResumeInfoContext";

function Dashboard() {
  const [resumeInfo, setResumeInfo] = useState();

  return (
    <div>
      <Header />
      <div className="p-1 md:px-20 lg:px-32">
        <div className="p-10">
          <h2 className="font-bold text-3xl text-primary">My Resume</h2>
          <h2 className="text-gray-500">
            Start Creating AI resume to your next Job role
          </h2>
        </div>
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
