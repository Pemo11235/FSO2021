import { Card } from '@material-ui/core'
import React from 'react'
import {
  Entry as EntryType,
  Diagnosis,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from '../types'
import WorkIcon from '@material-ui/icons/Work'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import HealingIcon from '@material-ui/icons/Healing'
import { Typography } from '@material-ui/core'
const OccupationalHealthcareEntryCard = ({
  entry,
  diagnosisNames,
}: {
  entry: OccupationalHealthcareEntry
  diagnosisNames: string[]
}) => {
  return (
    <Card
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '80%',
        margin: '5px',
      }}>
      <div>
        <Typography variant='h5' style={{ minWidth: '400px' }}>
          <WorkIcon />
          Occupational
        </Typography>
        <Typography variant='body1' style={{ padding: '0 10px', width: '80%' }}>
          <b>Date: {entry.date}</b>
          <br />
          {entry.description}
        </Typography>
      </div>
      <div>
        <Typography variant='body1'>
          <b>Employer:</b> {entry.employerName}
        </Typography>
        {entry.sickLeave?.startDate && (
          <Typography variant='body1'>
            <b>Sick leave:</b> <br /> {entry.sickLeave.startDate} <br /> -{' '}
            <br />
            {entry.sickLeave.endDate}
          </Typography>
        )}
      </div>
      <div>
        <Typography variant='body1'>
          <b>Diagnosis:</b>
        </Typography>
        <ul>
          {diagnosisNames?.map((str) => (
            <li key={str}>
              <Typography variant='caption'>{str}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

const HospitalEntryCard = ({
  entry,
  diagnosisNames,
}: {
  entry: HospitalEntry
  diagnosisNames: string[]
}) => {
  return (
    <Card
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '80%',
        margin: '5px',
      }}>
      <div>
        <Typography variant='h5'>
          <LocalHospitalIcon />
          Hospital
        </Typography>
        <Typography variant='body1' style={{ padding: '0 10px', width: '80%' }}>
          <b>Date: {entry.date}</b>
          <br />
          {entry.description}
        </Typography>
      </div>
      <br />
      <div>
        <Typography variant='body1'>
          <b>Discharge:</b> {entry.discharge?.date} <br />
          <b>Criteria:</b> {entry.discharge?.criteria}
        </Typography>
      </div>
      <div>
        <Typography variant='body1'>
          <b>Diagnosis:</b>
        </Typography>
        <ul>
          {diagnosisNames?.map((str) => (
            <li key={str}>
              <Typography variant='caption'>{str}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

const HealthCheckEntryCard = ({
  entry,
  diagnosisNames,
}: {
  entry: HealthCheckEntry
  diagnosisNames: string[]
}) => {
  return (
    <Card
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '80%',
        margin: '5px',
      }}>
      <div>
        <Typography variant='h5'>
          <HealingIcon />
          Health Check
        </Typography>
        <Typography variant='body1' style={{ padding: '0 10px', width: '80%' }}>
          <b>Date: {entry.date}</b>
          <br />
          {entry.description}
        </Typography>
      </div>
      <div>
        <Typography variant='body1' style={{ padding: '0 10px' }}>
          <b>Status:</b> {HealthCheckRating[entry.healthCheckRating]}
        </Typography>
      </div>
      <div>
        <ul>
          {diagnosisNames?.map((str) => (
            <li key={str}>{str}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Entry = ({
  entry,
  diagnoses,
}: {
  entry: EntryType
  diagnoses: Diagnosis[]
}) => {
  const diagnosisNames = React.useMemo(() => {
    const names = []
    for (const { code, name } of diagnoses) {
      if (entry.diagnosisCodes?.includes(code)) {
        names.push(`${name} (${code})`)
      }
    }
    return names
  }, [entry, diagnoses])

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryCard entry={entry} diagnosisNames={diagnosisNames} />
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryCard
          entry={entry}
          diagnosisNames={diagnosisNames}
        />
      )
    case 'HealthCheck':
      return (
        <HealthCheckEntryCard entry={entry} diagnosisNames={diagnosisNames} />
      )
    default:
      return assertNever(entry)
  }
}

export default Entry
