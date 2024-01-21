const accounts = ["ben-732", "ben-mcmurtrie-tidy"];

const ContributionLevels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface iApiResponse {
  totalContributions: number;
  contributions: {
    contributionCount: number;
    contributionLevel: keyof typeof ContributionLevels;
    date: string;
  }[];
}

interface iGithubActivity {
  totalContributions: number;
  contributions: {
    count: number;
    level: number;
    date: string;
  }[];
}

async function getAccountContributions(
  username: string,
  dateFrom: Date
): Promise<iApiResponse> {
  const dateString = dateFrom.toISOString().split("T")[0];

  const res = await fetch(
    `https://github-contributions-api.deno.dev/${username}.json?flat=true&from=${dateString}`
  );

  if (res.status !== 200 || !res.ok) {
    throw new Error("Could not get github activity");
  }

  const data = (await res.json()) as iApiResponse;

  return data;
}

function combineAccountData(data: iApiResponse[]): iGithubActivity {
  const totalContributions = data.reduce(
    (acc, curr) => acc + curr.totalContributions,
    0
  );

  const contributions = data[0].contributions.map((_, i) => {
    const count = data.reduce(
      (acc, curr) => acc + curr.contributions[i].contributionCount,
      0
    );
    const level =
      data.reduce(
        (acc, curr) =>
          acc + ContributionLevels[curr.contributions[i].contributionLevel],
        0
      ) / data.length;
    const date = data[0].contributions[i].date;

    return {
      count,
      level,
      date,
    };
  });

  return {
    totalContributions,
    contributions,
  };
}

export default async function getGithubActivity(
  days: number
): Promise<iGithubActivity> {
  const dateFrom = new Date();

  dateFrom.setDate(new Date().getDate() - days);

  console.log(dateFrom);

  const data = await Promise.all(
    accounts.map((account) =>
      getAccountContributions(account, new Date(dateFrom))
    )
  );

  if (data.length > 0) {
    console.log(combineAccountData(data));

    return combineAccountData(data);
  } else {
    throw new Error("Could not get github activity");
  }
}
