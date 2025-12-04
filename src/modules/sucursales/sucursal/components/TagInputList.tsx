interface TagInputListProps {
  label: string;
  value: string[];
  inputValue: string;
  setInputValue: (v: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
  color?: "blue" | "green";
  placeholder?: string;
}

export function TagInputList({
  label,
  value,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  color = "blue",
  placeholder
}: TagInputListProps) {
  const styles = {
    blue: {
      bg: "bg-blue-600",
      chipBg: "bg-blue-100",
      chipText: "text-blue-800",
      remove: "text-blue-600 hover:text-blue-800"
    },
    green: {
      bg: "bg-green-600",
      chipBg: "bg-green-100",
      chipText: "text-green-800",
      remove: "text-green-600 hover:text-green-800"
    }
  }[color];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAdd())}
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onAdd}
          className={`px-4 py-2 text-white rounded-md ${styles.bg}`}
        >
          Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <span
            key={index}
            className={`${styles.chipBg} ${styles.chipText} px-3 py-1 rounded-full flex items-center gap-2`}
          >
            {item}
            <button type="button" className={styles.remove} onClick={() => onRemove(index)}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
