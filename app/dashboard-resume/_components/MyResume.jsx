import ResumePreview from "@/app/dashboard-resume/_components/ResumePreview";
import { ResumeInfoContext } from "@/app/dashboard-resume/context/ResumeInfoContext";
import Header from "@/app/dashboard/_components/Header";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

function ViewResume() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const HandleDownload = () => {
    const printContent = document.getElementById("print-area").innerHTML;

    // Copy CSS from the document head
    const cssLinks = Array.from(
      document.head.querySelectorAll("link[rel='stylesheet']")
    )
      .map((link) => `<link rel="stylesheet" href="${link.href}" />`)
      .join("\n");

    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
            <html>
                <head>
                    <title>Print Resume</title>
                    ${cssLinks}
                    <style>
                        /* Optional: Add custom print styles here */
                    </style>
                </head>
                <body onload="window.print(); window.close();">
                    ${printContent}
                </body>
            </html>
        `);
    printWindow.document.close();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready !
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume
          </p>
          <div className="flex justify-center my-10">
            <Button onClick={HandleDownload}>Download</Button>
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
