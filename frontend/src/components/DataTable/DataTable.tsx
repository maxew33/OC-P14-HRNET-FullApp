import React, { FormEvent, Fragment, useEffect, useState } from 'react'

import styles from '../../style/DataTable.module.css'
import { Dropdown } from 'hrnet-maxew-library'
// import Dropdown from '../Dropdown/Dropdown'

interface DataTableProps {
    title?: string
    headingNames?: { [key: string]: string } | null
    data: { [key: string]: string | number }[]
}

export const DataTable: React.FC<DataTableProps> = (props) => {
    const { title, headingNames, data } = props

    const [displayedData, setDisplayedData] = useState(data)

    const [sortedData, setSortedData] = useState(displayedData)

    const [sortedKey, setSortedKey] = useState({ key: '', asc: false })

    // ========================================
    //check if headingNames keys and data keys are the same
    // ========================================

    let namesGiven = headingNames ? Object.values(headingNames) : null

    const dataKeys: string[] = Object.keys(data[0])

    const headings: { [key: string]: string } = {}

    if (headingNames) {
        const dataKeysToCompare = data.length > 0 ? dataKeys : []

        const missingKeys = Object.keys(headingNames).filter(
            (key) => !dataKeysToCompare.includes(key)
        )

        if (missingKeys.length > 0) {
            namesGiven = null
            console.warn(
                `Key${missingKeys.length > 2 ? 's' : ''} ${missingKeys.join(
                    ', '
                )} ${
                    missingKeys.length > 2 ? 'are' : 'is'
                } missing in the heading names objects given. Data keys will be used instead.`
            )
        }
    }

    //get the table colmuns heading name
    const headingNamesGot = namesGiven || dataKeys

    dataKeys.forEach((data, idx) => {
        headings[data] = headingNamesGot[idx]
    })

    // ========================================
    // sort data by clicking on the table header
    // ========================================

    const handleSort = (key: string) => {
        // get the column key
        setCurrentPage(1)

        sortedKey.key === key
            ? setSortedKey((prevSortedKey) => ({
                  ...prevSortedKey,
                  asc: !prevSortedKey.asc,
              }))
            : setSortedKey({ key: key, asc: false })
    }

    useEffect(() => {
        const tmpData = [...displayedData].sort((a: any, b: any) => {
            if (a[sortedKey.key] > b[sortedKey.key])
                return sortedKey.asc ? 1 : -1
            if (a[sortedKey.key] < b[sortedKey.key])
                return sortedKey.asc ? -1 : 1
            return 0
        })

        setSortedData(tmpData)
    }, [sortedKey, displayedData])

    // ========================================
    // number of entries shown
    // ========================================

    const [displayingQty, setDisplayingQty] = useState(10)

    const handleSelectQty = (_id: string, value: number) => {
        setDisplayingQty(value)
        setCurrentPage(1)
    }

    // ========================================
    // Page navigation
    // ========================================

    const [currentPage, setCurrentPage] = useState(1)
    const [pagesQty, setPagesQty] = useState(0)

    useEffect(() => {
        setPagesQty(Math.ceil(displayedData.length / displayingQty))
        console.log(pagesQty)
    }, [displayingQty, displayedData, pagesQty])

    const handleSelectPage = (idx: number) => {
        setCurrentPage(idx)
    }

    // navigation form prev / next button
    const handleNavPage = (dir: number) => {
        let tempPage = currentPage
        tempPage += dir
        tempPage > 0 && tempPage <= pagesQty && setCurrentPage(tempPage)
    }

    // ========================================
    // Searchbar
    // ========================================

    const [searchInput, setSearchInput] = useState('')

    const handleInput = (e: FormEvent) => {
        const target = e.target as HTMLFormElement
        setCurrentPage(1)
        setSearchInput(target.value)
    }

    useEffect(() => {
        dataSearching(searchInput.toString())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput])

    const dataSearching = (word: string) => {
        const searchedWord = word.toLowerCase()

        const tempData: React.SetStateAction<{ [key: string]: any }[]> = []

        props.data.forEach((data) => {
            const keys: string[] = Object.keys(data)
            let match = false
            keys.forEach((key) => {
                if (!match) {
                    const wordToCompare = data[key].toString().toLowerCase()
                    if (wordToCompare.match(searchedWord)) {
                        tempData.push(data)
                        match = true
                    }
                }
            })
        })

        setDisplayedData(tempData)
    }

    return (
        <>
            <div className={styles.entriesDisplayed}>
                <span className={styles.dropdown}>
                    Show
                    <Dropdown
                        items={[10, 25, 50, 100]}
                        selectItem={handleSelectQty}
                        currentValue={displayingQty.toString()}
                        width="75px"
                    />
                    entries
                </span>

                <h2>Component</h2>
                <form>
                    search
                    <input
                        type="text"
                        name=""
                        id=""
                        value={searchInput}
                        onInput={handleInput}
                    />
                </form>
            </div>

            <table className={styles.table}>
                <caption>{title ?? ''}</caption>
                <tbody>
                    <tr>
                        {Object.keys(headings).map((name: string, idx) => (
                            <th
                                scope="col"
                                key={'col' + idx}
                                onClick={() => handleSort(name)}
                            >
                                {headings[name]}{' '}
                                {name === sortedKey.key &&
                                    (sortedKey.asc ? '▲' : '▼')}
                            </th>
                        ))}
                    </tr>
                    {sortedData.map(
                        (data, rowIdx) =>
                            rowIdx >= (currentPage - 1) * displayingQty &&
                            rowIdx < currentPage * displayingQty && (
                                <tr key={'row' + rowIdx + 1}>
                                    {dataKeys.map((key, colIdx) => (
                                        <td
                                            scope="col"
                                            key={
                                                'row' + rowIdx + 'col' + colIdx
                                            }
                                        >
                                            {data[key as keyof typeof data]}
                                        </td>
                                    ))}
                                </tr>
                            )
                    )}
                </tbody>
            </table>

            <div className={styles.navigation}>
                <span>
                    Showing {(currentPage - 1) * displayingQty + 1} to{' '}
                    {currentPage === pagesQty
                        ? displayedData.length
                        : currentPage * displayingQty}{' '}
                    of {displayedData.length} entries
                </span>

                <div className={styles.pageSelection}>

                    <button
                        className={currentPage === 1 ? styles.disabled : ''}
                        onClick={() => handleNavPage(-1)}
                    >
                        prev
                    </button>

{/* page selection */}

                    {Array.from(Array(pagesQty)).map((_, idx) => (
                        <Fragment key={'pageNavigation' + idx}>                            
                            {
                            (pagesQty < 7) 
                            || 
                            (Math.abs(currentPage - idx - 1) < 3) 
                            || 
                            (currentPage <= 2 && idx <= 4) 
                            || 
                            (currentPage >= pagesQty - 2 && idx > pagesQty - 6) 
                            || 
                            (idx === 0 || idx === pagesQty - 1) ?
                            currentPage === idx + 1 ? (
                                <span className={styles.currentPage}>{idx + 1}</span>
                            ) 
                            : 
                                <button
                                    onClick={() => handleSelectPage(idx + 1)}
                                    className={styles.otherPage}
                                    key={'pageBtn' + idx}
                                >
                                    {idx + 1}
                                </button>
                            
                            :   
                                (currentPage - 3 === idx + 1 
                                || 
                                currentPage + 3 === idx + 1 
                                || 
                                (currentPage <= 2 && idx === 5) 
                                || 
                                (currentPage >= pagesQty - 2 && idx > pagesQty - 7)) &&
                                <span className={styles.currentPage}>...</span>
                            }
                        </Fragment>
                    ))}

                    <button
                        className={
                            currentPage === pagesQty ? styles.disabled : ''
                        }
                        onClick={() => handleNavPage(1)}
                    >
                        next
                    </button>
                </div>
            </div>
        </>
    )
}
