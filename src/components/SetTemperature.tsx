import React, { FC, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isValidState, todaysHealthState, userDataState } from 'scripts/store'

const SetTemperature: FC = () => {
  const userData = useRecoilValue(userDataState)
  const [isValid, setIsValid] = useRecoilState(isValidState)
  const prevTemperature = userData.health.temperature.slice(-1)[0]
  const [todaysHealth, setTodaysHealth] = useRecoilState(todaysHealthState)
  const [tips, setTips] = useState('前回と変わりないですか？')

  const addTodaysTemperature = (todaysTemperature: number) => {
    validate(todaysTemperature)
    if (isValid) {
      setTodaysHealth({
        ...todaysHealth,
        temperature: todaysTemperature,
      })
    }
  }

  const validate = (value: number) => {
    if (value >= 35.0 && value <= 40.0) {
      setIsValid(true)
      changeTips(value)
    } else {
      setIsValid(false)
      setTips(`35.0～40.0までの数字を入力してください。`)
    }
  }

  const changeTips = (value: number) => {
    const diff = Math.round((value - prevTemperature) * 10) / 10
    const absDiff = Math.abs(diff)

    if (Math.sign(diff) === 1) {
      setTips(`前回よりも ${absDiff}℃ 高いですね…`)
    } else if (Math.sign(diff) === -1) {
      setTips(`前回よりも ${absDiff}℃ 低いですね…`)
    } else {
      setTips('前回と変わりないですね！')
    }
  }

  useEffect(() => {
    setTodaysHealth({
      ...todaysHealth,
      temperature: userData.health.temperature.slice(-1)[0],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        <input
          type="number"
          max="40"
          min="35"
          step="0.1"
          defaultValue={prevTemperature}
          onBlur={(e) => addTodaysTemperature(Number(e.target.value))}
          onChange={(e) => addTodaysTemperature(Number(e.target.value))}
        />
      </div>
      <div>{tips}</div>
    </>
  )
}

export default SetTemperature