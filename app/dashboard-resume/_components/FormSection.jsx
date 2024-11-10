import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Education from "./forms/Education";
import Experience from "./forms/Experience";
import PersonalDetail from "./forms/PersonalDetail";
import Skills from "./forms/Skills";
import Summery from "./forms/Summery";
import ViewResume from "./MyResume";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex == 1 ? (
        <PersonalDetail />
      ) : activeFormIndex == 2 ? (
        <Summery />
      ) : activeFormIndex == 3 ? (
        <Experience />
      ) : activeFormIndex == 4 ? (
        <Education />
      ) : activeFormIndex == 5 ? (
        <Skills />
      ) : activeFormIndex == 6 ? (
        <ViewResume />
      ) : null}

    </div>
  );
}

export default FormSection;
