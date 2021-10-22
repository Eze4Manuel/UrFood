
const formValidation = {}

formValidation.validatProfileUpdate = (values, data, builder, setError) => {
    setError("")
    // check PHARMACY name
    if (values.name !== data.name) {
        if (values.name.length < 2) {
            return setError("Name is too short")
        }
        if (values.name.length > 45) {
            return setError("Name is too long")
        }
        builder.name = values.name
    }
    
    // check phone
    if (values.contact_phone_number !== data.contact_phone_number) {
        if (!values.contact_phone_number) {
            return setError("Contact Phone number empty")
        }
        if (!/^[0-9]+$/.test(values.contact_phone_number)) {
            setError("Contact Phone number should be digits only")
        }
        if (!/^0/.test(values.contact_phone_number)) {
            setError("Contact Phone number must start with zero. e.g (070........)")
        }
        if (values.contact_phone_number.length !== 11) {
            setError("Invalid phone number. Phone number expects 11 digits")
        }
        builder.contact_phone_number = values.contact_phone_number
    }
    // check email
    if (values.contact_email !== data.contact_email) {
        if (!values.contact_email) {
            return setError("Email is empty")
        }
        builder.contact_email = values.contact_email
    }
    // check REGISTRATION ID
    if (values.registration_id !== data.registration_id) {
        if (!values.registration_id) {
            return setError("Registration ID is empty")
        }
        builder.registration_id = values.registration_id
    }
    
    // check address
    if (values.address !== data.address) {
        if (values.address) {
            if (!/^[\w\s\-',]+$/i.test(values.address)) {
                return setError("No special character allowed for  Address")
            }
            builder.address = values.address
        }
    }
    // check city
    if (values.city !== data.city) {
        if (!values.city) {
            return setError("City is empty")
        }
        builder.city = values.city
    }
    // check state
    if (values.state !== data.state) {
        if (!values.state) {
            return setError("State is empty")
        }
        builder.state = values.state
    }
    // check area
    if (values.area !== data.area) {
        if (!values.area) {
            return setError("Area is empty")
        }
        builder.area = values.area
    }
    
    if (Object.keys(builder).length === 0) {
        return setError("No changes to update")
    }
    return builder
}

export default formValidation