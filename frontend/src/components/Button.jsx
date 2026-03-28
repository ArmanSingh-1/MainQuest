import './Button.css';

export default function Button({ children, onClick, loading, variant = 'primary', disabled, id }) {
  return (
    <button
      id={id}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <div className="btn__spinner" /> : children}
    </button>
  );
}
