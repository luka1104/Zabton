import { NextPage } from 'next'
import React, { useState } from 'react'
import Select from 'components/theme/select'
import InputForm from 'components/theme/input'
import Preview from 'components/theme/preview'
import Complete from 'components/theme/complete'
import { Theme } from 'interfaces'

const Create: NextPage = () => {
  const [step, setStep] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<number>(0)
  const [image, setImage] = useState<Blob>()
  const [contents, setContents] = useState<string>('')
  const [preview, setPreview] = useState<string>('')
  const [deadline, setDeadline] = useState<number>(2)
  const [theme, setTheme] = useState<Theme>()

  return (
    <>
      {step === 0 ? (
        <Select
          setStep={setStep}
          setSelectedType={setSelectedType}
        />
      ) : step === 1 ? (
        <InputForm
          setStep={setStep}
          selectedType={selectedType}
          setImage={setImage}
          image={image}
          setPreview={setPreview}
          preview={preview}
          setContents={setContents}
          contents={contents}
        />
      ) : step === 2 ? (
        <Preview
          setStep={setStep}
          selectedType={selectedType}
          image={image}
          contents={contents}
          deadline={deadline}
          setDeadline={setDeadline}
          setTheme={setTheme}
        />
      ) : step === 3 ? (
        <Complete
          selectedType={selectedType}
          image={image}
          contents={contents}
          deadline={deadline}
          theme={theme}
        />
      ) : null }
    </>
  )
}

export default Create
