type Options = {
    title: string;
    value: string | number;
}

interface IProps {
    label: string;
    options: Options[];
    onSelected: (value: string | null) => void;
}

const SelectInput = ({ label, options, onSelected }: IProps): JSX.Element => {

    return (
        <div className="mx-4">
            <label htmlFor={label}>{label}</label>
            <select id={label} onChange={(event) => onSelected(event.target.value)} className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 pr-7 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                {options.map(({ title, value }) => (
                    <option key={value} value={value}>{title}</option>
                ))}
            </select>
        </div>
    )
}

export { SelectInput }