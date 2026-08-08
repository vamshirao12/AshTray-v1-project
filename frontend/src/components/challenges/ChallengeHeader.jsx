const ChallengeHeader = () => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 18) greeting = "Good Afternoon";

  return (

    <div className="mb-8">

      <p className="text-slate-400 text-lg">

        {greeting}

      </p>

      <h1 className="text-5xl font-black mt-2">

        Daily Challenges

      </h1>

      <p className="text-slate-500 mt-4 max-w-xl leading-7">

        Replace smoking with healthier actions.
        Small victories today become lasting habits tomorrow.

      </p>

    </div>

  );
};

export default ChallengeHeader;