function ErrorComponent({ onRefresh, message }) {
  return (
    <div>
      <div>{message || 'Error'}</div>
      <button type="button" onClick={onRefresh}>Refresh</button>
    </div>
  );
}

export default ErrorComponent;
