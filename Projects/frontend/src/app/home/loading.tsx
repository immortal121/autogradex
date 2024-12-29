import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <progress className="progress w-56"></progress>
        </div>
    );
};

export default Loading;