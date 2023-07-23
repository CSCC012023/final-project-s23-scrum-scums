import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

async function main() {
	// clear the database
	const tableNames = [
		"User",
		"Post",
		"PostLike",
		"Category",
		"Comment",
		"CommentLike",
		"Session",
		"VerificationToken",
		"_CategoryToPost",
		"_UserFollows"
	];
	// make sure to keep this in sync with the schema
	for (const tableName of tableNames)
		await prisma.$queryRawUnsafe(
			`Truncate "${tableName}" restart identity cascade;`
		);

	// some example users

	const azad_pw = await bcrypt.hash("hd^vps62$a", 10);

	// the bot that follows everyone
	const azad = await prisma.user.upsert({
		where: {
			email: "azad@mail.com"
		},
		update: {},
		create: {
			name: "Azad",
			email: "azad@mail.com",
			username: "azod",
			password: azad_pw
		}
	});
	console.log("Azod Created!");

	// refer to api docs for info on password hashing
	const botvinnik_pw = await bcrypt.hash("bottythotty2", 10);

	// the wannabe influencer
	const botvinnik = await prisma.user.upsert({
		where: {
			email: "botvinkle21@gmail.com"
		},
		update: {},
		create: {
			name: "Botvinnik",
			username: "ripbotvinkle",
			email: "botvinkle21@gmail.com",
			password: botvinnik_pw,
			bio: "The best chess player in the world. I'm here to share my thoughts on chess, life, and everything in between.",
			followedBy: {
				connect: {
					id: azad.id
				}
			},
			following: {
				connect: {
					id: azad.id
				}
			},
			posts: {
				create: [
					{
						title: "Is the King's Indian Defence doomed?",
						content:
							"I've been playing the King's Indian Defence for a while now, and I've been having a lot of trouble with it. There's just too many opportunities for white to trade everything and win on the Queenside.I've been thinking about switching to the French Defence, but I'm not sure if that's a good idea. What do you think?",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Chess"
									},
									create: {
										name: "Chess"
									}
								}
							]
						}
					},
					{
						title: "The Tale of Rip Van Winkle",
						content:
							"Who is Rip Van Winkle? What is his story? Why is he so famous? Rip Van Winkle is an american fable that has a magical realism setting that takes place in the Catskill Mountains. Rip Van Winkle unintentionally falls asleep for 20 years and wakes up to a world that is completely different from the one he left behind. He is shocked to find that his wife has died and his children have grown up. He is also shocked to find that the American Revolution has occurred and that the United States is now an independent country. Overall it's a very interesting story that I would recommend to anyone who is interested in American history or magical realism.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Literature"
									},
									create: {
										name: "Literature"
									}
								},
								{
									where: {
										name: "American History"
									},
									create: {
										name: "American History"
									}
								}
							]
						}
					}
				]
			}
		},
		include: {
			posts: true
		}
	});

	// the real influencer
	const dijkstra = await prisma.user.upsert({
		where: {
			email: "aloken1309u8!@swedemail.com"
		},
		update: {},
		create: {
			name: "Dijkstra",
			username: "dijkstra",
			email: "aloken1309u8!@swedemail.com",
			followedBy: {
				connect: [
					{
						id: azad.id
					},
					{
						id: botvinnik.id
					}
				]
			},
			posts: {
				create: [
					{
						title: "Toronto is Gridlocked - Here's How to Fix It",
						content:
							"Ever ride around Queen's st lately? The city is suffering no doubt about it. All this started when public transit spending slowed down big time when the new government of Ontario took power in 2013. Together they passed laws that could have connected many of the public transit routes we use today and integrated them better as one whole cohesive unit. Without it, people are just always going to be more inclined to use a car. If we fight to bring those plans back to life again maybe we'll all have a chance to breathe this summer.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Urban Planning"
									},
									create: {
										name: "Urban Planning"
									}
								},
								{
									where: {
										name: "Transportation"
									},
									create: {
										name: "Transportation"
									}
								},
								{
									where: {
										name: "Optimization"
									},
									create: {
										name: "Optimization"
									}
								},
								{
									where: {
										name: "Toronto"
									},
									create: {
										name: "Toronto"
									}
								}
							]
						}
					},
					{
						title: "The Best Way to Learn a New Language",
						content:
							"I've been learning French for a while now and I've found that the best way to learn a new language is to immerse yourself in it. I've been watching French movies, listening to French music, and reading French books. I've also been trying to speak French as much as possible. I've found that the more I speak French, the quicker I pick up on the syntax. If you're learning a new language I recommend giving this method a shot.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Language"
									},
									create: {
										name: "Language"
									}
								},
								{
									where: {
										name: "French"
									},
									create: {
										name: "French"
									}
								},
								{
									where: {
										name: "Learning"
									},
									create: {
										name: "Learning"
									}
								}
							]
						}
					},
					{
						title: " Dope New Zipper Drones Take to the Skies",
						content:
							"Zipper drones are the latest craze in the world of drones. They're small, fast, and agile. They can fly through tight spaces and even zip around corners. They're also very affordable. You can get one for as little as $50. They're great for beginners and experts alike. Honestly it's hard not to see them changing the future of delivery for the better.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Drones"
									},
									create: {
										name: "Drones"
									}
								},
								{
									where: {
										name: "Delivery"
									},
									create: {
										name: "Delivery"
									}
								},
								{
									where: {
										name: "Technology"
									},
									create: {
										name: "Technology"
									}
								},
								{
									where: {
										name: "Futurology"
									},
									create: {
										name: "Futurology"
									}
								},
								{
									where: {
										name: "Ad"
									},
									create: {
										name: "Ad"
									}
								}
							]
						}
					},
					{
						title: "Let's Talk - AI Safety",
						content:
							"As someone who's worked on multiple advanced artificial intelligence models, I would like to come out and make my stance on AI safety known. I think I can speak for my whole team when I say we take AI safety extremely seriously, in fact prior to releasing any new system we conduct rigorous testing, engage external experts for feedback, work to improve the model's behavior with techniques like reinforcement learning with human feedback, and build broad safety and monitoring systems. With these failsafes in place there's no reason worry about the immediate consequences, but AI safety is one of those long-term goals that I'm happy to report that some of the smartest people I know are working on it.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "AI"
									},
									create: {
										name: "AI"
									}
								},
								{
									where: {
										name: "AI Safety"
									},
									create: {
										name: "AI Safety"
									}
								},
								{
									where: {
										name: "Futurology"
									},
									create: {
										name: "Futurology"
									}
								}
							]
						}
					}
				]
			}
		},
		include: {
			posts: true
		}
	});
	console.log("Djikstra Created!");

	// the casual user
	const church = await prisma.user.upsert({
		where: {
			email: "achurch54@outlook.com"
		},
		update: {},
		create: {
			name: "Alonzo Church",
			username: "church_of_lambda",
			email: "achurch54@outlook.com",
			followedBy: {
				connect: {
					id: azad.id
				}
			},
			following: {
				connect: {
					id: dijkstra.id
				}
			},
			posts: {
				create: [
					{
						title: "Everyone knows the best mathematical programming abstraction",
						content: "Lambdas Rule, Turing Machines Drool"
					}
				]
			}
		},
		include: {
			posts: true
		}
	});

	console.log("Church Created!");

	// now we have 4 users and some sample posts
	// get the followers and following in sync
	// add some content and comments to the site
	// make sure that in the api we get this right
	const botvinnikData = await prisma.user.update({
		where: {
			email: "botvinkle21@gmail.com"
		},
		data: {
			following: {
				connect: {
					id: dijkstra.id
				}
			},
			comments: {
				create: [
					{
						content: "Interesting! Will have to try that",
						post: {
							connect: {
								id: dijkstra.posts[1].id
							}
						}
					}
				]
			}
		}
	});

	const dijkstraData = await prisma.user.update({
		where: {
			email: "aloken1309u8!@swedemail.com"
		},
		data: {
			followedBy: {
				connect: [
					{
						id: azad.id
					},
					{
						id: church.id
					}
				]
			},
			postLikes: {
				create: [
					...dijkstra.posts.map(post => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						};
					})
				]
			},
			comments: {
				create: [
					...dijkstra.posts.map(post => {
						return {
							content:
								"Make sure to follow me to keep up with my latest posts!",
							post: {
								connect: {
									id: post.id
								}
							}
						};
					})
				]
			}
		}
	});
	console.log("Botvinnik Created!");

	const azodData = await prisma.user.update({
		where: {
			email: "azad@mail.com"
		},
		data: {
			following: {
				connect: [
					{
						id: dijkstra.id
					},
					{
						id: church.id
					},
					{
						id: botvinnik.id
					}
				]
			},
			postLikes: {
				create: [
					...botvinnik.posts.map(post => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						};
					}),
					...dijkstra.posts.map(post => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						};
					}),
					...church.posts.map(post => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						};
					})
				]
				// [
				// 	{
				// 		post: {
				// 			connect: {
				// 				id: botvinnik.posts[0].id
				// 			}
				// 		}
				// 	},
				// 	{
				// 		post: {
				// 			connect: {
				// 				id: botvinnik.posts[1].id
				// 			}
				// 		}
				// 	}
				// ]
			},
			comments: {
				create: [
					{
						content:
							"Do you want more ram? Come to downloadfreeram.com",
						post: {
							connect: {
								id: botvinnik.posts[0].id
							}
						}
					}
				]
			}
		}
	});

	const botvinnikcomment = await prisma.user.update({
		where: {
			email: "botvinkle21@gmail.com"
		},
		data: {
			following: {
				connect: {
					id: dijkstra.id
				}
			},
			comments: {
				create: [
					{
						content: "Great to see you on this topic.",
						post: {
							connect: {
								id: dijkstra.posts[3].id
							}
						}
					}
				]
			}
		}
	});

	const user1 = await prisma.user.upsert({
		where: {
			email: "user1@example.com"
		},
		update: {},
		create: {
			name: "John",
			username: "johndoe",
			email: "user1@example.com"
		}
	});
	console.log("John Created!");

	const user2 = await prisma.user.upsert({
		where: {
			email: "user2@example.com"
		},
		update: {},
		create: {
			name: "Jane",
			username: "janesmith",
			email: "user2@example.com"
		}
	});
	console.log("Jane Created!");

	const post3 = await prisma.post.create({
		data: {
			title: "The Beauty of Nature",
			content:
				"Spent the weekend hiking in the mountains. Nature is amazing!",
			author: {
				connect: {
					id: user1.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Nature"
						},
						create: {
							name: "Nature"
						}
					}
				]
			}
		}
	});

	const post4 = await prisma.post.create({
		data: {
			title: "Summer Vacation Ideas",
			content:
				"Looking for some summer vacation ideas. Any recommendations?",
			author: {
				connect: {
					id: user2.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Travel"
						},
						create: {
							name: "Travel"
						}
					}
				]
			}
		}
	});

	const user2Likes = await prisma.user.update({
		where: {
			email: "user2@example.com"
		},
		data: {
			postLikes: {
				create: [
					{
						post: {
							connect: {
								id: post3.id
							}
						}
					},
					{
						post: {
							connect: {
								id: post4.id
							}
						}
					}
				]
			}
		}
	});

	await prisma.user.update({
		where: {
			email: "azad@mail.com"
		},
		data: {
			following: {
				connect: [
					{
						id: user1.id
					},
					{
						id: user2.id
					}
				]
			}
		}
	});

	await prisma.user.update({
		where: {
			email: "achurch54@outlook.com"
		},
		data: {
			followedBy: {
				connect: [
					{
						id: user2.id
					}
				]
			}
		}
	});

	// alice is a an explorer
	const alice = await prisma.user.upsert({
		where: {
			email: "alice@example.com"
		},
		update: {},
		create: {
			name: "Alice Zhang",
			username: "alicej",
			email: "alice@example.com"
		}
	});
	console.log("Alice Created!");

	const user4 = await prisma.user.upsert({
		where: {
			email: "user4@example.com"
		},
		update: {},
		create: {
			name: "Bob Williams",
			username: "bobw",
			email: "user4@example.com"
		}
	});
	console.log("Bob Created!");

	// Additional posts for user3
	const post5 = await prisma.post.create({
		data: {
			title: "The Art of Photography",
			content: "Capturing moments that last a lifetime.",
			author: {
				connect: {
					id: alice.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Photography"
						},
						create: {
							name: "Photography"
						}
					}
				]
			}
		}
	});

	const post6 = await prisma.post.create({
		data: {
			title: "Exploring New Horizons",
			content: "Venturing into the unknown, one step at a time.",
			author: {
				connect: {
					id: alice.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Adventure"
						},
						create: {
							name: "Adventure"
						}
					}
				]
			}
		}
	});

	// Additional posts for user4
	const post7 = await prisma.post.create({
		data: {
			title: "Tech Trends",
			content: "The latest tech trends that are shaping the future.",
			author: {
				connect: {
					id: user4.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Technology"
						},
						create: {
							name: "Technology"
						}
					}
				]
			}
		}
	});

	const post3Comments = await Promise.all([
		prisma.comment.create({
			data: {
				content: "Beautiful scenery! I'd love to go hiking there.",
				post: {
					connect: {
						id: post3.id
					}
				},
				author: {
					connect: {
						id: user2.id
					}
				}
			}
		}),
		prisma.comment.create({
			data: {
				content: "Nature always has a way of refreshing the soul.",
				post: {
					connect: {
						id: post3.id
					}
				},
				author: {
					connect: {
						id: alice.id
					}
				}
			}
		}),
		prisma.comment.create({
			data: {
				content:
					"I agree! Hiking is the best way to connect with nature.",
				post: {
					connect: {
						id: post3.id
					}
				},
				author: {
					connect: {
						id: user1.id
					}
				}
			}
		})
	]);

	const post4Comments = await Promise.all([
		prisma.comment.create({
			data: {
				content: "How about a beach vacation? Sun, sand, and sea!",
				post: {
					connect: {
						id: post4.id
					}
				},
				author: {
					connect: {
						id: user4.id
					}
				}
			}
		}),
		prisma.comment.create({
			data: {
				content:
					"I'm thinking of a mountain retreat. Serene and peaceful.",
				post: {
					connect: {
						id: post4.id
					}
				},
				author: {
					connect: {
						id: user2.id
					}
				}
			}
		}),
		prisma.comment.create({
			data: {
				content: "What about a cultural city tour? So much to explore!",
				post: {
					connect: {
						id: post4.id
					}
				},
				author: {
					connect: {
						id: alice.id
					}
				}
			}
		})
	]);

	const post3Likes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: user4.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: user1.id
					}
				}
			}
		})
	]);

	// Additional likes for post4 (by user1 and user3)
	const post4Likes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post4.id
					}
				},
				user: {
					connect: {
						id: user1.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post4.id
					}
				},
				user: {
					connect: {
						id: alice.id
					}
				}
			}
		})
	]);

	await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: azad.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post4.id
					}
				},
				user: {
					connect: {
						id: azad.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post5.id
					}
				},
				user: {
					connect: {
						id: azad.id
					}
				}
			}
		})
	]);

	await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post5.id
					}
				},
				user: {
					connect: {
						id: botvinnik.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post6.id
					}
				},
				user: {
					connect: {
						id: botvinnik.id
					}
				}
			}
		})
	]);

	await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: dijkstra.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post6.id
					}
				},
				user: {
					connect: {
						id: dijkstra.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: dijkstra.id
					}
				}
			}
		})
	]);

	const user5 = await prisma.user.upsert({
		where: {
			email: "jiyoung@example.com"
		},
		update: {},
		create: {
			name: "Ji-Young Kim",
			username: "jiyoungk",
			email: "jiyoung@example.com",
			following: {
				connect: {
					id: dijkstra.id
				}
			}
		}
	});
	console.log("Ji-Young Created!");

	const user6 = await prisma.user.upsert({
		where: {
			email: "hiroshi@example.com"
		},
		update: {},
		create: {
			name: "Hiroshi Tanaka",
			username: "hiroshitan",
			email: "hiroshi@example.com",
			following: {
				connect: {
					id: dijkstra.id
				}
			}
		}
	});
	console.log("Hiroshi Created!");

	const user7 = await prisma.user.upsert({
		where: {
			email: "ying@example.com"
		},
		update: {},
		create: {
			name: "Ying Chen",
			username: "yingc",
			email: "ying@example.com",
			following: {
				connect: {
					id: dijkstra.id
				}
			}
		}
	});
	console.log("Ying Created!");

	// User 7 (Ying Chen) also follows Botvinnik
	const user7FollowsBotvinnik = await prisma.user.update({
		where: {
			email: "ying@example.com"
		},
		data: {
			following: {
				connect: {
					id: botvinnik.id
				}
			}
		}
	});

	const user5Likes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: user5.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: user5.id
					}
				}
			}
		})
	]);

	// Additional likes by user6 (Hiroshi Tanaka)
	const user6Likes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: user6.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post3.id
					}
				},
				user: {
					connect: {
						id: user6.id
					}
				}
			}
		})
	]);

	// Additional likes by user7 (Ying Chen)
	const user7Likes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post5.id
					}
				},
				user: {
					connect: {
						id: user7.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: user7.id
					}
				}
			}
		})
	]);

	const hiroshiPost = await prisma.post.create({
		data: {
			title: "The Power of JavaScript: A Comprehensive Guide",
			content: `Hello everyone! 👋
	  In this post, I want to share my insights into the power of JavaScript and how it has become one of the most popular and versatile programming languages in the world.

	  JavaScript is an essential language for web development. Its ability to run on both the client-side and server-side makes it incredibly versatile. Let's take a look at some of the key features that make JavaScript so powerful.

	  1. Asynchronous Programming:
	  JavaScript's asynchronous nature allows it to handle non-blocking operations efficiently. This is crucial for building responsive and dynamic web applications. Take a look at this example of using async/await for asynchronous API calls:

	  \`\`\`javascript
	  async function fetchData() {
		try {
		  const response = await fetch('https://api.example.com/data');
		  const data = await response.json();
		  console.log(data);
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  }
	  fetchData();
	  \`\`\`

	  2. Modern ES6+ Features:
	  JavaScript's ES6+ introduced several powerful features that enhance code readability and maintainability. Arrow functions, template literals, and destructuring are some of the ES6 features that simplify coding:

	  \`\`\`javascript
	  const name = 'Hiroshi';
	  const greet = (name) => {
		return \`Hello, \${name}!\`;
	  };
	  console.log(greet(name)); // Output: "Hello, Hiroshi!"
	  \`\`\`

	  3. DOM Manipulation:
	  JavaScript's ability to interact with the Document Object Model (DOM) enables developers to create dynamic web pages. Here's an example of how to add a new element to the DOM:

	  \`\`\`html
	  <!DOCTYPE html>
	  <html>
		<body>
		  <div id="container"></div>
		  <script>
			const container = document.getElementById('container');
			const newElement = document.createElement('p');
			newElement.textContent = 'This is a new paragraph.';
			container.appendChild(newElement);
		  </script>
		</body>
	  </html>
	  \`\`\`

	  4. Node.js and Server-side Development:
	  JavaScript's growth expanded beyond the browser with the advent of Node.js. Now, developers can build server-side applications using JavaScript. Here's a simple Node.js server:

	  \`\`\`javascript
	  const http = require('http');
	  const port = 3000;

	  const server = http.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Hello from Node.js server!');
	  });

	  server.listen(port, () => {
		console.log(\`Server is running on http://localhost:\${port}\`);
	  });
	  \`\`\`

	  I hope you enjoyed this comprehensive guide on the power of JavaScript. It's incredible to see how this language continues to evolve and shape the future of web development. Happy coding! 🚀`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "JavaScript"
						},
						create: {
							name: "JavaScript"
						}
					},
					{
						where: {
							name: "Web Development"
						},
						create: {
							name: "Web Development"
						}
					}
				]
			},
			author: {
				connect: {
					id: user6.id
				}
			}
		}
	});

	const churchComment1 = await prisma.comment.create({
		data: {
			content:
				"Great post, Hiroshi! JavaScript is indeed a powerful language. I particularly love the simplicity and flexibility of arrow functions.",
			author: {
				connect: {
					id: church.id
				}
			},
			post: {
				connect: {
					id: hiroshiPost.id
				}
			}
		}
	});

	// Additional comment likes on Church's comment
	const churchCommentLike1 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: churchComment1.id
				}
			},
			user: {
				connect: {
					id: user6.id // Hiroshi Tanaka likes Church's comment
				}
			}
		}
	});

	// Additional comment replies by other users
	const jiyoungReply1 = await prisma.comment.create({
		data: {
			content:
				"Totally agree, Church! Arrow functions have made code more concise and easier to read.",
			author: {
				connect: {
					id: user5.id // Ji-Young Kim replies to Church's comment
				}
			},
			post: {
				connect: {
					id: hiroshiPost.id
				}
			},
			parent: {
				connect: {
					id: churchComment1.id // Reply to Church's comment
				}
			}
		}
	});

	const yingReply1 = await prisma.comment.create({
		data: {
			content:
				"Absolutely! Arrow functions are a game-changer. I also find destructuring and template literals incredibly useful!",
			author: {
				connect: {
					id: user7.id // Ying Chen replies to Church's comment
				}
			},
			post: {
				connect: {
					id: hiroshiPost.id
				}
			},
			parent: {
				connect: {
					id: churchComment1.id // Reply to Church's comment
				}
			}
		}
	});

	const churchReply1 = await prisma.comment.create({
		data: {
			content:
				"Thanks for the replies, Ji-Young and Ying! Indeed, JavaScript's modern features have revolutionized coding, making it more enjoyable and productive for developers.",
			author: {
				connect: {
					id: church.id // Church replies to Ji-Young and Ying's comments
				}
			},
			post: {
				connect: {
					id: hiroshiPost.id
				}
			},
			parent: {
				connect: {
					id: churchComment1.id // Reply to Ji-Young and Ying's replies
				}
			}
		}
	});

	// Additional comment likes on the replies
	const churchReplyLike1 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: churchReply1.id // Church likes his own reply
				}
			},
			user: {
				connect: {
					id: church.id
				}
			}
		}
	});

	const yingReplyLike1 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: yingReply1.id // Ying likes Ji-Young's reply
				}
			},
			user: {
				connect: {
					id: user7.id
				}
			}
		}
	});

	const churchFollowsHiroshi = await prisma.user.update({
		where: {
			email: "achurch54@outlook.com"
		},
		data: {
			following: {
				connect: {
					id: user6.id
				}
			}
		}
	});

	const dijkstraHighQualityPost = await prisma.post.create({
		data: {
			title: "The Art of Algorithm Design: Striving for Elegance",
			content: `Greetings, fellow developers! 🖥️
	  In this post, I'd like to delve into the art of algorithm design and discuss the importance of striving for elegance in our solutions.

	  Algorithm design is at the core of computer science and plays a pivotal role in solving complex problems efficiently. Crafting elegant algorithms not only enhances the performance of our software but also makes it easier to maintain and understand. Here are some key principles to achieve elegance in algorithm design:

	  1. Clarity and Simplicity:
	  A well-designed algorithm should be clear and straightforward. Avoid overcomplicating the solution with unnecessary details. Emphasize simplicity, as it allows for better comprehension and reduces the chances of introducing bugs. Remember, simplicity is the ultimate sophistication.

	  2. Time and Space Complexity:
	  Optimize the algorithm's time and space complexity to achieve efficiency. Strive for algorithms with linear or logarithmic time complexity whenever possible. Be cautious of exponential or factorial time complexities that can hinder performance.

	  3. Modularity and Reusability:
	  Break down the algorithm into modular components that can be reused in different contexts. Modular designs promote code maintainability and facilitate code sharing across projects.

	  4. Mathematical Rigor:
	  Leverage mathematical principles to derive and validate your algorithms. Proving the correctness of an algorithm strengthens its reliability and builds confidence in its performance.

	  5. Optimization vs. Readability:
	  Balance optimization efforts with code readability. While optimization is crucial, it should not compromise the clarity of the algorithm. Code that is easy to read and understand is more maintainable in the long run.

	  6. Considering Edge Cases:
	  Thoroughly test the algorithm for edge cases and handle corner scenarios gracefully. Robust algorithms account for exceptional inputs and gracefully handle boundary conditions.

	  Let's embrace the art of algorithm design and pursue elegance in our coding practices. As we continue to advance in computer science, elegance in algorithm design will remain a timeless principle that elevates the quality of our software. Happy coding! 🚀`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Computer Science"
						},
						create: {
							name: "Computer Science"
						}
					},
					{
						where: {
							name: "Algorithm Design"
						},
						create: {
							name: "Algorithm Design"
						}
					}
				]
			},
			author: {
				connect: {
					id: dijkstra.id
				}
			}
		}
	});

	const dijkstraHighQualityPostLike1 = await prisma.postLike.create({
		data: {
			post: {
				connect: {
					id: dijkstraHighQualityPost.id
				}
			},
			user: {
				connect: {
					id: dijkstra.id // Dijkstra likes his own post
				}
			}
		}
	});

	const dijkstraHighQualityPostLike2 = await prisma.postLike.create({
		data: {
			post: {
				connect: {
					id: dijkstraHighQualityPost.id
				}
			},
			user: {
				connect: {
					id: azad.id // Azad likes Dijkstra's post
				}
			}
		}
	});

	// Create comments on Dijkstra's high-quality post
	const dijkstraHighQualityPostComment1 = await prisma.comment.create({
		data: {
			content:
				"Are you looking to get hired by META, APPLE OR GOOGLE. See this link https://bit.ly/azad-ali-azad-ali-1a1a1a1a1/",
			author: {
				connect: {
					id: azad.id // Azad leaves a comment on Dijkstra's post
				}
			},
			post: {
				connect: {
					id: dijkstraHighQualityPost.id
				}
			}
		}
	});

	const dijkstraHighQualityPostComment2 = await prisma.comment.create({
		data: {
			content:
				"Excellent breakdown of algorithm design principles, Dijkstra! I appreciate the emphasis on simplicity and efficiency.",
			author: {
				connect: {
					id: botvinnik.id // Botvinnik leaves a comment on Dijkstra's post
				}
			},
			post: {
				connect: {
					id: dijkstraHighQualityPost.id
				}
			}
		}
	});

	const dijkstraHighQualityPostComment3 = await prisma.comment.create({
		data: {
			content:
				"Your post motivates me to improve my algorithm design skills. Thanks for sharing, Dijkstra!",
			author: {
				connect: {
					id: church.id // Church leaves a comment on Dijkstra's post
				}
			},
			post: {
				connect: {
					id: dijkstraHighQualityPost.id
				}
			}
		}
	});

	// Add likes to the comments on Dijkstra's post
	const dijkstraHighQualityPostComment1Like = await prisma.commentLike.create(
		{
			data: {
				comment: {
					connect: {
						id: dijkstraHighQualityPostComment1.id // Azad likes his own comment
					}
				},
				user: {
					connect: {
						id: azad.id
					}
				}
			}
		}
	);

	const dijkstraHighQualityPostComment2Like = await prisma.commentLike.create(
		{
			data: {
				comment: {
					connect: {
						id: dijkstraHighQualityPostComment2.id // Botvinnik likes his own comment
					}
				},
				user: {
					connect: {
						id: botvinnik.id
					}
				}
			}
		}
	);

	const alicePost1 = await prisma.post.create({
		data: {
			title: "Lost in the Jungle: An Adventure to Remember",
			content: `Hey adventurers! 🌿🌳
	  I'm back from an exhilarating journey through the dense Amazon jungle. Navigating through the thick vegetation and unpredictable terrain was no easy feat, but the experience was nothing short of extraordinary.

	  As I delved deeper into the jungle, I encountered diverse wildlife, from vibrant parrots to elusive jaguars. I relied on my survival skills to find food, build shelter, and purify water. The nights were filled with the symphony of insects and the eerie calls of nocturnal creatures, making the expedition all the more thrilling.

	  The Amazon taught me the value of adaptability and resourcefulness. In the face of challenges, I discovered my resilience and how to embrace the unknown. Nature has a unique way of humbling us, reminding us that we are just visitors in this vast and untamed world.

	  Remember, every adventure comes with risks and rewards. To all my fellow adventurers, keep exploring, learning, and cherishing the wonders of our planet. Adventure awaits around every corner! 🌏✨`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Adventure"
						},
						create: {
							name: "Adventure"
						}
					},
					{
						where: {
							name: "Wilderness"
						},
						create: {
							name: "Wilderness"
						}
					}
				]
			},
			author: {
				connect: {
					id: alice.id
				}
			}
		}
	});

	const alicePost2 = await prisma.post.create({
		data: {
			title: "Solo Camping in the Wilderness: A Test of Grit",
			content: `Greetings, fellow adventurers! ⛺🏕️
	  Last week, I embarked on a solo camping expedition in the heart of the untamed wilderness. Surrounded by towering trees and shimmering stars, I found myself humbled by the beauty and vastness of nature.

	  Throughout the journey, I honed my survival skills, starting a fire with flint and tinder, purifying water from nearby streams, and constructing a sturdy shelter from fallen branches and leaves. The solitude offered me an opportunity to connect with myself and the natural world in a profound way.

	  Though challenges arose, the sense of empowerment that comes with self-reliance is indescribable. Embracing uncertainty and embracing the beauty of the present moment, I felt more alive than ever.

	  To all those seeking an adventure of a lifetime, don't shy away from solitude and self-discovery. Nature has much to teach us if we're willing to listen.

	  Stay adventurous, and may your journeys be filled with wonder and self-discovery! 🌌🔥`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Camping"
						},
						create: {
							name: "Camping"
						}
					},
					{
						where: {
							name: "Wilderness"
						},
						create: {
							name: "Wilderness"
						}
					},
					{
						where: {
							name: "Self-Discovery"
						},
						create: {
							name: "Self-Discovery"
						}
					}
				]
			},
			author: {
				connect: {
					id: alice.id
				}
			}
		}
	});

	const alicePost1Like1 = await prisma.postLike.create({
		data: {
			post: {
				connect: {
					id: alicePost1.id // Azad likes Alice's post 1
				}
			},
			user: {
				connect: {
					id: azad.id
				}
			}
		}
	});

	const alicePost2Like1 = await prisma.postLike.create({
		data: {
			post: {
				connect: {
					id: alicePost2.id // Church likes Alice's post 2
				}
			},
			user: {
				connect: {
					id: church.id
				}
			}
		}
	});

	const alicePost2Like2 = await prisma.postLike.create({
		data: {
			post: {
				connect: {
					id: alicePost2.id // Botvinnik likes Alice's post 2
				}
			},
			user: {
				connect: {
					id: botvinnik.id
				}
			}
		}
	});

	const sportsBot = await prisma.user.upsert({
		where: {
			email: "sportsbot@example.com"
		},
		update: {},
		create: {
			name: "SportsBot",
			username: "sports_bot",
			email: "sportsbot@example.com"
		}
	});
	console.log("SportsBot Created!");

	// SportsBot's posts reporting FIFA World Cup match scores
	const sportsBotPost1 = await prisma.post.create({
		data: {
			title: "FIFA World Cup 2026: Opening Match Result",
			content: `⚽️🏆 FIFA World Cup 2026 - Opening Match Result 🏆⚽️

	  The opening match of the FIFA World Cup 2026 saw an exciting clash between the host nation, United States, and the reigning champions, France. The match ended in a thrilling 2-2 draw, leaving fans on the edge of their seats until the final whistle.

	  Both teams displayed incredible skills and determination, promising an electrifying tournament ahead. Stay tuned for more updates and scores as the World Cup unfolds! 🌎🌍🌏`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "FIFA World Cup 2026"
						},
						create: {
							name: "FIFA World Cup 2026"
						}
					},
					{
						where: {
							name: "Football"
						},
						create: {
							name: "Football"
						}
					}
				]
			},
			author: {
				connect: {
					id: sportsBot.id
				}
			}
		}
	});

	const sportsBotPost2 = await prisma.post.create({
		data: {
			title: "FIFA World Cup 2026: Semi-Final Match Result",
			content: `⚽️🏆 FIFA World Cup 2026 - Semi-Final Match Result 🏆⚽️

	  In a nail-biting semi-final encounter, Brazil defeated Germany 3-2, securing their place in the World Cup final. The match was filled with drama and memorable moments, showcasing the true spirit of the beautiful game.

	  As the tournament progresses, the stakes get higher, and every team vies for glory. The anticipation for the final is at its peak! Who will lift the coveted trophy? Stay tuned to find out! 🏆🌟`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "FIFA World Cup 2026"
						},
						create: {
							name: "FIFA World Cup 2026"
						}
					},
					{
						where: {
							name: "Football"
						},
						create: {
							name: "Football"
						}
					}
				]
			},
			author: {
				connect: {
					id: sportsBot.id
				}
			}
		}
	});

	const sportsBotPost3 = await prisma.post.create({
		data: {
			title: "FIFA World Cup 2026: Final Match Result",
			content: `⚽️🏆 FIFA World Cup 2026 - Final Match Result 🏆⚽️

	  In the grand finale of the FIFA World Cup 2026, Argentina emerged as the champions, defeating Spain 4-2 in a thrilling match. The stadium erupted with joy as Argentina lifted the coveted trophy, celebrating their victory with a display of skill and passion.

	  This World Cup journey has been one for the ages, with numerous memorable moments etched in football history. Congratulations to Argentina for their spectacular triumph, and kudos to all teams for putting up a stellar show! Until the next World Cup, let the celebrations continue! 🎉🎊`,
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "FIFA World Cup 2026"
						},
						create: {
							name: "FIFA World Cup 2026"
						}
					},
					{
						where: {
							name: "Football"
						},
						create: {
							name: "Football"
						}
					}
				]
			},
			author: {
				connect: {
					id: sportsBot.id
				}
			}
		}
	});

	console.log("All Done....");
	console.log("Get Obelisking!");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
