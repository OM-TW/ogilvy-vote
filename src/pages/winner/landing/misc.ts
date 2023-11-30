import { TVote } from '../../../../setting';
import { Result, TWinnerState, WinnerStepType } from '../config';

const getAB = ({ vote }: { vote: TVote[] }) => {
  const { length: count } = vote;
  const voteA = vote.filter((data) => data.vote);
  const { length: countA } = voteA;
  if (count === 0) return { A: 0, B: 0 };

  const A = Number(((countA / count) * 100).toFixed(1));
  const B = 100 - A;

  if (A === B) return { A: A - 0.1, B: B + 0.1 };
  return { A, B };
};

export const WinnerSorting = ({ vote, user }: Pick<TWinnerState, 'vote' | 'user'>) => {
  const result = Object.fromEntries(
    Object.values({ ...WinnerStepType })
      .filter((dep) => dep !== WinnerStepType.Unset && dep !== WinnerStepType.Total)
      .map((dep) => {
        const members = user.filter((u) => u.department === dep);
        const sortVote = vote.filter((v) => {
          const [data] = members.filter((u) => u.extension === v.extension);
          if (data) return true;
          return false;
        });
        return [dep, getAB({ vote: sortVote })];
      }),
  );
  const Total = getAB({ vote });
  return { ...result, Total } as Result;
};
