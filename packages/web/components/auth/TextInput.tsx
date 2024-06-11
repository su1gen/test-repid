import { TextInputProps } from '@/app/types';

export default function TextInput({id, labelText, type, name, onChange, required = false, autoFocus = false, autoComplete = undefined }: TextInputProps) {
  return <div>
    <label className="block font-medium text-sm text-gray-700" htmlFor={id}>
      {labelText}
    </label>
    <input
      className="p-2 border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-md shadow-sm block mt-1 w-full"
      id={id} type={type} name={name} required={required} autoFocus={autoFocus} autoComplete={autoComplete}
      onChange={onChange}/>
  </div>
}