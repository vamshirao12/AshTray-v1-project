const ChallengeProgress = ({
  completed,
  total,
}) => {

  const percentage =
    (completed / total) * 100;

  return (

    <div className="bg-slate-900/70 border border-slate-700 rounded-3xl p-6 backdrop-blur-xl">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Today's Recovery Plan

          </h2>

          <p className="text-slate-400 mt-2">

            {completed} of {total} completed

          </p>

        </div>

        <div className="text-4xl">

          🎯

        </div>

      </div>

      <div className="w-full h-4 bg-slate-800 rounded-full mt-6 overflow-hidden">

        <div
          className="h-full bg-violet-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>

  );
};

export default ChallengeProgress;