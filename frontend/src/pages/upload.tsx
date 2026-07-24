import { useState } from "react";
import api from "../services/api";
import UploadBox from "../components/fileupload";
import Loading from "../components/Loading";
import ReportCard from "../components/ReportCard";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [filename, setFilename] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const analyzePaper = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFilename(response.data.filename);
      setKeywords(response.data.keywords);
      setReport(response.data.report);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.detail || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

        <UploadBox
          file={file}
          onFileChange={setFile}
          onAnalyze={analyzePaper}
          loading={loading}
        />

        {loading && <Loading />}

        {!loading && report && (
          <div className="w-full max-w-5xl mt-10">

            {/* Uploaded Paper Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

              <h2 className="text-2xl font-bold mb-4">
                Uploaded Paper
              </h2>

              <p className="text-gray-700">
                <strong>Filename:</strong> {filename}
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Keywords
              </h3>

              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

            </div>

            {/* AI Report */}
            <ReportCard report={report} />

          </div>
        )}

      </div>
    </>
  );
}