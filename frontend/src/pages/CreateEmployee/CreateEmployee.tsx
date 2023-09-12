import React, { FormEvent, useState } from 'react'
import Header from '../../components/Header/Header'
import { NavLink } from 'react-router-dom'
import { department, usStates } from '../../data/dropdownsData'
import { dataErrorType, dataFormat } from '../../types/dataTypes'
import { employeesAtom } from '../../main'
import { useAtom } from 'jotai'
import { Dropdown, Modal } from 'hrnet-maxew-library'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import addNewEmployee from '../../services/addNewEmployee'
import checkInput from '../../services/checkInput'
import formatDate from '../../services/formatDate'

const CreateEmployee: React.FC = () => {
    // get / set the data from the global state
    const [employees, setEmployees] = useAtom(employeesAtom)

    // get / set the data from the form
    const [inputData, setInputData] = useState<dataFormat>({
        firstName: null,
        lastName: null,
        startDate: null,
        department: null,
        birthday: null,
        street: null,
        city: null,
        state: null,
        zipCode: null,
    })

    // when the form is submitted, check if the form are correctly filled

    const [dataSubmitted, setDataSubmitted] = useState(false)

    const [dataValidation, setDataValidation] = useState({
        status: true,
        reason: [''],
    })

    const [dataError, setDataError] = useState<dataErrorType>({
        firstName: false,
        lastName: false,
        startDate: false,
        department: false,
        birthday: false,
        street: false,
        city: false,
        state: false,
        zipCode: false,
    })

    const [dataValidated, setDataValidated] = useState(false)

    const handleInput = (e: FormEvent, id: string) => {
        const target = e.target as HTMLFormElement
        setInputData({ ...inputData, [id]: target.value })
    }

    const selectItem = (id: string, value: string) => {
        setInputData({ ...inputData, [id]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // unset data validation
        setDataValidation({
            status: true,
            reason: [],
        })

        let finalValidation = true

        const updatedDataError: Partial<dataErrorType> = {}

        for (const key in inputData) {
            const checkData = checkInput(
                key,
                inputData[key as keyof dataFormat]
            )

            updatedDataError[key as keyof dataErrorType] = !checkData.status

            if (!checkData.status) {
                setDataValidation((prevDataValidation) => ({
                    status: false,
                    reason: [...prevDataValidation.reason, checkData.reason],
                }))
                finalValidation = false
            }
        }

        setDataError({ ...dataError, ...updatedDataError })

        finalValidation ? validateData() : setDataSubmitted(true)
    }

    //data are validated => update the global state and the bdd
    const validateData = async () => {
        setEmployees([...employees, inputData])

        addNewEmployee(inputData)

        setDataValidated(true)

        setDataSubmitted(true)
    }

    const clearData = () => {
        setDataValidated(false)

        setInputData({
            firstName: null,
            lastName: null,
            startDate: null,
            department: null,
            birthday: null,
            street: null,
            city: null,
            state: null,
            zipCode: null,
        })

        setDateSelected({
            birthday: null,
            startDate: null,
        })
    }

    // when I click on 'ok' button
    const handleConfirm = () => {
        dataValidated && clearData()

        setDataSubmitted(false)
    }

    // Date picker

    const today = new Date()

    type dateFormat = {
        birthday: null | Date
        startDate: null | Date
    }

    const [dateSelected, setDateSelected] = useState<dateFormat>({
        birthday: null,
        startDate: null,
    })

    const selectDateHandler = (date: Date | null, id: string) => {
        setDateSelected({ ...dateSelected, [id]: date })
        date && setInputData({ ...inputData, [id]: formatDate(date) })
    }

    return (
        <>
            <Header />
            <main data-testid="createEmployee">
                <NavLink data-testid="link" to="/view" className="link">
                    View employees
                </NavLink>
                <form className="content-wrapper">
                    <h2 className="wrapper-title">Create employee</h2>
                    <div className="inputs-wrapper id-infos">
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.firstName ? ' error' : '')
                            }
                        >
                            <label htmlFor="firstName"> First name : </label>
                            <input
                                value={inputData.firstName ?? ''}
                                type="text"
                                name=""
                                id="firstName"
                                onInput={(e) => handleInput(e, 'firstName')}
                                required
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.lastName ? ' error' : '')
                            }
                        >
                            <label htmlFor="lastName"> Last name : </label>
                            <input
                                value={inputData.lastName ?? ''}
                                type="text"
                                name=""
                                id="lastName"
                                onInput={(e) => handleInput(e, 'lastName')}
                                required
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.birthday ? ' error' : '')
                            }
                        >
                            <label htmlFor="birthday"> Date of birth : </label>
                            <DatePicker
                                selected={dateSelected.birthday}
                                onChange={(d: Date) =>
                                    selectDateHandler(d, 'birthday')
                                }
                                maxDate={
                                    new Date(
                                        today.getFullYear() - 18,
                                        today.getMonth(),
                                        today.getDate()
                                    )
                                }
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Select a date"
                                isClearable
                                name="birthday"
                                id="birthday"
                            />
                        </div>
                    </div>
                    <div className="inputs-wrapper address-infos">
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.street ? ' error' : '')
                            }
                        >
                            <label htmlFor="street">Street : </label>
                            <input
                                value={inputData.street ?? ''}
                                type="text"
                                name=""
                                id="street"
                                onInput={(e) => handleInput(e, 'street')}
                                required
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.city ? ' error' : '')
                            }
                        >
                            <label htmlFor="city">City : </label>
                            <input
                                value={inputData.city ?? ''}
                                type="text"
                                name=""
                                id="city"
                                onInput={(e) => handleInput(e, 'city')}
                                required
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.state ? ' error' : '')
                            }
                        >
                            <Dropdown
                                currentValue={
                                    inputData.state !== ''
                                        ? inputData.state
                                        : 'select'
                                }
                                items={usStates}
                                dataName="state"
                                dataLabel="State"
                                fSize="1rem"
                                height="3rem"
                                selectItem={selectItem}
                                lBordC="#93AD18"
                                lBordW="2px"
                                fFam="Rosarivo"
                                underline={true}
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.zipCode ? ' error' : '')
                            }
                        >
                            <label htmlFor="zip">Zip code : </label>
                            <input
                                value={inputData.zipCode ?? ''}
                                type="text"
                                name=""
                                id="zip"
                                onInput={(e) => handleInput(e, 'zipCode')}
                                required
                            />
                        </div>
                    </div>
                    <div className="inputs-wrapper work-infos">
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.startDate ? ' error' : '')
                            }
                        >
                            <label htmlFor="start">Start date : </label>
                            <DatePicker
                                selected={dateSelected.startDate}
                                onChange={(d: Date) =>
                                    selectDateHandler(d, 'startDate')
                                }
                                maxDate={today}
                                dateFormat="yyyy/MM/dd"
                                todayButton={'Today'}
                                placeholderText="Select a date"
                                isClearable
                                name="start"
                                id="start"
                            />
                        </div>
                        <div
                            className={
                                'input-wrapper' +
                                (dataError.department ? ' error' : '')
                            }
                        >
                            <Dropdown
                                currentValue={
                                    inputData.department !== ''
                                        ? inputData.department
                                        : 'select'
                                }
                                items={department}
                                dataName="department"
                                dataLabel="Department"
                                height="3rem"
                                fFam="Rosarivo"
                                fSize="1rem"
                                lBordC="#93AD18"
                                selectItem={selectItem}
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="create-btn">
                        save
                    </button>
                </form>
                {dataSubmitted && (
                    <Modal
                        message={
                            dataValidated
                                ? [
                                      `${inputData.firstName} ${inputData.lastName} has been added`,
                                  ]
                                : [
                                      `Red field${
                                          Object.values(dataValidation).filter(
                                              (value) => value === false
                                          ).length > 1
                                              ? 's'
                                              : ''
                                      } ${
                                          Object.values(dataValidation).filter(
                                              (value) => value === false
                                          ).length > 1
                                              ? 'were'
                                              : 'was'
                                      } not filled properly.`,
                                      '↧',
                                      ...dataValidation.reason,
                                  ]
                        }
                        confirm={handleConfirm}
                        overlay={true}
                        fFam="Montserrat"
                        fSize="2rem"
                        width='50vw'
                        bordC="#93AD18"
                        bordW="5px"
                        bordR="15px"
                        pad="15px"
                        bbordR="12px"
                        bbordC="#93AD18"
                        bbordW="4px"
                        bbg="#93AD18"
                        bfCol="white"
                        hoverBg="whitesmoke"
                        hoverCol="#93AD18"
                    />
                )}
            </main>
        </>
    )
}

export default CreateEmployee