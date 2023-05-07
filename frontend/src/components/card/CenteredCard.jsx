function CenteredCard({ children }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card w-96 bg-base-100 shadow-xl p-2">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-12">
              {{ ...children }}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenteredCard;
