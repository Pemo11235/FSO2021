import { Gender, Patient } from '../types'
import { useParams } from 'react-router-dom'
import { updatePatient, useStateValue } from '../state'
import { Button, Card, Container, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { getPatientInLocalStorage } from '../utils/getPatientInLocalStorage'
import Entry from './Entry'

type SignsObjectShape = {
  [k in Gender]: string
}

const Signs: SignsObjectShape = {
  ['female']: '♀',
  ['male']: '♂',
  ['other']: 'Other',
}
const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [{ patients, diagnoses }, dispatch] = useStateValue()

  const localPatient = getPatientInLocalStorage(id)
  let patient: Patient =
    localPatient ??
    Object.values(patients)
      .filter((p) => p.id === id)
      .flat()[0]

  console.warn('Using local patient:', patient)

  if (!id) {
    return null
  }
  useEffect(() => {
    const fetchPatient = async () => {
      if (!localPatient) {
        console.warn('Fetching patient for ID:', id)
        try {
          const { data: patientFetched } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          )
          dispatch(updatePatient(patientFetched))
          localStorage.setItem(
            `patient-${patientFetched.id}`,
            JSON.stringify(patientFetched)
          )
          console.log('Patient fetched:', patientFetched)
          patient = JSON.parse(JSON.stringify(patientFetched)) as Patient
        } catch (e) {
          console.error(e)
        }
      }
    }
    void fetchPatient()
  }, [dispatch, id])

  return (
    <div>
      {patient && (
        <Container style={{ margin: '30px 0' }}>
          <Card style={{ padding: '5px 20px', border: '3px solid #303F9F' }}>
            <Typography variant='h3'>
              {patient.name}
              {Signs[patient.gender]}
            </Typography>

            <div>
              <Typography variant='body1'>
                <b>SSN: </b>
                {patient.ssn}
              </Typography>
            </div>
            <div>
              <Typography variant='body1'>
                <b>OCCUPATION: </b>
                {patient.occupation}
              </Typography>
            </div>
          </Card>
          <Card
            style={{
              margin: '30px 0',
              padding: '10px',
              background: '#303F9F',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Typography
              variant='h4'
              style={{
                margin: '30px 0',
                display: 'flex',
                justifyContent: 'center',
              }}>
              ENTRIES
            </Typography>
            {patient.entries.map((entry) => (
              <Entry
                key={entry.id}
                entry={entry}
                diagnoses={Object.values(diagnoses)}
              />
            ))}
          </Card>
          <Button variant='contained' color='primary'>
            Add Entry to {patient.name}
          </Button>
        </Container>
      )}
    </div>
  )
}

export default PatientPage
