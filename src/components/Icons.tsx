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
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-secondary" viewBox="0 0 512 512" stroke="currentColor" {...props}>
			<g>
				<g>
					<path d="M489.068,22.913c-26.642-26.644-72.224-30.155-128.35-9.888c-51.569,18.618-108.577,55.861-160.523,104.868l-3.24,3.056
				l-19.639,65.066l-34.289-6.73l-6.311,8.073C105.59,227.17,84.865,280.55,76.779,341.726c-4.407,33.348-3.995,60.425-3.393,73.261
				L0,488.372l23.609,23.609l74.042-74.041c14.759-0.658,51.24-3.335,96.12-14.214c53.476-12.961,129.377-40.567,187.284-98.474
				c10.237-10.236,20.219-20.92,29.665-31.757l6.794-7.794l-13.597-32.89l61.56-33.347l2.349-3.922
				C517.993,131.79,525.934,59.779,489.068,22.913z M441.492,194.486l-79.919,43.292l17.148,41.477
				c-6.88,7.621-14.009,15.123-21.274,22.387c-52.215,52.214-121.657,77.455-170.716,89.435c-19.355,4.727-37.162,7.822-52.067,9.849
				L288.26,247.332l-23.609-23.609L106.866,381.508c1.874-42.013,11.409-110.654,50.117-165.46l43.565,8.552l25.791-85.446
				c47.792-44.433,99.406-78.004,145.719-94.725c42.636-15.393,76.68-14.631,93.402,2.093
				C489.562,70.626,480.109,128.423,441.492,194.486z"/>
				</g>
			</g>
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