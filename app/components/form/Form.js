import React from 'react'
import { Formik } from 'formik'

function AppForm(props) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      {() => <>{props.children}</>}
    </Formik>
  )
}

export default AppForm
