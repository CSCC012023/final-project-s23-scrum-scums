// using icons from radix-ui
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { PersonIcon } from "@radix-ui/react-icons";
import React from "react";

export const Icons = {
	user: (props: IconProps) => <PersonIcon {...props} />,
	logo: (props: IconProps) => (
		<svg width="81" height="111" viewBox="0 0 81 111" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M25.5 89.5745V21.4894L40.5 5L55.5 21.4894V89.5745" stroke="#000080" strokeWidth="6" strokeLinecap="round"/>
			<path d="M15.5 96.5745H65.5" stroke="#39FF14" strokeWidth="4"/>
			<g filter="url(#filter0_d_2_36)">
				<path d="M3 103.574H78" stroke="#EF0101" strokeWidth="4"/>
			</g>
			<defs>
				<filter id="filter0_d_2_36" x="0" y="100.574" width="81" height="10" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dy="2"/>
					<feGaussianBlur stdDeviation="1.5"/>
					<feComposite in2="hardAlpha" operator="out"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_36"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_36" result="shape"/>
				</filter>
			</defs>
		</svg>
	),

	post: (props: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-secondary" width="97" height="97" viewBox="0 0 97 97" fill="none" {...props}>
			<path d="M91.7002 4.29298C86.7048 -0.703143 78.1582 -1.3615 67.6346 2.43884C57.9654 5.92997 47.2764 12.9135 37.5365 22.103L36.929 22.6761L33.2467 34.8769L26.8175 33.6149L25.6342 35.1287C19.7981 42.594 15.9122 52.6035 14.3961 64.0748C13.5697 70.328 13.647 75.4054 13.7599 77.8123L0 91.573L4.42669 96L18.3096 82.1163C21.0769 81.9929 27.917 81.4909 36.332 79.451C46.3588 77.0206 60.5902 71.8441 71.4478 60.9857C73.3672 59.0663 75.2388 57.0629 77.01 55.0308L78.2838 53.5694L75.7344 47.402L87.2769 41.149L87.7173 40.4136C97.1236 24.7089 98.6126 11.2059 91.7002 4.29298ZM82.7797 36.4653L67.7949 44.5831L71.0102 52.3607C69.7202 53.7897 68.3835 55.1964 67.0213 56.5585C57.231 66.3494 44.2106 71.0824 35.012 73.3288C31.383 74.2152 28.0442 74.7956 25.2495 75.1756L54.0487 46.3746L49.622 41.9476L20.0374 71.5345C20.3887 63.6565 22.1766 50.7854 29.4343 40.5085L37.6027 42.1121L42.4385 26.0898C51.3995 17.758 61.0772 11.4629 69.7608 8.32752C77.7551 5.44112 84.1383 5.58401 87.2737 8.71999C91.7928 13.2398 90.0204 24.0776 82.7797 36.4653Z" fill="black" stroke="black"/>
		</svg>
	),

	google: (props: IconProps) => (
		<svg {...props} viewBox='0 0 24 24'>
			<path
				d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
				fill='#4285F4'
			/>
			<path
				d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
				fill='#34A853'
			/>
			<path
				d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
				fill='#FBBC05'
			/>
			<path
				d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
				fill='#EA4335'
			/>
			<path d='M1 1h22v22H1z' fill='none' />
		</svg>
	),
};