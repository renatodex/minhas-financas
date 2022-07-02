import Button from './button'
import { useState } from 'react';

export default function SourceUpload ({ onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="bg-gray-700 text-white mt-5 p-5 rounded-xl">
      <p className="text-lg font-semibold">Upload do Extrato Nubank:</p>

      <div className="mt-4">
        <input
          type="file"
          onChange={e => setSelectedFile(e.target.files[0])}
        />
      </div>

      <div className="mt-4">
        <Button onClick={event => onSubmit({ event, selectedFile })}>Adicionar</Button>
      </div>
    </div>
  )
}