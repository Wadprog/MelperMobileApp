import React from 'react'
import { useFormikContext } from 'formik'

import Input from '../AppInput'
import Error from './Error'

function FormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <>
      <Input
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <Error error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default FormField
