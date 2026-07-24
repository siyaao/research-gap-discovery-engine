import React from "react";

interface UploadBoxProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  loading: boolean;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  file,
  onFileChange,
  onAnalyze,
  loading,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        AI Research Gap Discovery Engine
      </h1>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            onFileChange(e.target.files?.[0] || null)
          }
        />

        {file && (
          <p className="mt-4 text-green-600 font-medium">
            Selected File: {file.name}
          </p>
        )}

      </div>

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {loading ? "Analyzing..." : "Analyze Paper"}
      </button>

    </div>
  );
};

export default UploadBox;