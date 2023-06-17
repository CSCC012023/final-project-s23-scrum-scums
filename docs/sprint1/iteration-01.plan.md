Obelisk

 > _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.
 > It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.


## Iteration 1

 * Start date: 06/05/2023
 * End date: 06/14/2023

## Process
Sprint 1
To split up the work our group used the Fibonacci Estimation technique to assign story points to each user story. The story point values used to assign to each user story were 1,2,3,5,8,13. Each task's story points was decided by a majority vote on Slack. In the case of any discrepancies between voters, we would discuss until everyone understood and agreed on the difficulty of the task. The story points for each user story was then recorded on Jira's backlog. Since there are 25 user stories we plan to complete 5 tasks per sprint.

_This entire section is optional. Note that you will have to fill it out and more for the next 3 deliverables so it's good to start soon and get feedback._

### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

Our team consists of 5 members. Each team member is a full-stack developer and will be capable of contributing to all parts of the project. Our approach is that responsibilities are distributed through tickets on JIRA where each ticket is connected to a specific task that contributes to building an overall feature of Obelisk. Below is a general breakdown of the tasks for this iteration.

- Login - Email Sign On feature: Eric
- Login - Social Sign On feature: Harrick
- Post - Posts a message in text feature: Arnav
- Post - Comments on post feature: Jason/Arwin
- Post - Likes/Dislikes on post feature: Arnav


### Events

Describe meetings (and other events) you are planning to have:

Online via Slack
 * When and where? In-person or online? Online through Slack
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.
There will be daily stand-up meetings online via Slack where we will discuss our coding progress.

Additionally, we have ad-hoc code reviews for pull requests. These reviews serve as opportunities for team members to ask questions, validate implementation, provide feedback, and approve pull requests. This helps us improve our codebase and prepare for future development.

### Artifacts

List/describe the artifacts you will produce in order to organize your team.

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

Jira is used to track user story progress and assign team members tasks for pending tickets. Tasks are prioritized based on story point values assigned via Fibonacci Estimation Technique.
We assign tasks in a sprint planning meeting using

The team Slack chat is used to schedule stand-up and sprint meetings. These meetings will be used to ensure that the team is on the right pace to completing the sprint.
## Product

_This entire section is mandatory._

### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

There are three goals for the initial iteration. Each goal is composed with a set of requirements that must be met for the task to be considered complete. The following list of goals is prioritized from most important to least important.
1. Ability for users to create text-based posts
   - User should be able to post 2800 character limit per text post
   - Text posts should display the author's name
   - Users should be able to click the author's name which directs the user to the author's profile
   - Text posts should allow users to write in a markdown editor
2. Interaction with posts through likes/dislikes from users
    - Users must able to like/dislike a post through a click-action on a like-icon or dislike-icon (includes undoing likes and dislikes)
    - Users must only be able to like or dislike a tweet once
    - After liking/disliking a tweet, the number of likes should be updated and reflected on the post in real-time
3. Interaction with posts through comments from users
    - User should be able to see a comments on a post
    - User should be able to post a comment with a maximum of 280 characters
    - User should be able to view their own comment after submitting
    - Users should be able to upvote/downvote comments
    - Each comment should include the comment OP’s username
    - Users should be able to see the total number of comments on a post
    - Comments should be sorted in descending order by total likes
4. Login functionality for users
    - Users should have the ability to sign up with a unique username and password
    - Users should be able to verify they received an email and can activate their accounts (1 time only)
    - Users can now login with that username pw combo.
    - Users should have the ability to sign up with an account provider. At the very least there should be Google Authentication and the rest are just nice to have.
    - Users can now login automatically by clicking on the sign in button with their provider


### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.


### SSO
![SSO](/docs/sprint1/artifacts/sso.jpeg)
- Social sign on with third party applications like Facebook, Twitter, Google etc.
- Purpose: An SSO gives an easier option for users to sign in to our application.

### Text-based posts
![TextPosts](/docs/sprint1/artifacts/textpost.png)
- TODO
- Purpose: Posts play an integral part of the social aspect of social media application.

### Comment section
![Comments](/docs/sprint1/artifacts/comments.png)

- Typical social media comment section with the ability to like, dislike, and reply to other comments. Ex. reddit, Instagram, TikTok.
- Purpose: Comments allows users to engage in discussion. Our team believed that this was an important feature to implement to present in the project demo

### Login e-mail
TODO