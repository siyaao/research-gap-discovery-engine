const Loading = () => {
  return (
    <div className="text-center mt-10">
      <div className="text-5xl animate-pulse">🤖</div>

      <h2 className="text-xl font-semibold mt-5">
        AI is analyzing your paper...
      </h2>

      <p className="mt-3 text-gray-600">Extracting Text...</p>

      <p className="text-gray-600">Extracting Keywords...</p>

      <p className="text-gray-600">Searching Semantic Scholar...</p>

      <p className="text-gray-600">Generating AI Report...</p>
    </div>
  );
};

export default Loading;
