//use hex values only or things WILL break.
// don't use css values like lightblue or black

const themes = [
	{
		name: 'Isaac Dark (Default)',
		fontFamily: 'DM Sans',
		type: 'dark',
		foreground: '#ffffff',
		background: '#000000',
		gray: '#212121',
		accent: '#339dab',
		adaptive: true,
		gradientAngle: '180deg',
		globalBorderRadius: 7,
	},
	{
		name: 'Isaac Light',
		fontFamily: 'DM Sans',
		type: 'light',
		foreground: '#000000',
		background: '#ffffff',
		gray: '#919191',
		accent: '#339dab',
		adaptive: true,
		gradientAngle: '180deg',
		globalBorderRadius: 7,
	},
]

export default themes
