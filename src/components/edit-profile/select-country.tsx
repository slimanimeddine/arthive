'use client'
import { COUNTRIES } from '@/lib/constants'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export type SelectCountryProps<T extends FieldValues> = UseControllerProps<T>

export default function SelectCountry<T extends FieldValues>({
  name,
  control,
  defaultValue,
}: SelectCountryProps<T>) {
  const { field } = useController({ control, name })

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="country"
        className="block text-sm/6 font-medium text-gray-900"
      >
        Country
      </label>
      <div className="mt-2 grid grid-cols-1">
        <select
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          value={field.value}
          defaultValue={defaultValue}
          onChange={(e) => field.onChange(e.target.value)}
        >
          <option value="">Select</option>
          {COUNTRIES.map((country) => (
            <option
              key={country}
              value={country}
            >
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
