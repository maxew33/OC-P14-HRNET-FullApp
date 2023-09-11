export default function checkInput(type: string, value: Date | string | number | null) {
    const validation = {
        status: true,
        reason: '',
    }

    let condition = ''
    let name = ''

    switch (type) {
        case 'firstName':
            condition = 'text'
            name = 'First name'
            break

        case 'lastName':
            condition = 'text'
            name = 'Last name'
            break

        case 'street':
            condition = 'address'
            name = 'Street'
            break

        case 'city':
            condition = 'text'
            name = 'City'
            break

        case 'zipCode':
            condition = 'number'
            name = 'Zip code'
            break

        case 'state':
            condition = 'dropdown'
            name = 'State'
            break

        case 'department':
            condition = 'dropdown'
            name = 'Department'
            break
    }

    
    if(!value){
        return {status: false, reason:name + ' must be filled'}
    }

    const inputConditions: { [key: string]: RegExp } = {
        text: /^[a-zA-Z-éèàâùç' ]{2,}$/gi,
        address: /^[a-zA-Z0-9-éèàâùç,' ]{2,}$/gi,
        number: /^\d{5}$/,
        dropdown: /.+/
    }

    const invalidationReason: { [key: string]: string } = {
        text: 'need at least 2 letters',
        address: 'need at least 2 alphanumeric characters ',
        number: 'need at least 5 digit characters',
        dropdown: 'can\'t be empty'
    }

    if (condition in inputConditions) {
        validation.status = String(value).toLowerCase().match(inputConditions[condition]) !== null
    } else if (type === 'birthday') {
        console.log('anniv')
    } else if (type === 'startDate') {
        console.log('start date')
    }

    !validation.status && (validation.reason = name + ' ' + invalidationReason[condition])

    return validation
}