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
	for (const tableName of tableNames) await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);


	// some example users

	// the bot that follows everyone
	const azad = await prisma.user.upsert({
		where: {
			email: "azad@mail.com",
		},
		update: {},
		create: {
			name: "Azad",
			email: "azad@mail.com",
			username: "azod",
		},
	});
	// refer to api docs for info on password hashing
	const botvinnik_pw = await bcrypt.hash("bottythotty2", 10);
	
	// the wannabe influencer
	const botvinnik = await prisma.user.upsert({
		where: {
			email: "botvinkle21@gmail.com",
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
					id: azad.id,
				}
			},
			following: {
				connect: {
					id: azad.id,
				}
			},
			posts: {
				create: [
					{
						title: "Is the King's Indian Defence doomed?",
						content: "I've been playing the King's Indian Defence for a while now, and I've been  having  a lot of  trouble with it.There's just too many opportunities for white to trade everything and win on the Queenside.I've been thinking about switching to the French Defence, but I'm not sure if that's a good idea.What do you think?",
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
						content: "Who is Rip Van Winkle? What is his story? Why is he so famous? Rip Van Winkle is an american fable that has a magical realism setting that takes place in the Catskill Mountains. Rip Van Winkle unintentionally falls asleep for 20 years and wakes up to a world that is completely different from the one he left behind. He is shocked to find that his wife has died and his children have grown up. He is also shocked to find that the American Revolution has occurred and that the United States is now an independent country. Overall it's a very interesting story that I would recommend to anyone who is interested in American history or magical realism.",
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
			},
		},
		include: {
			posts: true
		}
	});


	// the real influencer
	const dijkstra = await prisma.user.upsert({
		where: {
			email: "aloken1309u8!@swedemail.com",
		},
		update: {},
		create: {
			name: "Dijkstra",
			username: "dijkstra",
			email: "aloken1309u8!@swedemail.com",
			followedBy: {
				connect: [
					{
						id: azad.id,
					},
					{
						id: botvinnik.id,
					}
				]
			},
			posts: {
				create: [
					{
						title: "Toronto is Gridlocked - Here's How to Fix It",
						content: "Ever ride around Queen's st lately? The city is suffering no doubt about it. All this started when public transit spending slowed down big time when the new government of Ontario took power in 2013. Together they passed laws that could have connected many of the public transit routes we use today and integrated them better as one whole cohesive unit. Without it, people are just always going to be more inclined to use a car. If we fight to bring those plans back to life again maybe we'll all have a chance to breathe this summer.",
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
						content: "I've been learning French for a while now and I've found that the best way to learn a new language is to immerse yourself in it. I've been watching French movies, listening to French music, and reading French books. I've also been trying to speak French as much as possible. I've found that the more I speak French, the quicker I pick up on the syntax. If you're learning a new language I recommend giving this method a shot.",
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
						content: "Zipper drones are the latest craze in the world of drones. They're small, fast, and agile. They can fly through tight spaces and even zip around corners. They're also very affordable. You can get one for as little as $50. They're great for beginners and experts alike. Honestly it's hard not to see them changing the future of delivery for the better.",
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
									},
								},
								{
									where: {
										name: "Technology"
									},
									create: {
										name: "Technology"
									},
								},
								{
									where: {
										name: "Futurology"
									},
									create: {
										name: "Futurology"
									},
								},
								{
									where: {
										name: "Ad"
									},
									create: {
										name: "Ad"
									},
								}
							]
						}
					},
					{
						title: "Let's Talk - AI Safety",
						content: "As someone who's worked on multiple advanced artificial intelligence models, I would like to come out and make my stance on AI safety known. I think I can speak for my whole team when I say we take AI safety extremely seriously, in fact prior to releasing any new system we conduct rigorous testing, engage external experts for feedback, work to improve the model's behavior with techniques like reinforcement learning with human feedback, and build broad safety and monitoring systems. With these failsafes in place there's no reason worry about the immediate consequences, but AI safety is one of those long-term goals that I'm happy to report that some of the smartest people I know are working on it.",
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
									},
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

	// the casual user
	const church = await prisma.user.upsert({
		where: {
			email: "achurch54@outlook.com",
		},
		update: {},
		create: {
			name: "Alonzo Church",
			username: "church_of_lambda",
			email: "achurch54@outlook.com",
			followedBy: {
				connect: {
					id: azad.id,
				}
			},
			following: {
				connect: {
					id: dijkstra.id,
				}
			},
			posts: {
				create: [
					{
						title: "Everyone knows the best mathematical programming abstraction",
						content: "Lambdas Rule, Turing Machines Drool",
					},
					{
						title: "I hate cars",
						content: "They clog up the road. They loud. They stinky. Get them off the road.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Transport"
									},
									create: {
										name: "Transport"
									}
								}
							]
						}
					},
					{
						title: "Are streetcars free?",
						content: "The streetcars of Toronto have a lot of passengers, and you have to pay the fare to get on. So contrary to popular belief, streetcars aren't free.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Free?"
									},
									create: {
										name: "Free?"
									}
								}
							]
						}
					},
					{
						title: "Haiku",
						content: "Shibboleth Standard. A scourge to this institute. A curse on us all.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Eldritch"
									},
									create: {
										name: "Eldritch"
									}
								}
							]
						}
					},
					{
						title: "Dankest of Cellars",
						content: "Ruin has come to our family. You remember our venerable house, opulent and imperial. Gazing proudly from its stoic perch above the moor. I lived all my years in that ancient, rumor-shadowed manor. Fattened by decadence and luxury. And yet, I began to tire of conventional extravagance. Singular, unsettling tales suggested the mansion itself was a gateway to some fabulous and unnamable power. With relic and ritual, I bent every effort towards the excavation and recovery of those long-buried secrets, exhausting what remained of our family fortune on swarthy workmen and sturdy shovels. At last, in the salt-soaked crags beneath the lowest foundations we unearthed that damnable portal of antediluvian evil. Our every step unsettled the ancient earth but we were in a realm of death and madness! In the end, I alone fled laughing and wailing through those blackened arcades of antiquity. Until consciousness failed me. You remember our venerable house, opulent and imperial. It is a festering abomination! I beg you, return home, claim your birthright, and deliver our family from the ravenous clutching shadows of the Dankest Cellar.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "Dank memes"
									},
									create: {
										name: "Dank memes"
									}
								}
							]
						}
					},
					{
						title: "Look",
						content: "Look at these mountains.",
						categories: {
							connectOrCreate: [
								{
									where: {
										name: "096"
									},
									create: {
										name: "096"
									}
								}
							]
						}
					},
				]
			}
		},
		include: {
			posts: true
		}
	});

	console.log("Church Prepared!");


	// now we have 4 users and some sample posts
	// get the followers and following in sync
	// add some content and comments to the site
	// make sure that in the api we get this right
	const botvinnikData = await prisma.user.update({
		where: {
			email: "botvinkle21@gmail.com",
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

	console.log("Botvinnik Prepared!");

	const dijkstraData = await prisma.user.update({
		where: {
			email: "aloken1309u8!@swedemail.com",
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
					...dijkstra.posts.map((post) => {
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
					...dijkstra.posts.map((post) => {
						return {
							content: "Make sure to follow me to keep up with my latest posts!",
							post: {
								connect: {
									id: post.id
								}
							},
						};
					})
				]
			}
		}
	});

	console.log("Djikstra Prepared!");



	const azodData = await prisma.user.update({
		where: {
			email: "azad@mail.com",
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
					...botvinnik.posts.map((post) => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						} ;
					}),
					...dijkstra.posts.map((post) => {
						return {
							post: {
								connect: {
									id: post.id
								}
							}
						} ;
					}),
					...church.posts.map((post) => {
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
						content: "Do you want more ram? Come to downloadfreeram.com",
						post: {
							connect: {
								id: botvinnik.posts[0].id
							}
						},
					}
				]
			}
		},
	});
	console.log("Azod Prepared!");

	const botvinnikcomment = await prisma.user.update({
		where: {
			email: "botvinkle21@gmail.com",
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
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});