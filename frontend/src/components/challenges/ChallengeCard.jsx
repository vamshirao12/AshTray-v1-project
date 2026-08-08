import { CheckCircle2 } from "lucide-react";

const ChallengeCard = ({
  challenge,
  completed,
  onToggle,
}) => {

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400",
  };

  return (

    <div
      className={`
      rounded-3xl
      border
      p-6
      transition-all
      duration-300
      cursor-pointer

      ${
        completed
          ? "border-green-500 bg-green-500/10"
          : "border-slate-700 bg-slate-900/70 hover:border-violet-500"
      }
      `}
      onClick={onToggle}
    >

      <div className="flex justify-between items-start">

        <div className="flex gap-5">

          <div className="text-5xl">

            {challenge.icon}

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              {challenge.title}

            </h2>

            <p className="text-slate-400 mt-3">

              {challenge.description}

            </p>

            <p
              className={`mt-4 font-semibold ${difficultyColor[
                challenge.difficulty
              ]}`}
            >

              {challenge.difficulty}

            </p>

          </div>

        </div>

        <CheckCircle2
          size={34}
          className={
            completed
              ? "text-green-400"
              : "text-slate-600"
          }
        />

      </div>

    </div>

  );
};

export default ChallengeCard;