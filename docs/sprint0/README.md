# Obelisk

Obelisk is a social media platform that seeks to enhance the concept of Twitter by integrating new features. The core functionalities such as composing posts and comments, tagging for search, and following users for a personalized feed are retained.

# Motivation

In today's modern society, social media is being used on a routine basis serving as a platform for entertainment and interaction. Despite it's regular usage, there is a consistent issue of online toxicity. Recognizing this, Obelisk aims to provide a platform that allows users to share their thoughts, experiences, or opinions with a unique feature that discourages low-quality or derogatory content - the inability to delete posts. In order to promote thoughtful engagement, Obelisk ensures that users are aware their posts will remain permanent, therefore encouraging careful consideration before posting. Another unique feature of Obelisk is an innovative algorithm that enhances the user's feed by promoting a high exploration rate to enable users to discover diverse content, while avoiding the instance of getting trapped within existing subcultures.

# Installation

To get started with the project, you will need to install [Node.js](https://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager).

With Node.js and npm installed, you can now clone the repository.

```bash
git clone https://github.com/CSCC012023/final-project-s23-scrum-scums.git
```

After cloning, navigate to the repository to install Next.js and Prisma.

```bash
npm install next
npm install @prisma/client
```

In the same repository, generate the Prisma client.

```bash
prisma generate
```

# Getting Started
To host the development server, navigate to the directory and run it.

```bash
npm run dev
# or
yarn dev
```

Now, open http://localhost:3000 with your browser to see the result!

# Contributing

For major changes, please open an issue first to discuss what you would like to change in terms of new user stories or bug fixes, in the [JIRA](https://scrumscums.atlassian.net/jira/software/projects/OBELISK/boards/1/backlog) backlog.

After logging the issue, reference the ticket number provided by JIRA to create a new branch with the prescribed naming convention shown below.

```bash
git checkout -b "feature/OBELISK-<jira ticket number>"
```

When the issue is resolved, ensure that code has been tested and subsequently, initiate a pull request to submit your new changes for approval.

<!-- # Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial. -->


<!-- # License
[MIT](https://choosealicense.com/licenses/mit/) -->