// src/api/API.ts
const BASE = 'https://api.github.com';
const MAX_ID = 50_000_000;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
console.log("GITHUB_TOKEN", GITHUB_TOKEN)
console.log("BASE", BASE)
console.log("ALL ENVS,", import.meta.env)

const DEFAULT_HEADERS = {
  Authorization: `token ${GITHUB_TOKEN}`,
  'User-Agent': 'CandidateSearchApp/1.0',
  Accept: 'application/vnd.github.v3+json',
};

async function searchGithub(): Promise<any[]> {
  try {

    const since = Math.floor(Math.random() * MAX_ID) + 1;
    const listRes = await fetch(
      `${BASE}/users?since=${since}&per_page=10`,
      { headers: DEFAULT_HEADERS }
    );
    if (!listRes.ok) throw new Error('List fetch failed');

    const users = (await listRes.json()) as { login: string }[];


    const settled = await Promise.allSettled(
      users.map(u =>
        fetch(`${BASE}/users/${u.login}`, { headers: DEFAULT_HEADERS })
          .then(res => {
            if (!res.ok) throw new Error(`404 for ${u.login}`);
            return res.json();
          })
      )
    );


    const detailed = settled
      .filter(r => r.status === 'fulfilled')
      .map((r: any) => r.value);

    return detailed;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export { searchGithub };
