import challengePool from "../data/challengePool";

export const generateChallenges = () => {
  const shuffled = [...challengePool].sort(
    () => Math.random() - 0.5
  );

  return shuffled.slice(0, 4);
};