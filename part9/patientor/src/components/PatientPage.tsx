import { Gender, Patient } from '../types'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../state'
import { Container, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from '../constants'
import { getPatientInLocalStorage } from '../utils/getPatientInLocalStorage'

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
  const [{ patients }, dispatch] = useStateValue()

  console.log(Object.values(patients))

  const localPatient = getPatientInLocalStorage(id)
  let patient: Patient =
    localPatient ??
    Object.values(patients)
      .filter((p) => p.id === id)
      .flat()[0]

  console.warn('Using local patient for ID:', id)

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
          dispatch({ type: 'UPDATE_PATIENT', payload: patientFetched })
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
          <Typography variant='h3'>
            {patient.name}
            {Signs[patient.gender]}
          </Typography>

          <div>
            <b>ssn: </b>
            {patient.ssn}
          </div>
          <div>
            <b>occupation :</b> {patient.occupation}
          </div>
        </Container>
      )}
    </div>
  )
}

export default PatientPage
