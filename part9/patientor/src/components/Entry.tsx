import { BaseEntry } from '../types'

const Entry = ({ entry }: { entry: BaseEntry }) => {
  return (
    <div>
      <div>
        <b>{entry.date}</b>
        <br />
        {entry.description}
      </div>
      <br />
      <div>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Entry
