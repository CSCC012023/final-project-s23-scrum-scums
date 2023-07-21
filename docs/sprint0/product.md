# Obelisk

 > _Note:_ This document is meant to evolve throughout the planning phase of your project.    
 > That is, it makes sense for you to commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section).

## Q1: What are you planning to build?

Obelisk is a social media application looking to iterate upon the classic twitter formula with some new features. Obelisk will focus on the - writing posts and comments, searching by tags, and following people to receive their posts in an algorithmic feed - core flow of Twitter.  

It solves the traditional problems solved by social media by providing an online space to be entertained and interact with your peers, while also trying to limit some of the toxicity problems that frequently plague Twitter. 

For example, you can write a ‘tweet’ that lets you share an interesting observation you made, or a piece of fiction you would like advice on and get comments and responses from the community. Users will be disincentivized to post low quality or derogatory ‘tweets’ if they have no ability to delete them.

We care a lot about the high-quality texts, so we allow the user to write posts in markdown (similar to reddit), and we offer a 2800 character limit to provide a space for deep content to exist. 

Obelisk will also offer an algorithm that delivers ‘tweets’ for the current user’s personalized feed that has a high exploration rate to prevent users from getting stuck in the same old subcultures. We will experiment with this algorithm and try to offer a machine-learning method to serve users their content.

Obelisk’s primary method of use will be a web app that users can interact with from all devices.

## Q2: Who are your target users? (2-3 personas)
 * Short (2-5 min' read max)
 * Be specific (e.g. )
 * You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)), or add a pdf
  
David 

![David](/docs/sprint0/User%20Persona%20Images/David.jpg)

- Age: 18
- Gender: Boy
- Occupation: Student
- Relationship: Single
- Personality: Extroverted, Feeling, Sensing, Perceiving (EFSP - Entertainer)
- Environment:
  - Lives with his parents
  - Usually plays basketball with his friends
- Motivations: 
  - He wants to share basketball clips and funny videos

Sara

![Sara](/docs/sprint0/User%20Persona%20Images/Sara.jpg)

- Age: 33
- Gender: Girl
- Occupation: Librarian
- Relationship: Married with 1 child
- Personality: Introverted, Feeling, Observant, Prospecting (ISFP - Adventurer)
- Environment:
  - Lives in a suburban area with her husband and child
  - Likes to do arts and crafts
- Motivations:
  - Wants to write a novel

Alex:

![Alex](/docs/sprint0/User%20Persona%20Images/Alex.jpeg)

- Age: 24
- Gender: Non-binary
- Occupation: Software Developer
- Relationship: Single
- Personality: Introvert, Observant, Thinking, Judging (ISTJ - Logistician)
- Environment: 
  - Lives alone in an apartment
  - Enjoys exploring new technologies
- Motivations:
  - Wants to share tech project ideas

## Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Instead of video or images, the platform focuses more on text for its posts, allowing users who would like to focus on text when posting to find their audience. The sequential nature of Obelisk will let users read each post in more detail while preventing information overload. In turn, users will be able to find more like-minded peers. Moreover, some users may be uncomfortable with posting images, and Obelisk will allow them to express themselves in their own way.

Users like David will be able to post and find videos to their liking, possibly with more elaboration owing to the 2800-word limit. On the other hand, users like Sara may prefer to use text instead of using videos or images. This allows for writers with similar interests to follow each other. For Alex, they can post their ideas and code on Obelisk to share their ideas around, facilitating a healthy environment for developing projects.

Popular social media platforms are often rife with hateful and low quality posts. Removing the ability to liberally delete posts will make users think twice before posting, as the post will stay as a permanent record. This incentivizes users to think carefully before they make a post and encourage high quality posts.

Many users are now turning away from Twitter due to the site’s new governance. Our new webapp will be able to capitalize on this market void and serves as an alternative to the many users who are dissatisfied with the juggernauts of this industry, bringing a breath of fresh air to social media.


## Q4: What does "DONE" means to your Team
 * The whole team needs to agree as to what ”done” means for the features you will
   implement.
 * Definition of done applies to all user stories

A feature is considered “done” when it has been completed according to the requirements outlined in the user story. Each user story has a predefined acceptance criteria, which serves as a set of guidelines to determine when a user story is complete. The acceptance criteria should follow these 4 rules.

Clear, specific, and unambiguous, leaving no room for interpretation. They should describe the desired behavior or outcome in a concise and understandable manner.
Measurable, objective and testable, allowing for a straightforward assessment of whether the criteria have been met. They should be based on observable and verifiable results.
Define the minimum requirements for the user story to be considered complete. They outline the specific functionality or behavior that must be present for the user story to be accepted.
Set clear boundaries and define what is included and what is excluded from the user story. To help manage scope and prevent misunderstandings about what is expected to be delivered.

A feature will only be considered “done” when it has been tested thoroughly to meet every scenario in the acceptance criteria. This can be through unit tests or integrated testing, additionally all documentation related to the feature should be updated accordingly. Once all these are satisfied, a feature can be deployed and will be considered “done”.


## Q5: Specify 3 - 5 key decisions and/or insights that came up during your meetings and/or collaborative process.



In terms of team communication, we agreed that we would send messages via Discord and conduct meetings via Slack. Our decision to choose Discord is based on the convenience that we have notifications setup on both our mobile and computer devices. In addition, we have created several channels to organize resources for our project like quick urls to documentation for APIs and links to services that we are using such as JIRA, Figma, Google docs, etc. As for Slack, we decided that it should be used for voice calls since it is tied with a professional setting, and it has a robust search function. Both tools in Slack are leveraged for their benefits to our daily stand-up meetings. In terms of daily stand-up meetings, we meet every weekday, except for Thursday, in the evening to provide updates and blockers. These meetings typically last anywhere from 5 to 15 minutes. On Thursdays, we have a longer meeting to discuss design choices for feature implementation. There may also be instances where two or more developers meet on an ad-hoc basis for ease of communication rather than typing to resolve an issue.

For team organization, we decided it would be best if all of us contributed to each part of the application. This means every team member will be assigned tasks regardless of whether the feature involves front-end or back-end development, while keeping in mind that each member has a balanced workload. As for tools, we considered our app in relation to similar applications like Twitter, Reddit, Facebook, etc. This comparison allowed us to evaluate their technology stack and its pros and cons,  shortlisting to a stack that fits our app. This stack’s backend includes, but is not limited to PostgreSQL, Neon.tech, and NextJS (in .ts format for type checking) and this stack’s frontend is mostly using React.

One decision we had to make was that we were torn between the tooling of a non-relational database or a relational database. In the case of our app, we had to consider scalability as competitive apps have millions of users simultaneously interacting with their app at once. As well, we needed to choose a database that was flexible to store structured and unstructured data. This led to a vote in favor of a relational database to store structured data, complemented with a cloud storage service for unstructured data where scalability can be optimized with database design (i.e. sharding, if needed).

Another decision we had to make was that we were conflicted between allowing the option to delete/edit posts versus not having the option at all. The argument for enabling this option was that it would make users feel like they have more control over their posts and therefore encourage user engagement, alongside minor things like fixing typos or grammatical errors. With that being said, there was also an argument that went against this which was that it did not align with our vision for the app. We wanted our users to feel a sense of responsibility and to be truthful with their posts. Between these two arguments, we made a compromise to disable the delete button, though at the same time, users would be given a short time from creating their post to make an edit allowing them to fix mistakes. This way, our users can post with a peace of mind while maintaining a permanent history of their posts.
