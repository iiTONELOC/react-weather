const conditionContainer = 'flex flex-row mt-5 flex-wrap items-center justify-center w-[98%] min-h-[350px] max-h-[48vh] bg-zinc-800 rounded-lg';
const styles = {
    container: 'flex flex-col items-center justify-between w-full h-screen p-4 ',
    iconContainer: 'flex flex-row flex-wrap items-center justify-start w-full h-[50vh] p-2',
    rain: 'text-2xl font-bold my-2',
    icon: 'flex flex-shrink p-3 margin-auto ',
    tempRainSpan: 'flex flex-col gap-3 items-center justify-center w-full h-1/4',
    temperature: 'text-7xl font-semibold mt-5',
    description: 'text-2xl font-bold w-full text-center',
    conditionsContainer: conditionContainer + ' overflow-hidden',
    condition: 'w-full h-full p-4 text-center items-center text-xl font-semibold',
    conditionListContainer: 'w-[98%] max-h-[65%] flex flex-row flex-wrap items-center justify-center md:justify-start rounded-lg bg-zinc-900 p-2 overflow-y-scroll',
    conditionList: 'w-full md:w-1/2 flex-col justify-start items-end md:my-2',
    conditionListItem: 'w-full border-b-2 border-zinc-700 text-base md:text-xl'
};

export default styles;
