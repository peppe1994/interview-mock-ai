import { useContext } from "react";
import { ResumeInfoContext } from "../context/ResumeInfoContext";
import EducationalPreview from "./preview/EducationalPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SkillsPreview from "./preview/SkillsPreview";
import SummeryPreview from "./preview/SummeryPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      id="print-area"
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summery  */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience  */}
      {resumeInfo?.Experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}
      {/* Educational  */}
      {resumeInfo?.education?.length > 0 && (
        <EducationalPreview resumeInfo={resumeInfo} />
      )}
      {/* Skils  */}
      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo} />
      )}
    </div>
  );
}

export default ResumePreview;
