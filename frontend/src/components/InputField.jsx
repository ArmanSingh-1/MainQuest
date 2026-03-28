import './InputField.css';

export default function InputField({ label, type = 'text', placeholder, value, onChange, error, options, multiple, id }) {
  if (type === 'select') {
    return (
      <div className="input-field">
        <label className="input-field__label">{label}</label>
        <select id={id} className="input-field__input" value={value} onChange={onChange}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {error && <span className="input-field__error">{error}</span>}
      </div>
    );
  }

  if (type === 'chips') {
    return (
      <div className="input-field">
        <label className="input-field__label">{label}</label>
        <div className="input-field__chips">
          {options.map((opt) => {
            const isSelected = multiple ? value.includes(opt) : value === opt;
            return (
              <button
                key={opt}
                type="button"
                className={`input-field__chip ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  if (multiple) {
                    const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt];
                    onChange({ target: { value: next } });
                  } else {
                    onChange({ target: { value: opt } });
                  }
                }}
              >
                {opt} {isSelected && '✓'}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      <input
        id={id}
        className={`input-field__input ${error ? 'error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
}
