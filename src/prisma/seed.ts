import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import { hi } from "date-fns/locale";

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
	console.log("Botvinnik Created!");

	const dijkstra = await prisma.user.upsert({
		where: {
			email: "aloken1309u8!@swedemail.com"
		},
		update: {},
		create: {
			name: "Dijkstra",
			username: "dijkstra",
			email: "aloken1309u8!@swedemail.com",
			bio: `I'm interested in the boundary between tech and society, and how it affects the forces that shape our world.
			Current Focus: AI, Working Remotely, EVs.
			I post every Monday, Wednesday, and Friday.
			Current Series: Maps - The Future of Work - Relics of Japanese Internet
			`,
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
			name: "Jax",
			username: "jjlov3",
			email: "jaxjones@example.com",
			bio: "I live life by the three M's: Music, Muscles, and Money. If you're on the grind, reach out"
		}
	});
	console.log("John Created!");

	const user2 = await prisma.user.upsert({
		where: {
			email: "user2@example.com"
		},
		update: {},
		create: {
			name: "Lupita",
			username: "lolpita31",
			email: "user2@example.com",
			bio: "Librarian, Bookworm, and Cat Lover"
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
			email: "alice@example.com",
			bio: "I'm an explorer at heart. I love to travel and see new places."
		}
	});
	console.log("Alice Created!");

	const bob = await prisma.user.upsert({
		where: {
			email: "bob@example.com"
		},
		update: {},
		create: {
			name: "Bob Williams",
			username: "bobw",
			email: "bob@example.com",
			bio: "Father, Loving Husband, and Long Distance Runner"
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
			content:
				"Venturing into the unknown, one step at a time. The world is a big place and I want to see it all.",
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

	// Additional posts for bob
	const post7 = await prisma.post.create({
		data: {
			title: "What's in your shoe cabinet?",
			content:
				"I'm currently running in the Nike Pegasus 37. What about you?",
			author: {
				connect: {
					id: bob.id
				}
			},
			categories: {
				connectOrCreate: [
					{
						where: {
							name: "Running"
						},
						create: {
							name: "Running"
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
						id: bob.id
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
						id: bob.id
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

	const jiyoung = await prisma.user.upsert({
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
			},
			bio: "The definition of insanity is doing the same thing over and over again and expecting different results."
		}
	});
	console.log("Ji-Young Created!");

	const hiroshi = await prisma.user.upsert({
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
			},
			bio: "In pursuit of the Zen of Programming..."
		}
	});
	console.log("Hiroshi Created!");

	const yingchen = await prisma.user.upsert({
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
			},
			followedBy: {
				connect: {
					id: azad.id
				}
			},
			bio: "Grad UIUC '21 | Living in Chicago, IL | In ❤️ with the world 🌎"
		}
	});
	console.log("Ying Created!");

	// User 7 (Ying Chen) also follows Botvinnik
	const yingchenFollowsBotvinnik = await prisma.user.update({
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

	const jiyoungLikes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: jiyoung.id
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
						id: jiyoung.id
					}
				}
			}
		})
	]);

	// Additional likes by hiroshi (Hiroshi Tanaka)
	const hiroshiLikes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post7.id
					}
				},
				user: {
					connect: {
						id: hiroshi.id
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
						id: hiroshi.id
					}
				}
			}
		})
	]);

	// Additional likes by yingchen (Ying Chen)
	const yingchenLikes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: post5.id
					}
				},
				user: {
					connect: {
						id: yingchen.id
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
						id: yingchen.id
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
					id: hiroshi.id
				}
			}
		}
	});

	// additional likes on Hiroshi's post
	const hiroshiPostLikes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: hiroshiPost.id
					}
				},
				user: {
					connect: {
						id: yingchen.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: hiroshiPost.id
					}
				},
				user: {
					connect: {
						id: jiyoung.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: hiroshiPost.id
					}
				},
				user: {
					connect: {
						id: church.id
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: hiroshiPost.id
					}
				},
				user: {
					connect: {
						id: hiroshi.id
					}
				}
			}
		})
	]);

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
					id: hiroshi.id // Hiroshi Tanaka likes Church's comment
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
					id: jiyoung.id // Ji-Young Kim replies to Church's comment
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
					id: yingchen.id // Ying Chen replies to Church's comment
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
					id: yingchen.id
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
					id: hiroshi.id
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

	const jiyoungHighQualityPost = await prisma.post.create({
		data: {
			title: "Newcomb's Problem and Regret of Rationality",
			content: `The following may well be the most controversial dilemma in the history of decision theory:
> A superintelligence from another galaxy, whom we shall call Omega, comes to Earth and sets about playing a strange little game.  In this game, Omega selects a human being, sets down two boxes in front of them, and flies away.
> Box A is transparent and contains a thousand dollars.
> Box B is opaque, and contains either a million dollars, or nothing.
> You can take both boxes, or take only box B.
> And the twist is that Omega has put a million dollars in box B iff Omega has predicted that you will take only box B.
> Omega has been correct on each of 100 observed occasions so far - everyone who took both boxes has found box B empty and received only a thousand dollars; everyone who took only box B has found B containing a million dollars.  (We assume that box A vanishes in a puff of smoke if you take only box B; no one else can take box A afterward.)
> Before you make your choice, Omega has flown off and moved on to its next game.  Box B is already empty or already full.
> Omega drops two boxes on the ground in front of you and flies off.
> Do you take both boxes, or only box B?

And the standard philosophical conversation runs thusly:

> One-boxer:  "I take only box B, of course.  I'd rather have a million than a thousand."
> Two-boxer:  "Omega has already left.  Either box B is already full or already empty.  If box B is already empty, then taking both boxes nets me $1000, taking only box B nets me $0.  If box B is already full, then taking both boxes nets $1,001,000, taking only box B nets $1,000,000.  In either case I do better by taking both boxes, and worse by leaving a thousand dollars on the table - so I will be rational, and take both boxes."
> One-boxer:  "If you're so rational, why ain'cha rich?"
> Two-boxer:  "It's not my fault Omega chooses to reward only people with irrational dispositions, but it's already too late for me to do anything about that."

There is a _large_ literature on the topic of Newcomblike problems - especially if you consider the Prisoner's Dilemma as a special case, which it is generally held to be.  "Paradoxes of Rationality and Cooperation" is an edited volume that includes Newcomb's original essay.  For those who read only online material, this PhD thesis summarizes the major standard positions.

I'm not going to go into the whole literature, but the dominant consensus in modern decision theory is that one should two-box, and Omega is just rewarding agents with irrational dispositions.  This dominant view goes by the name of "causal decision theory".

As you know, the primary reason I'm blogging is that I am an incredibly slow writer when I try to work in any other format.  So I'm not going to try to present my own analysis here.  Way too long a story, even by my standards.

But it is agreed even among causal decision theorists that if you have the power to precommit yourself to take one box, in Newcomb's Problem, then you should do so.  If you can precommit yourself before Omega examines you; then you are directly causing box B to be filled.

Now in my field - which, in case you have forgotten, is self-modifying AI - this works out to saying that if you build an AI that two-boxes on Newcomb's Problem, it will self-modify to one-box on Newcomb's Problem, if the AI considers in advance that it might face such a situation.  Agents with free access to their own source code have access to a cheap method of precommitment.

What if you expect that you might, in general, face a Newcomblike problem, without knowing the exact form of the problem?  Then you would have to modify yourself into a sort of agent whose disposition was such that it would generally receive high rewards on Newcomblike problems.

But what does an agent with a disposition generally-well-suited to Newcomblike problems look like?  Can this be formally specified?

Yes, but when I tried to write it up, I realized that I was starting to write a small book.  And it wasn't the most important book I had to write, so I shelved it.  My slow writing speed really is the bane of my existence.  The theory I worked out seems, to me, to have many nice properties besides being well-suited to Newcomblike problems.  It would make a nice PhD thesis, if I could get someone to accept it as my PhD thesis.  But that's pretty much what it would take to make me unshelve the project.  Otherwise I can't justify the time expenditure, not at the speed I currently write books.

I say all this, because there's a common attitude that "Verbal arguments for one-boxing are easy to come by, what's hard is developing a good decision theory that one-boxes" - coherent math which one-boxes on Newcomb's Problem without producing absurd results elsewhere.  So I do understand that, and I did set out to develop such a theory, but my writing speed on big papers is so slow that I can't publish it.  Believe it or not, it's true.

Nonetheless, I would like to present some of my motivations on Newcomb's Problem - the reasons I felt impelled to seek a new theory - because they illustrate my source-attitudes toward rationality.  Even if I can't present the theory that these motivations motivate...

First, foremost, fundamentally, above all else:

Rational agents should WIN.

Don't mistake me, and think that I'm talking about the Hollywood Rationality stereotype that rationalists should be selfish or shortsighted.  If your utility function has a term in it for others, then win their happiness.  If your utility function has a term in it for a million years hence, then win the eon.

But at any rate, _WIN_.  Don't lose reasonably, **WIN**.

Now there are defenders of causal decision theory who argue that the two-boxers are doing their best to win, and cannot help it if they have been cursed by a Predictor who favors irrationalists.  I will talk about this defense in a moment.  But first, I want to draw a distinction between causal decision theorists who believe that two-boxers are genuinely doing their best to win; versus someone who thinks that two-boxing is the reasonable or the rational thing to do, but that the reasonable move just happens to predictably lose, in this case.  There are a lot of people out there who think that rationality predictably loses on various problems - that, too, is part of the Hollywood Rationality stereotype, that Kirk is predictably superior to Spock.

Next, let's turn to the charge that Omega favors irrationalists.  I can conceive of a superbeing who rewards only people born with a particular gene, regardless of their choices.  I can conceive of a superbeing who rewards people whose brains inscribe the particular algorithm of "Describe your options in English and choose the last option when ordered alphabetically," but who does not reward anyone who chooses the same option for a different reason.  But Omega rewards people who choose to take only box B, regardless of which algorithm they use to arrive at this decision, and this is why I don't buy the charge that Omega is rewarding the irrational.  Omega doesn't care whether or not you follow some particular ritual of cognition; Omega only cares about your predicted decision.

We can choose whatever reasoning algorithm we like, and will be rewarded or punished only according to that algorithm's choices, with no other dependency - Omega just cares where we go, not how we got there.

It is precisely the notion that Nature does not care about our algorithm, which frees us up to pursue the winning Way - without attachment to any particular ritual of cognition, apart from our belief that it wins.  Every rule is up for grabs, except the rule of winning.

As Miyamoto Musashi said - it's really worth repeating:

> "You can win with a long weapon, and yet you can also win with a short weapon.  In short, the Way of the Ichi school is the spirit of winning, whatever the weapon and whatever its size."

(Another example:  It was argued by McGee that we must adopt bounded utility functions or be subject to "Dutch books" over infinite times.  But:  The utility function is not up for grabs.  I love life without limit or upper bound:  There is no finite amount of life lived N where I would prefer a 80.0001% probability of living N years to an 0.0001% chance of living a googolplex years and an 80% chance of living forever.  This is a sufficient condition to imply that my utility function is unbounded.  So I just have to figure out how to optimize for that morality.  You can't tell me, first, that above all I must conform to a particular ritual of cognition, and then that, if I conform to that ritual, I must change my morality to avoid being Dutch-booked.  Toss out the losing ritual; don't change the definition of winning.  That's like deciding to prefer $1000 to $1,000,000 so that Newcomb's Problem doesn't make your preferred ritual of cognition look bad.)

"But," says the causal decision theorist, "to take only one box, you must somehow believe that your choice can affect whether box B is empty or full - and that's unreasonable!  Omega has already left!  It's physically impossible!"

Unreasonable?  I am a rationalist: what do I care about being unreasonable?  I don't have to conform to a particular ritual of cognition.  I don't have to take only box B because I believe my choice affects the box, even though Omega has already left.  I can just... take only box B.

I do have a proposed alternative ritual of cognition which computes this decision, which this margin is too small to contain; but I shouldn't need to show this to you.  The point is not to have an elegant theory of winning - the point is to win; elegance is a side effect.

Or to look at it another way:  Rather than starting with a concept of what is the reasonable decision, and then asking whether "reasonable" agents leave with a lot of money, start by looking at the agents who leave with a lot of money, develop a theory of which agents tend to leave with the most money, and from this theory, try to figure out what is "reasonable".  "Reasonable" may just refer to decisions in conformance with our current ritual of cognition - what else would determine whether something seems "reasonable" or not?

From James Joyce (no relation), Foundations of Causal Decision Theory:

> Rachel has a perfectly good answer to the "Why ain't you rich?" question.  "I am not rich," she will say, "because I am not the kind of person the psychologist thinks will refuse the money.  I'm just not like you, Irene.  Given that I know that I am the type who takes the money, and given that the psychologist knows that I am this type, it was reasonable of me to think that the $1,000,000 was not in my account.  The $1,000 was the most I was going to get no matter what I did.  So the only reasonable thing for me to do was to take it."
> Irene may want to press the point here by asking, "But don't you wish you were like me, Rachel?  Don't you wish that you were the refusing type?"  There is a tendency to think that Rachel, a committed causal decision theorist, must answer this question in the negative, which seems obviously wrong (given that being like Irene would have made her rich).  This is not the case.  Rachel can and should admit that she does wish she were more like Irene.  "It would have been better for me," she might concede, "had I been the refusing type."  At this point Irene will exclaim, "You've admitted it!  It wasn't so smart to take the money after all."  Unfortunately for Irene, her conclusion does not follow from Rachel's premise.  Rachel will patiently explain that wishing to be a refuser in a Newcomb problem is not inconsistent with thinking that one should take the $1,000 whatever type one is.  When Rachel wishes she was Irene's type she is wishing for Irene's options, not sanctioning her choice.

It is, I would say, a general principle of rationality - indeed, part of how I define rationality - that you never end up envying someone else's mere choices.  You might envy someone their genes, if Omega rewards genes, or if the genes give you a generally happier disposition.  But Rachel, above, envies Irene her choice, and only her choice, irrespective of what algorithm Irene used to make it.  Rachel wishes just that she had a disposition to choose differently.

You shouldn't claim to be more rational than someone and simultaneously envy them their choice - only their choice.  Just do the act you envy.

I keep trying to say that rationality is the winning-Way, but causal decision theorists insist that taking both boxes is what really wins, because you can't possibly do better by leaving $1000 on the table... even though the single-boxers leave the experiment with more money.  Be careful of this sort of argument, any time you find yourself defining the "winner" as someone other than the agent who is currently smiling from on top of a giant heap of utility.

Yes, there are various thought experiments in which some agents start out with an advantage - but if the task is to, say, decide whether to jump off a cliff, you want to be careful not to define cliff-refraining agents as having an unfair prior advantage over cliff-jumping agents, by virtue of their unfair refusal to jump off cliffs.  At this point you have covertly redefined "winning" as conformance to a particular ritual of cognition.  Pay attention to the money!

Or here's another way of looking at it:  Faced with Newcomb's Problem, would you want to look really hard for a reason to believe that it was perfectly reasonable and rational to take only box B; because, if such a line of argument existed, you would take only box B and find it full of money?  Would you spend an extra hour thinking it through, if you were confident that, at the end of the hour, you would be able to convince yourself that box B was the rational choice?  This too is a rather odd position to be in.  Ordinarily, the work of rationality goes into figuring out which choice is the best - not finding a reason to believe that a particular choice is the best.

Maybe it's too easy to say that you "ought to" two-box on Newcomb's Problem, that this is the "reasonable" thing to do, so long as the money isn't actually in front of you.  Maybe you're just numb to philosophical dilemmas, at this point.  What if your daughter had a 90% fatal disease, and box A contained a serum with a 20% chance of curing her, and box B might contain a serum with a 95% chance of curing her?  What if there was an asteroid rushing toward Earth, and box A contained an asteroid deflector that worked 10% of the time, and box B might contain an asteroid deflector that worked 100% of the time?

Would you, at that point, find yourself tempted to make an unreasonable choice?

If the stake in box B was something you could not leave behind?  Something overwhelmingly more important to you than being reasonable?  If you absolutely had to win - really win, not just be defined as winning?

Would you wish with all your power that the "reasonable" decision was to take only box B?

Then maybe it's time to update your definition of reasonableness.

Alleged rationalists should not find themselves envying the mere decisions of alleged nonrationalists, because your decision can be whatever you like.  When you find yourself in a position like this, you shouldn't chide the other person for failing to conform to your concepts of reasonableness.  You should realize you got the Way wrong.

So, too, if you ever find yourself keeping separate track of the "reasonable" belief, versus the belief that seems likely to be actually true.  Either you have misunderstood reasonableness, or your second intuition is just wrong.

Now one can't simultaneously define "rationality" as the winning Way, and define "rationality" as Bayesian probability theory and decision theory.  But it is the argument that I am putting forth, and the moral of my advice to Trust In Bayes, that the laws governing winning have indeed proven to be math.  If it ever turns out that Bayes fails - receives systematically lower rewards on some problem, relative to a superior alternative, in virtue of its mere decisions - then Bayes has to go out the window.  "Rationality" is just the label I use for my beliefs about the winning Way - the Way of the agent smiling from on top of the giant heap of utility.  Currently, that label refers to Bayescraft.

I realize that this is not a knockdown criticism of causal decision theory - that would take the actual book and/or PhD thesis - but I hope it illustrates some of my underlying attitude toward this notion of "rationality".

You shouldn't find yourself distinguishing the winning choice from the reasonable choice.  Nor should you find yourself distinguishing the reasonable belief from the belief that is most likely to be true.

That is why I use the word "rational" to denote my beliefs about accuracy and winning - not to denote verbal reasoning, or strategies which yield certain success, or that which is logically provable, or that which is publicly demonstrable, or that which is reasonable.

As Miyamoto Musashi said:
> "The primary thing when you take a sword in your hands is your intention to cut the enemy, whatever the means. Whenever you parry, hit, spring, strike or touch the enemy's cutting sword, you must cut the enemy in the same movement. It is essential to attain this. If you think only of hitting, springing, striking or touching the enemy, you will not be able actually to cut him."
`,
			categories: {
				// decision theory, newcomb's paradox, one-boxing, two-boxing, conditional consistency, bayesianism, Something to Protect, Pre-commitment, Rationality
				connectOrCreate: [
					{
						where: {
							name: "Decision Theory"
						},
						create: {
							name: "Decision Theory"
						}
					},
					{
						where: {
							name: "Newcomb's Paradox"
						},
						create: {
							name: "Newcomb's Paradox"
						}
					},
					{
						where: {
							name: "One-Boxing"
						},
						create: {
							name: "One-Boxing"
						}
					},
					{
						where: {
							name: "Two-Boxing"
						},
						create: {
							name: "Two-Boxing"
						}
					},
					{
						where: {
							name: "Conditional Consistency"
						},
						create: {
							name: "Conditional Consistency"
						}
					},
					{
						where: {
							name: "Bayesianism"
						},
						create: {
							name: "Bayesianism"
						}
					},
					{
						where: {
							name: "Something to Protect"
						},
						create: {
							name: "Something to Protect"
						}
					},
					{
						where: {
							name: "Pre-commitment"
						},
						create: {
							name: "Pre-commitment"
						}
					},
					{
						where: {
							name: "Rationality"
						},
						create: {
							name: "Rationality"
						}
					}
				]
			},
			author: {
				connect: {
					id: jiyoung.id
				}
			}
		}
	});

	// additional likes on Jiyoung's post
	const jiyoungHighQualityPostLikes = await Promise.all([
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: azad.id // Azad likes Jiyoung's post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: church.id // Church likes Jiyoung's post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: botvinnik.id // Botvinnik likes Jiyoung's post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: dijkstra.id // Dijkstra likes Jiyoung's post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: jiyoung.id // Jiyoung likes his own post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: alice.id // Alice likes Jiyoung's post
					}
				}
			}
		}),
		prisma.postLike.create({
			data: {
				post: {
					connect: {
						id: jiyoungHighQualityPost.id
					}
				},
				user: {
					connect: {
						id: hiroshi.id // Hiroshi likes Jiyoung's post
					}
				}
			}
		})
	]);

	// additional comments on Jiyoung's post
	const churchjiyoung1 = await prisma.comment.create({
		data: {
			content:
				"Great post, Jiyoung! I appreciate the emphasis on the importance of rationality and winning. I look forward to reading your book!",
			author: {
				connect: {
					id: church.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			}
		}
	});

	const churchjiyoung1Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: churchjiyoung1.id
				}
			},
			user: {
				connect: {
					id: church.id // Church likes his own comment
				}
			}
		}
	});

	// ji young replies
	const churchjiyoung2 = await prisma.comment.create({
		data: {
			content:
				"Thanks, Church! I'm glad you enjoyed the post. I hope you find it useful!",
			author: {
				connect: {
					id: jiyoung.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: churchjiyoung1.id
				}
			}
		}
	});

	const churchjiyoung2Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: churchjiyoung2.id
				}
			},
			user: {
				connect: {
					id: church.id
				}
			}
		}
	});

	const churchjiyoung3 = await prisma.comment.create({
		data: {
			content: "I really did! When will your book be published?",
			author: {
				connect: {
					id: church.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: churchjiyoung2.id
				}
			}
		}
	});

	const churchjiyoung4 = await prisma.comment.create({
		data: {
			content:
				"I'm still working on it, but I hope to publish it by the end of the year!",
			author: {
				connect: {
					id: jiyoung.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: churchjiyoung3.id
				}
			}
		}
	});

	const botvinnikjiyoung1 = await prisma.comment.create({
		data: {
			content:
				"I 100% agree. If rationality isn't rewarded then the universe is perverse.",
			author: {
				connect: {
					id: botvinnik.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			}
		}
	});

	const botvinnikjiyoung1Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: botvinnikjiyoung1.id
				}
			},
			user: {
				connect: {
					id: botvinnik.id // Botvinnik likes his own comment
				}
			}
		}
	});

	const botvinnikjiyoung1Like2 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: botvinnikjiyoung1.id
				}
			},
			user: {
				connect: {
					id: jiyoung.id
				}
			}
		}
	});

	const botvinnikjiyoung1Like3 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: botvinnikjiyoung1.id
				}
			},
			user: {
				connect: {
					id: hiroshi.id
				}
			}
		}
	});

	// hiroshi replies
	const botvinnikjiyoung2 = await prisma.comment.create({
		data: {
			content:
				"Although I agree in principle, it's impossible to tell if your perception of rationality lines up with Nature's. I think it's more accurate to say that the universe is indifferent to our notions of rationality. The behavior that maximizes fitness may be slightly distinct fro rationality.",
			author: {
				connect: {
					id: hiroshi.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: botvinnikjiyoung1.id
				}
			}
		}
	});

	const botvinnikjiyoung2Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: botvinnikjiyoung2.id
				}
			},
			user: {
				connect: {
					id: botvinnik.id
				}
			}
		}
	});

	// alice comments
	const alicejiyoung1 = await prisma.comment.create({
		data: {
			content: "How do you define 'winning'?",
			author: {
				connect: {
					id: alice.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			}
		}
	});

	const alicejiyoung1Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: alicejiyoung1.id
				}
			},
			user: {
				connect: {
					id: alice.id
				}
			}
		}
	});

	const alicejiyoung2 = await prisma.comment.create({
		data: {
			content: "I'm also curious about this.",
			author: {
				connect: {
					id: bob.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: alicejiyoung1.id
				}
			}
		}
	});

	const alicejiyoung1Like2 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: alicejiyoung1.id
				}
			},
			user: {
				connect: {
					id: bob.id
				}
			}
		}
	});

	const alicejiyoung2Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: alicejiyoung2.id
				}
			},
			user: {
				connect: {
					id: bob.id
				}
			}
		}
	});

	// jiyoung replies
	const alicejiyoung3 = await prisma.comment.create({
		data: {
			content: "I define 'winning' as maximizing utility.",
			author: {
				connect: {
					id: jiyoung.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			},
			parent: {
				connect: {
					id: alicejiyoung1.id
				}
			}
		}
	});

	const alicejiyoung3Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: alicejiyoung3.id
				}
			},
			user: {
				connect: {
					id: alice.id
				}
			}
		}
	});

	const alicejiyoung3Like2 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: alicejiyoung3.id
				}
			},
			user: {
				connect: {
					id: bob.id
				}
			}
		}
	});

	// djikstra comments
	const djikstrajiyoung1 = await prisma.comment.create({
		data: {
			content: `_Either box B is already full or already empty_. I'm not going to go into the whole literature, but the dominant consensus in modern decision theory is that one should two-box, and Omega is just rewarding agents with irrational dispositions. This dominant view goes by the name of "causal decision theory" I suppose causal decision theory assumes causality only works in one temporal direction. Confronted with a predictor that was right 100 out of 100 times, I would think it very likely that backward-in-time causation exists, and take only B. I assume this would, as you say, produce absurd results elsewhere.
			`,
			author: {
				connect: {
					id: dijkstra.id
				}
			},
			post: {
				connect: {
					id: jiyoungHighQualityPost.id
				}
			}
		}
	});

	// many likes
	const djikstrajiyoung1Like = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: djikstrajiyoung1.id
				}
			},
			user: {
				connect: {
					id: dijkstra.id
				}
			}
		}
	});

	const djikstrajiyoung1Like2 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: djikstrajiyoung1.id
				}
			},
			user: {
				connect: {
					id: bob.id
				}
			}
		}
	});

	const djikstrajiyoung1Like3 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: djikstrajiyoung1.id
				}
			},
			user: {
				connect: {
					id: alice.id
				}
			}
		}
	});

	const djikstrajiyoung1Like4 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: djikstrajiyoung1.id
				}
			},
			user: {
				connect: {
					id: botvinnik.id
				}
			}
		}
	});

	const djikstrajiyoung1Like5 = await prisma.commentLike.create({
		data: {
			comment: {
				connect: {
					id: djikstrajiyoung1.id
				}
			},
			user: {
				connect: {
					id: jiyoung.id
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
			email: "sportsbot@example.com",
			bio: "Keep up to date with the latest news and scores from the world of sports!"
		}
	});
	console.log("SportsBot Created!");

	// SportsBot's posts reporting FIFA World Cup match scores
	const sportsBotPost1 = await prisma.post.create({
		data: {
			title: "FIFA World Cup 2026: Opening Match Result",
			content: `⚽️🏆 FIFA World Cup 2026 - Opening Match Result 🏆⚽️
The opening match of the FIFA World Cup 2026 saw an exciting clash between the host nation, United States, and the reigning champions, France.
The match ended in a thrilling 2-2 draw, leaving fans on the edge of their seats until the final whistle.
Both teams displayed incredible skills and determination, promising an electrifying tournament ahead.
Stay tuned for more updates and scores as the World Cup unfolds! 🌎🌍🌏`,
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
In a nail-biting semi-final encounter, Brazil defeated Germany 3-2, securing their place in the World Cup final.
The match was filled with drama and memorable moments, showcasing the true spirit of the beautiful game.
As the tournament progresses, the stakes get higher, and every team vies for glory.
The anticipation for the final is at its peak! Who will lift the coveted trophy? Stay tuned to find out! 🏆🌟`,
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
In the grand finale of the FIFA World Cup 2026, Argentina emerged as the champions, defeating Spain 4-2 in a thrilling match.
The stadium erupted with joy as Argentina lifted the coveted trophy, celebrating their victory with a display of skill and passion.
This World Cup journey has been one for the ages, with numerous memorable moments etched in football history.
Congratulations to Argentina for their spectacular triumph, and kudos to all teams for putting up a stellar show!
Until the next World Cup, let the celebrations continue! 🎉🎊`,
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
