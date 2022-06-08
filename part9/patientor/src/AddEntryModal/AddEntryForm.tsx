import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { Entry, HealthCheckRating, UnionOmit } from '../types'
import { HealthCheckOption, SelectField } from './FormField'
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField'
import { useStateValue } from '../state'

/*
 * use type Entry, but omit id
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = UnionOmit<Entry, 'id'>

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
]

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        type: 'HealthCheck',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        return errors
      }}>
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label='Health Check Rating'
              name='healthCheckRating'
              options={healthCheckOptions}
            />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
