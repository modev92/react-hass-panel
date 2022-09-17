import React from 'react';

const BackwardSvg = ({ className }: { className?: string }) => {
  return (
    <svg height="1.5em" viewBox="0 0 74 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M67.5308 62.3125C70.8023 62.3125 73.439 59.8223 73.439 55.3301V8.16212C73.439 3.66992 70.8023 1.17973 67.5308 1.17973C65.8706 1.17973 64.5523 1.66802 62.8433 2.69342L24.0738 25.4961C21.0464 27.3027 19.7769 29.4023 19.7769 31.7461C19.7769 34.0898 21.0464 36.1895 24.0738 37.9473L62.8433 60.7989C64.5523 61.8242 65.8706 62.3125 67.5308 62.3125ZM5.71439 63.3379H14.5523C18.0679 63.3379 19.9722 61.4336 19.9722 57.8692V5.62302C19.9722 1.91212 18.0679 0.203125 14.5523 0.203125H5.71439C2.14988 0.203125 0.245605 2.10742 0.245605 5.62302V57.8692C0.245605 61.4336 2.14988 63.3379 5.71439 63.3379Z"
        className="dark"
      />
    </svg>
  );
};
export default BackwardSvg;
