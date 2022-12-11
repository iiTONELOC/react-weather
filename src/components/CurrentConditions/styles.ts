const styles = (isLandscape: boolean) => ({
    container: 'flex flex-col items-center justify-between w-full lg:w-4/6 lg:justify-self-center min-h-screen p-2',
    iconContainer: 'flex flex-row flex-wrap items-center justify-start w-full h-auto',
    rain: 'text-2xl font-semibold italic mt-2 w-full text-center text-shadow',
    icon: `${isLandscape ? 'h-2/3 w-2/3' : 'w-full h-full'} p-3 margin-auto `,
    tempRainSpan: 'flex flex-row flex-wrap items-center justify-start w-full h-auto',
    temperature: 'text-6xl md:text-7xl font-semibold w-full text-center text-shadow',
    description: 'text-2xl font-semibold w-full text-center text-shadow',
    conditionsContainer: 'flex flex-col mt-5 flex-wrap items-center justify-between w-full h-auto bg-zinc-800 rounded-lg overflow-y-auto',
    conditionListContainer: 'w-[98%] mt-5 h-auto flex flex-row flex-wrap items-center justify-center md:justify-start rounded-lg bg-zinc-900 p-2 overflow-y-scroll'
});

export default styles;
