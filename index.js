import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

const commitMessages = [
    "fix: resolve login session expiration issue",
    "feat: add email validation to signup form",
    "refactor: simplify database connection logic",
    "docs: update README with setup instructions",
    "style: apply consistent formatting in utils.js",
    "chore: clean up unused imports",
    "feat: implement pagination in user dashboard",
    "fix: handle API timeout error on fetch",
    "test: add unit test for auth middleware",
    "docs: fix typo in CONTRIBUTING.md",
    "feat: integrate new payment gateway",
    "refactor: improve performance of product listing",
    "style: update CSS variables for dark mode",
    "fix: correct 404 routing for invalid paths",
    "chore: upgrade dependencies to latest versions"
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeCommits = async () => {
    for (let i = 60; i >= 31; i--) {
        const baseDate = moment().subtract(i, 'days');
        const commitCount = getRandomInt(0, 3); // 0 to 3 commits per day

        for (let j = 0; j < commitCount; j++) {
            const randomHour = getRandomInt(0, 23);
            const randomMinute = getRandomInt(0, 59);
            const fullDate = baseDate.clone().hour(randomHour).minute(randomMinute).toISOString();

            const data = { date: fullDate };
            await jsonfile.writeFile(path, data);

            const message = commitMessages[getRandomInt(0, commitMessages.length - 1)];
            await git.add([path]);
            await git.commit(message, path, { '--date': fullDate });

            console.log(`✅ ${message} @ ${fullDate}`);
        }
    }

    await git.push();
    console.log("🚀 All commits between 60 and 30 days ago pushed!");
};

makeCommits();
