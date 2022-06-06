import React from 'react'
import { BaseEntry, Diagnosis } from '../types'

const Entry = ({
  entry,
  diagnoses,
}: {
  entry: BaseEntry
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

  return (
    entry &&
    diagnoses && (
      <div>
        <div>
          <b>{entry.date}</b>
          <br />
          {entry.description}
        </div>
        <br />
        <div>
          <ul>
            {diagnosisNames?.map((str) => (
              <li key={str}>{str}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

export default Entry
