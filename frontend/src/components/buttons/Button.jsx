function Button({
  children,
  onClick, type, isLoading,
}) {
  return (
    <button
      className={`btn ${isLoading ? 'loading' : ''}`}
      // eslint-disable-next-line react/button-has-type
      type={`${type || 'button'}`}
      disabled={isLoading}
      onClick={onClick}
    >
      {(children ?? 'Click') }

    </button>
  );
}

export default Button;
