import ReactMarkdown from "react-markdown";

interface Props {
  report: string;
}

const ReportCard = ({ report }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mt-8 text-gray-900">

      <h2 className="text-2xl font-bold mb-5 text-gray-900">
        AI Research Report
      </h2>

      <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900">

        <ReactMarkdown>
          {report}
        </ReactMarkdown>

      </div>

    </div>
  );
};

export default ReportCard;