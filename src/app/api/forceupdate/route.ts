import { NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";

export	async function GET(req: NextRequest) {
	try	{
		const prisma = new PrismaClient();	
		const	user = await prisma.user.update({
			where: {
				username: "alicej"
			},
			data: {
				image: "https://utfs.io/f/c4c707ae-5fbd-49b5-8302-bb227a141edb_alicej.jpg"
			}
		});

		const	user1 = await prisma.user.update({
			where: {
				username: "azod"
			},
			data: {
				image: "https://utfs.io/f/484c6955-8db7-4959-955e-e4c07dcc1fcf_azod.jpg"
			}
		});

		const	user2 = await prisma.user.update({
			where: {
				username: "bobw"
			},
			data: {
				image: "https://utfs.io/f/c598c8e2-58fd-4631-a275-7fbb4e4ab124_bobw.jpg"
			}
		});

		const	user3 = await prisma.user.update({
			where: {
				username: "church_of_lambda"
			},
			data: {
				image: "https://utfs.io/f/16087c63-f8ef-459d-8845-d229691cdfc3_church_of_lambda.jpg"
			}
		});

		const	user4 = await prisma.user.update({
			where: {
				username: "dijkstra"
			},
			data: {
				image: "https://utfs.io/f/55134215-0b16-4f9f-be82-d1036dfc33c5_dijkstra.jpg"
			}
		});

		const	user5 = await prisma.user.update({
			where: {
				username: "sports_bot"
			},
			data: {
				image: "https://utfs.io/f/1e35bbec-8e06-4b13-985d-3d00be9b0ce3_sports_bot.jpg"
			}
		});

		const	user6 = await prisma.user.update({
			where: {
				username: "hiroshitan"
			},
			data: {
				image: "https://utfs.io/f/ce5a7369-ca72-4a21-8a75-6bb5be44ba84_hiroshitan.jpg"
			}
		});

		// const	user7 = await prisma.user.update({
		// 	where: {
		// 		username: "janesmith"
		// 	},
		// 	data: {
		// 		image: "https://utfs.io/f/955e5f01-2d4a-4b2e-a32f-fb5d5127b951_janesmith.jpg"
		// 	}
		// });

		const	user8 = await prisma.user.update({
			where: {
				username: "ripbotvinkle"
			},
			data: {
				image: "https://utfs.io/f/6dd0a0ec-691f-45d8-9d8d-73c616196f6b_ripbotvinkle.jpg"
			}
		});

		const	user9 = await prisma.user.update({
			where: {
				username: "jiyoungk"
			},
			data: {
				image: "https://utfs.io/f/d6b04241-8b40-40ce-b7a3-ad662c0e73d6_jiyoungk.jpg"
			}
		});

		const	user10 = await prisma.user.update({
			where: {
				username: "jjlov3"
			},
			data: {
				image: "https://utfs.io/f/c01cf97d-8536-42bf-8b22-361149d8abca_johndoe.jpg"
			}
		});

		const	user11 = await prisma.user.update({
			where: {
				username: "lolpita31"
			},
			data: {
				image: "https://utfs.io/f/d6b04241-8b40-40ce-b7a3-ad662c0e73d6_jiyoungk.jpg"
			}
		});

		const	user12 = await prisma.user.update({
			where: {
				username: "yingc"
			},
			data: {
				image: "https://utfs.io/f/d6b04241-8b40-40ce-b7a3-ad662c0e73d6_jiyoungk.jpg"
			}
		});

		// const	user11 = await prisma.user.update({
		// 	where: {
		// 		username: ""
		// 	},
		// 	data: {
		// 		image: "https://utfs.io/f/.jpg"
		// 	}
		// });

		// const	user12 = await prisma.user.update({
		// 	where: {
		// 		username: ""
		// 	},
		// 	data: {
		// 		image: "https://utfs.io/f/.jpg"
		// 	}
		// });

		// const	user13 = await prisma.user.update({
		// 	where: {
		// 		username: ""
		// 	},
		// 	data: {
		// 		image: "https://utfs.io/f/.jpg"
		// 	}
		// });
		return	NextResponse.json({message: "success"}, {status: 200});
	}
	catch (e) {
		return	NextResponse.json({message: "error", e});
	}
}