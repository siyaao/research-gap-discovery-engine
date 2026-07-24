import ReactMarkdown from "react-markdown";

interface Props {
  report: string;
}

const ReportCard = ({ report }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        AI Research Report
      </h2>

      <div className="prose max-w-none">

        <ReactMarkdown>
          {report}
        </ReactMarkdown>

      </div>

    </div>
  );
};

export default ReportCard;