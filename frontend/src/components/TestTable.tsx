const TestTable = ({
  getRankingByTest,
}: {
  getRankingByTest: (testId: string) => void;
}) => {
  return (
    <div>
      <button
        onClick={() => {
          getRankingByTest("Test 1 PHP");
        }}
      >
        Click
      </button>
    </div>
  );
};

export default TestTable;
