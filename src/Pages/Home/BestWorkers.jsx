import React from 'react';
import useWorker from '../../Hooks/useWorker';

const BestWorkers = () => {
    const [workers] = useWorker();

    // Get the top 6 workers sorted by total coins
    const topWorkers = workers
        ?.sort((a, b) => b.total_coins - a.total_coins) // Sort workers by total_coins in descending order
        .slice(0, 6); // Take the top 6 workers

    return (
        <div className='p-3 my-5'>
            <h2 className="text-2xl font-bold mb-4 text-center">Top 6 Best Workers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {topWorkers?.map((worker, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border-2"
                    >
                        <img
                            src={worker.image}
                            alt={worker.name}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <h3 className="text-lg font-semibold">{worker.name}</h3>
                        <p className="text-gray-500">Coins: {worker.total_coins}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestWorkers;
