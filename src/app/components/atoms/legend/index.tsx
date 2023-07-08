import { LEGENDS } from '../../../utils/legends.utils'

const Legend = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg absolute bottom-32 -right-1">
            <div className="px-1 py-4 bg-black">
                {LEGENDS.map(({ value, text, color }) => (
                    <div key={value} className={`before:content-[''] before:inline-block before:relative ${color} before:w-5 before:h-5 before:top-1 before:mr-3`}>{text}</div>
                ))}
            </div>
        </div>
    );
}
export { Legend }