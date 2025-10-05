interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      style={{
        marginTop: '20px',
        padding: '10px 24px',
        backgroundColor: '#769656',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5f7c45'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#769656'}
    >
      Reset Game
    </button>
  );
}