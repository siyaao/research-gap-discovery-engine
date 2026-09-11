import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar";
import { FaTrash, FaSearch, FaFileAlt } from "react-icons/fa";

interface Report {
  id: string;
  filename: string;
  keywords: string[];
  report: string;
}

export default function History() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");

  const fetchReports = async () => {
    try {
      const response = await api.get("/reports");
      setReports(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load reports.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const deleteReport = async (id: string) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await api.delete(`/reports/${id}`);
      fetchReports();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.filename.toLowerCase().includes(search.toLowerCase()) ||
      report.keywords.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8 text-gray-900">

        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Report History
        </h1>

        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search by filename or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-gray-900 bg-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-5">

          {filteredReports.length === 0 && (
            <div className="bg-white rounded-xl p-10 text-center shadow text-gray-600">
              No reports found.
            </div>
          )}

          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">

                    <FaFileAlt />

                    {report.filename}

                  </h2>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {report.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}

                  </div>

                </div>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="bg-red-500 hover:bg-red-600 text-white h-12 px-5 rounded-lg"
                >
                  <FaTrash />
                </button>

              </div>

              <div className="mt-6 border-t border-gray-200 pt-5">

                <h3 className="font-semibold mb-3 text-gray-900">
                  AI Report
                </h3>

                <div className="max-h-72 overflow-auto whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {report.report}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}