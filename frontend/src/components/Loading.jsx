import reactLogo from '../assets/react.svg';

function Loading({ height, width }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="Loading" style={{ height, width }}>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
