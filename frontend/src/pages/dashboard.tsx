import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaUpload,
  FaTags,
  FaHistory,
  FaPlusCircle,
  FaChartBar,
} from "react-icons/fa";

import api from "../services/api";
import Navbar from "../components/Navbar";

interface RecentReport {
  filename: string;
  keywords: string[];
}

interface ChartData {
    keyword: string;
    count: number;
}

interface DashboardData {
    total_reports: number;
    total_uploads: number;
    total_keywords: number;
    recent_reports: RecentReport[];
    keyword_chart: ChartData[];
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData>({
    total_reports: 0,
    total_uploads: 0,
    total_keywords: 0,
    recent_reports: [],
    keyword_chart: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Welcome 👋
          </h1>

          <p className="text-gray-600 mt-2">
            AI Research Gap Discovery Engine Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaFileAlt className="text-blue-600 text-3xl mb-3" />
            <h2 className="text-gray-500">Total Reports</h2>
            <p className="text-3xl font-bold">{data.total_reports}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaUpload className="text-green-600 text-3xl mb-3" />
            <h2 className="text-gray-500">Uploads</h2>
            <p className="text-3xl font-bold">{data.total_uploads}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaTags className="text-purple-600 text-3xl mb-3" />
            <h2 className="text-gray-500">Keywords</h2>
            <p className="text-3xl font-bold">{data.total_keywords}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <FaHistory className="text-red-500 text-3xl mb-3" />
            <h2 className="text-gray-500">Recent Reports</h2>
            <p className="text-3xl font-bold">
              {data.recent_reports.length}
            </p>
          </div>
          <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-6">
        Most Common Keywords
    </h2>

    <ResponsiveContainer
        width="100%"
        height={350}
    >

        <BarChart
            data={data.keyword_chart}
        >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="keyword" />

            <YAxis />

            <Tooltip />

            <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
            />

        </BarChart>

    </ResponsiveContainer>

</div>

        </div>

        <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaPlusCircle />
              Upload Paper
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaHistory />
              View History
            </button>

          </div>

        </div>

        <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <FaChartBar />
            Recent Reports
          </h2>

          {data.recent_reports.length === 0 ? (
            <p className="text-gray-500">
              No reports uploaded yet.
            </p>
          ) : (
            <div className="space-y-4">
              {data.recent_reports.map((report, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4"
                >
                  <h3 className="font-bold">
                    {report.filename}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {report.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </>
  );
}