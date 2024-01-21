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

export interface iGithubActivity {
  totalContributions: number;
  contributions: {
    count: number;
    level: number;
    date: string;
  }[];
}
/**
 * Get github activity for a given account between now and a given date
 *
 * @param username Username of the github account to get activity for
 * @param dateFrom Date object for the start date of the activity request
 * @returns Api response containing the activity data
 */
async function getAccountContributions(
  username: string,
  dateFrom: Date
): Promise<iApiResponse> {
  const startDate = getDateString(dateFrom);
  const endDate = getDateString(new Date());

  const res = await fetch(
    `https://github-contributions-api.deno.dev/${username}.json?flat=true&from=${startDate}&to=${endDate}`
  );

  if (res.status !== 200 || !res.ok) {
    throw new Error("Could not get github activity");
  }

  const data = (await res.json()) as iApiResponse;

  return data;
}

/**
 * Combine and simplify an array of api responses into one object
 *
 * @param data Array of original api responses
 * @returns combined and simplified github activity object
 */
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
    const level = data.reduce(
      (acc, curr) =>
        Math.max(
          acc,
          ContributionLevels[curr.contributions[i].contributionLevel]
        ),
      0
    );
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

/**
 * Method to get github activity for a given number of days across all accounts,
 * and then process the data into a simplified format
 *
 * @param date the date to get the history from
 * @returns combined and simplified github activity object
 */
export default async function getGithubActivity(
  date: Date
): Promise<iGithubActivity> {
  const data = await Promise.all(
    accounts.map((account) => getAccountContributions(account, date))
  );

  if (data.length > 0) {
    console.log(combineAccountData(data));

    return combineAccountData(data);
  } else {
    throw new Error("Could not get github activity");
  }
}

/**
 * Function to return date string in format yyyy-mm-dd
 *
 * @param date date input
 */
function getDateString(date: Date) {
  return date.toLocaleDateString("en-GB").split("/").reverse().join("-");
}
