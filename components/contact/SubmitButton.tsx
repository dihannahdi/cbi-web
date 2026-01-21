interface SubmitButtonProps {
  isSubmitting: boolean;
  label?: string;
  loadingLabel?: string;
}

export const SubmitButton = ({ isSubmitting, label = "Send", loadingLabel = "Sending..." }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="btn-primary"
  >
    {isSubmitting ? loadingLabel : label}
  </button>
);
