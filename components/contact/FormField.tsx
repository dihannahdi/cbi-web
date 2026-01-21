import { ChangeEvent } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  rows?: number;
}

export const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  rows,
}: FormFieldProps) => (
  <div>
    <label className="form-label">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="form-input resize-none"
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        required={required}
      />
    )}
  </div>
);
