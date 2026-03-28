import './FormContainer.css';

export default function FormContainer({ children, title, subtitle }) {
  return (
    <div className="form-container">
      <div className="form-container__header">
        <h2 className="form-container__title">{title}</h2>
        <p className="form-container__subtitle">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
