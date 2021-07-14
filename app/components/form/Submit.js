import React from 'react'
import { useFormikContext } from 'formik'

//Custom Dependencies
import Button from '../AppButton'

function SubmitBtn({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext()

  return <Button title={title} onPress={handleSubmit} {...otherProps} />
}

export default SubmitBtn
